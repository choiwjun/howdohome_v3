import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Consultation } from '../../types/database.types';
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  Briefcase,
  Home,
  DollarSign,
  MessageSquare,
  Save,
  AlertCircle,
  CheckCircle,
  XCircle,
  History
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import toast, { Toaster } from 'react-hot-toast';

interface ConsultationLog {
  id: string;
  created_at: string;
  previous_status: string | null;
  new_status: string | null;
  memo: string | null;
  admin_email: string | null;
}

const statusOptions = [
  { value: 'new', label: '신규', color: 'red' },
  { value: 'in_progress', label: '진행중', color: 'yellow' },
  { value: 'completed', label: '완료', color: 'green' },
  { value: 'cancelled', label: '취소', color: 'gray' },
];

export function ConsultationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [logs, setLogs] = useState<ConsultationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [status, setStatus] = useState('');
  const [adminMemo, setAdminMemo] = useState('');

  useEffect(() => {
    fetchConsultation();
  }, [id]);

  const fetchConsultation = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      // 상담 정보 가져오기
      const { data: consultationData, error: consultationError } = await supabase
        .from('consultations')
        .select('*')
        .eq('id', id)
        .single();

      if (consultationError) throw consultationError;

      setConsultation(consultationData);
      setStatus(consultationData.status);
      setAdminMemo(consultationData.admin_memo || '');

      // 로그 가져오기
      const { data: logsData } = await supabase
        .from('consultation_logs')
        .select('*')
        .eq('consultation_id', id)
        .order('created_at', { ascending: false });

      setLogs(logsData || []);
    } catch (error) {
      console.error('Error fetching consultation:', error);
      toast.error('상담 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!consultation || !id) return;

    setSaving(true);
    try {
      // 상태가 변경되었는지 확인
      const statusChanged = status !== consultation.status;

      // 상담 정보 업데이트
      const { error: updateError } = await supabase
        .from('consultations')
        .update({
          status,
          admin_memo: adminMemo,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // 상태 변경 로그 기록
      if (statusChanged) {
        await supabase
          .from('consultation_logs')
          .insert({
            consultation_id: id,
            previous_status: consultation.status,
            new_status: status,
            admin_email: user?.email,
          });
      }

      toast.success('저장되었습니다.');
      fetchConsultation();
    } catch (error) {
      console.error('Error saving consultation:', error);
      toast.error('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (statusValue: string) => {
    const option = statusOptions.find(o => o.value === statusValue);
    if (!option) return null;

    const colorClasses = {
      red: 'bg-red-100 text-red-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      green: 'bg-green-100 text-green-700',
      gray: 'bg-gray-100 text-gray-700',
    };

    const icons = {
      red: AlertCircle,
      yellow: Clock,
      green: CheckCircle,
      gray: XCircle,
    };

    const Icon = icons[option.color as keyof typeof icons];

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full ${colorClasses[option.color as keyof typeof colorClasses]}`}>
        <Icon size={14} />
        {option.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">상담 정보를 찾을 수 없습니다.</p>
        <Link to="/admin/consultations" className="mt-4 text-gray-900 hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/consultations')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">상담 상세</h1>
            <p className="text-gray-500 mt-1">
              {format(new Date(consultation.created_at), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })} 신청
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* 고객 정보 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">고객 정보</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">이름</p>
                  <p className="font-medium text-gray-900">{consultation.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">연락처</p>
                  <a href={`tel:${consultation.phone}`} className="font-medium text-gray-900 hover:underline">
                    {consultation.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg sm:col-span-2">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">이메일</p>
                  <a href={`mailto:${consultation.email}`} className="font-medium text-gray-900 hover:underline">
                    {consultation.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 상담 정보 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">상담 정보</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MessageSquare className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">상담 방법</p>
                  <p className="font-medium text-gray-900">{consultation.consultation_type || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Briefcase className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">프로젝트 유형</p>
                  <p className="font-medium text-gray-900">{consultation.project_type || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Home className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">면적</p>
                  <p className="font-medium text-gray-900">{consultation.area || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <DollarSign className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">예산</p>
                  <p className="font-medium text-gray-900">{consultation.budget || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">희망 날짜</p>
                  <p className="font-medium text-gray-900">
                    {consultation.preferred_date 
                      ? format(new Date(consultation.preferred_date), 'yyyy년 MM월 dd일', { locale: ko })
                      : '-'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-500">희망 시간</p>
                  <p className="font-medium text-gray-900">{consultation.preferred_time || '-'}</p>
                </div>
              </div>
            </div>

            {/* 상담 내용 */}
            {consultation.message && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">상담 내용</p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{consultation.message}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* 상태 관리 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">상태 관리</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">현재 상태</p>
              {getStatusBadge(consultation.status)}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">상태 변경</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">관리자 메모</label>
              <textarea
                value={adminMemo}
                onChange={(e) => setAdminMemo(e.target.value)}
                rows={4}
                placeholder="내부 메모를 작성하세요..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              />
            </div>
          </div>

          {/* 변경 이력 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <History size={18} />
              변경 이력
            </h2>
            
            {logs.length === 0 ? (
              <p className="text-sm text-gray-500">변경 이력이 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 mt-2 bg-gray-300 rounded-full" />
                    <div>
                      <p className="text-gray-700">
                        상태 변경: {log.previous_status} → {log.new_status}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {format(new Date(log.created_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                        {log.admin_email && ` · ${log.admin_email}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 빠른 액션 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">빠른 액션</h2>
            <div className="space-y-2">
              <a
                href={`tel:${consultation.phone}`}
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Phone size={18} />
                전화하기
              </a>
              <a
                href={`mailto:${consultation.email}`}
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Mail size={18} />
                이메일 보내기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
