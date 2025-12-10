import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  EyeOff,
  MapPin,
  Filter,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface JournalItem {
  id: string;
  title: string;
  category: string;
  location: string | null;
  progress_status: string | null;
  thumbnail_url: string | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

const categories = ['전체', '주택', '주거공간', '상업공간', '상공간', '디자인계획'];

export function JournalsPage() {
  const [journals, setJournals] = useState<JournalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingJournal, setEditingJournal] = useState<JournalItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== '전체') {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setJournals(data || []);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, [selectedCategory, searchQuery]);

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('journals')
        .update({ is_published: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchJournals();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const deleteJournal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setDeleteConfirm(null);
      fetchJournals();
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case '주택': return 'bg-blue-100 text-blue-700';
      case '주거공간': return 'bg-green-100 text-green-700';
      case '상업공간': return 'bg-yellow-100 text-yellow-700';
      case '상공간': return 'bg-red-100 text-red-700';
      case '디자인계획': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">현장일지 관리</h1>
          <p className="text-gray-500 mt-1">프로젝트 현장 진행 상황을 관리합니다</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          새 현장일지
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="제목 또는 위치로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchJournals}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Journals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center text-gray-500">
            <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
            불러오는 중...
          </div>
        ) : journals.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
            등록된 현장일지가 없습니다.
          </div>
        ) : (
          journals.map((journal) => (
            <div key={journal.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className="aspect-video bg-gray-100 relative">
                {journal.thumbnail_url ? (
                  <img 
                    src={journal.thumbnail_url} 
                    alt={journal.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={40} className="text-gray-300" />
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    journal.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {journal.is_published ? '공개' : '비공개'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryBadgeColor(journal.category)}`}>
                    {journal.category}
                  </span>
                  {journal.progress_status && (
                    <span className="text-xs text-gray-500">{journal.progress_status}</span>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{journal.title}</h3>
                
                {journal.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin size={14} />
                    {journal.location}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {format(new Date(journal.created_at), 'yyyy.MM.dd', { locale: ko })}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePublish(journal.id, journal.is_published)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title={journal.is_published ? '비공개' : '공개'}
                    >
                      {journal.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => setEditingJournal(journal)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                      title="수정"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(journal.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingJournal) && (
        <JournalFormModal
          journal={editingJournal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingJournal(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setEditingJournal(null);
            fetchJournals();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">삭제 확인</h3>
            <p className="text-gray-600 mb-6">이 현장일지를 삭제하시겠습니까?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => deleteJournal(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Journal Form Modal
interface JournalFormModalProps {
  journal: JournalItem | null;
  onClose: () => void;
  onSave: () => void;
}

function JournalFormModal({ journal, onClose, onSave }: JournalFormModalProps) {
  const [formData, setFormData] = useState({
    title: journal?.title || '',
    category: journal?.category || '주택',
    location: journal?.location || '',
    progress_status: journal?.progress_status || '',
    description: '',
    content: '',
    thumbnail_url: journal?.thumbnail_url || '',
    is_published: journal?.is_published ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    if (journal) {
      setLoadingContent(true);
      supabase
        .from('journals')
        .select('description, content')
        .eq('id', journal.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setFormData(prev => ({ 
              ...prev, 
              description: data.description || '',
              content: data.content || '' 
            }));
          }
          setLoadingContent(false);
        });
    }
  }, [journal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (journal) {
        const { error } = await supabase
          .from('journals')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', journal.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('journals')
          .insert([formData]);
        
        if (error) throw error;
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {journal ? '현장일지 수정' : '새 현장일지 작성'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="프로젝트 제목"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="주택">주택</option>
                <option value="주거공간">주거공간</option>
                <option value="상업공간">상업공간</option>
                <option value="상공간">상공간</option>
                <option value="디자인계획">디자인계획</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">진행 상태</label>
              <input
                type="text"
                value={formData.progress_status}
                onChange={(e) => setFormData({ ...formData, progress_status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="예: 마감공사 진행중"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">위치</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="경기도 고양시 일산동구"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">썸네일 URL</label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">간단 설명</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="프로젝트 한 줄 소개"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상세 내용</label>
            {loadingContent ? (
              <div className="w-full h-32 border border-gray-200 rounded-lg flex items-center justify-center">
                <RefreshCw className="animate-spin text-gray-400" size={24} />
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                placeholder="상세 내용..."
              />
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">공개</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? '저장 중...' : (journal ? '수정' : '등록')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
