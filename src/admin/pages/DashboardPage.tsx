import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  MessageSquare, 
  Newspaper, 
  FolderOpen, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DashboardStats {
  totalConsultations: number;
  newConsultations: number;
  inProgressConsultations: number;
  totalNews: number;
  totalJournals: number;
}

interface RecentConsultation {
  id: string;
  name: string;
  phone: string;
  project_type: string | null;
  status: string;
  created_at: string;
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalConsultations: 0,
    newConsultations: 0,
    inProgressConsultations: 0,
    totalNews: 0,
    totalJournals: 0,
  });
  const [recentConsultations, setRecentConsultations] = useState<RecentConsultation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 상담 통계
      const { count: totalConsultations } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true });

      const { count: newConsultations } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      const { count: inProgressConsultations } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'in_progress');

      // 뉴스 통계
      const { count: totalNews } = await supabase
        .from('news')
        .select('*', { count: 'exact', head: true });

      // 현장일지 통계
      const { count: totalJournals } = await supabase
        .from('journals')
        .select('*', { count: 'exact', head: true });

      // 최근 상담 신청
      const { data: consultations } = await supabase
        .from('consultations')
        .select('id, name, phone, project_type, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        totalConsultations: totalConsultations || 0,
        newConsultations: newConsultations || 0,
        inProgressConsultations: inProgressConsultations || 0,
        totalNews: totalNews || 0,
        totalJournals: totalJournals || 0,
      });

      setRecentConsultations(consultations || []);
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
            <AlertCircle size={12} />
            신규
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            <Clock size={12} />
            진행중
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            <CheckCircle size={12} />
            완료
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-500 mt-1">하우두홈 관리 현황을 한눈에 확인하세요</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          새로고침
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* 신규 상담 */}
        <Link to="/admin/consultations?status=new" className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-red-600" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.newConsultations}</span>
          </div>
          <h3 className="font-medium text-gray-900">신규 상담</h3>
          <p className="text-sm text-gray-500">처리가 필요한 신규 상담</p>
        </Link>

        {/* 진행중 상담 */}
        <Link to="/admin/consultations?status=in_progress" className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.inProgressConsultations}</span>
          </div>
          <h3 className="font-medium text-gray-900">진행중</h3>
          <p className="text-sm text-gray-500">현재 진행중인 상담</p>
        </Link>

        {/* 총 상담 */}
        <Link to="/admin/consultations" className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-blue-600" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.totalConsultations}</span>
          </div>
          <h3 className="font-medium text-gray-900">전체 상담</h3>
          <p className="text-sm text-gray-500">누적 상담 신청 수</p>
        </Link>

        {/* 콘텐츠 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <span className="text-3xl font-bold text-gray-900">{stats.totalNews + stats.totalJournals}</span>
          </div>
          <h3 className="font-medium text-gray-900">게시물</h3>
          <p className="text-sm text-gray-500">소식 {stats.totalNews} · 현장일지 {stats.totalJournals}</p>
        </div>
      </div>

      {/* Recent Consultations */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">최근 상담 신청</h2>
          <Link to="/admin/consultations" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            전체보기 <ArrowRight size={16} />
          </Link>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
            불러오는 중...
          </div>
        ) : recentConsultations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            아직 상담 신청이 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentConsultations.map((consultation) => (
              <Link
                key={consultation.id}
                to={`/admin/consultations/${consultation.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {consultation.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{consultation.name}</p>
                    <p className="text-sm text-gray-500">
                      {consultation.project_type || '유형 미지정'} · {consultation.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(consultation.status)}
                  <span className="text-sm text-gray-500">
                    {format(new Date(consultation.created_at), 'MM.dd HH:mm', { locale: ko })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Link
          to="/admin/news"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Newspaper className="text-gray-600" size={24} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">소식 작성</h3>
            <p className="text-sm text-gray-500">새로운 소식을 등록하세요</p>
          </div>
        </Link>

        <Link
          to="/admin/journals"
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <FolderOpen className="text-gray-600" size={24} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">현장일지 작성</h3>
            <p className="text-sm text-gray-500">현장 진행 상황을 기록하세요</p>
          </div>
        </Link>

        <Link
          to="/"
          target="_blank"
          className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <ArrowRight className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-medium text-white">사이트 보기</h3>
            <p className="text-sm text-white/70">메인 사이트 확인하기</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
