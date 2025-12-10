import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Consultation } from '../../types/database.types';
import { 
  Search, 
  Filter,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const statusOptions = [
  { value: '', label: '전체 상태' },
  { value: 'new', label: '신규' },
  { value: 'in_progress', label: '진행중' },
  { value: 'completed', label: '완료' },
  { value: 'cancelled', label: '취소' },
];

const projectTypeOptions = [
  { value: '', label: '전체 유형' },
  { value: '단독주택 신축', label: '단독주택 신축' },
  { value: '다가구주택 신축', label: '다가구주택 신축' },
  { value: '주택 리모델링', label: '주택 리모델링' },
  { value: '아파트 인테리어', label: '아파트 인테리어' },
  { value: '상업시설', label: '상업시설' },
  { value: '기타', label: '기타' },
];

export function ConsultationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [projectTypeFilter, setProjectTypeFilter] = useState(searchParams.get('type') || '');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('consultations')
        .select('*', { count: 'exact' });

      // 검색어 필터
      if (search) {
        query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
      }

      // 상태 필터
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      // 프로젝트 유형 필터
      if (projectTypeFilter) {
        query = query.eq('project_type', projectTypeFilter);
      }

      // 정렬 및 페이지네이션
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;

      setConsultations(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [page, statusFilter, projectTypeFilter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchConsultations();
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            <AlertCircle size={12} />
            신규
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
            <Clock size={12} />
            진행중
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            <CheckCircle size={12} />
            완료
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            <XCircle size={12} />
            취소
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
            {status}
          </span>
        );
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleExport = () => {
    // CSV 내보내기
    const headers = ['이름', '연락처', '이메일', '상담방법', '프로젝트유형', '면적', '예산', '상태', '신청일'];
    const csvContent = [
      headers.join(','),
      ...consultations.map(c => [
        c.name,
        c.phone,
        c.email,
        c.consultation_type || '',
        c.project_type || '',
        c.area || '',
        c.budget || '',
        c.status,
        format(new Date(c.created_at), 'yyyy-MM-dd HH:mm')
      ].join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `consultations_${format(new Date(), 'yyyyMMdd')}.csv`;
    link.click();
  };

  // Stats
  const newCount = consultations.filter(c => c.status === 'new').length;
  const inProgressCount = consultations.filter(c => c.status === 'in_progress').length;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담 신청 관리</h1>
          <p className="text-gray-500 mt-1">
            총 {totalCount}건 · 신규 {newCount}건 · 진행중 {inProgressCount}건
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchConsultations}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Download size={18} />
            내보내기
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 연락처, 이메일로 검색"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          {/* Project Type Filter */}
          <select
            value={projectTypeFilter}
            onChange={(e) => {
              setProjectTypeFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            {projectTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
            불러오는 중...
          </div>
        ) : consultations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">프로젝트 유형</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상담방법</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신청일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {consultations.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{getStatusBadge(consultation.status)}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{consultation.name}</div>
                        <div className="text-sm text-gray-500">{consultation.email}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{consultation.phone}</td>
                      <td className="px-6 py-4 text-gray-700">{consultation.project_type || '-'}</td>
                      <td className="px-6 py-4 text-gray-700">{consultation.consultation_type || '-'}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {format(new Date(consultation.created_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/consultations/${consultation.id}`}
                          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
                        >
                          <Eye size={16} />
                          상세
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {consultations.map((consultation) => (
                <Link
                  key={consultation.id}
                  to={`/admin/consultations/${consultation.id}`}
                  className="block p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    {getStatusBadge(consultation.status)}
                    <span className="text-sm text-gray-500">
                      {format(new Date(consultation.created_at), 'MM.dd HH:mm', { locale: ko })}
                    </span>
                  </div>
                  <div className="font-medium text-gray-900">{consultation.name}</div>
                  <div className="text-sm text-gray-500">{consultation.phone}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {consultation.project_type || '유형 미지정'}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {totalCount}개 중 {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="px-4 py-2 text-sm text-gray-700">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
