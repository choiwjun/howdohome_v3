import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  EyeOff,
  Pin,
  MoreVertical,
  Filter,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string | null;
  is_notice: boolean;
  is_published: boolean;
  published_at: string;
  views: number;
  created_at: string;
}

const categories = ['전체', '공지사항', '시공사례', '언론보도', '이벤트'];

export function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('news')
        .select('*')
        .order('is_notice', { ascending: false })
        .order('created_at', { ascending: false });

      if (selectedCategory !== '전체') {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ is_published: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchNews();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const toggleNotice = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ is_notice: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchNews();
    } catch (error) {
      console.error('Error toggling notice:', error);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setDeleteConfirm(null);
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case '공지사항': return 'bg-red-100 text-red-700';
      case '시공사례': return 'bg-blue-100 text-blue-600';
      case '언론보도': return 'bg-green-100 text-green-700';
      case '이벤트': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">소식 관리</h1>
          <p className="text-gray-500 mt-1">공지사항, 시공사례, 언론보도, 이벤트를 관리합니다</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          새 소식 작성
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="제목으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
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

          {/* Refresh */}
          <button
            onClick={fetchNews}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
            불러오는 중...
          </div>
        ) : news.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            등록된 소식이 없습니다.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">제목</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden sm:table-cell">카테고리</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 hidden sm:table-cell">조회</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 hidden sm:table-cell">상태</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">작성일</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.thumbnail_url && (
                        <img 
                          src={item.thumbnail_url} 
                          alt="" 
                          className="w-12 h-12 object-cover rounded-lg hidden sm:block"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {item.is_notice && (
                            <Pin size={14} className="text-red-500 flex-shrink-0" />
                          )}
                          <p className="font-medium text-gray-900 truncate">{item.title}</p>
                        </div>
                        <p className="text-sm text-gray-500 sm:hidden">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryBadgeColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-600 hidden sm:table-cell">
                    {item.views}
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.is_published ? '공개' : '비공개'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                    {format(new Date(item.created_at), 'yyyy.MM.dd', { locale: ko })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => togglePublish(item.id, item.is_published)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title={item.is_published ? '비공개로 변경' : '공개로 변경'}
                      >
                        {item.is_published ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button
                        onClick={() => toggleNotice(item.id, item.is_notice)}
                        className={`p-2 rounded-lg ${
                          item.is_notice 
                            ? 'text-red-500 hover:bg-red-50' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}
                        title={item.is_notice ? '공지 해제' : '공지로 설정'}
                      >
                        <Pin size={18} />
                      </button>
                      <button
                        onClick={() => setEditingNews(item)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="수정"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="삭제"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingNews) && (
        <NewsFormModal
          news={editingNews}
          onClose={() => {
            setShowCreateModal(false);
            setEditingNews(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setEditingNews(null);
            fetchNews();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">삭제 확인</h3>
            <p className="text-gray-600 mb-6">이 소식을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => deleteNews(deleteConfirm)}
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

// News Form Modal Component
interface NewsFormModalProps {
  news: NewsItem | null;
  onClose: () => void;
  onSave: () => void;
}

function NewsFormModal({ news, onClose, onSave }: NewsFormModalProps) {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    category: news?.category || '공지사항',
    content: '',
    thumbnail_url: news?.thumbnail_url || '',
    is_notice: news?.is_notice || false,
    is_published: news?.is_published ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    if (news) {
      // Load full content
      setLoadingContent(true);
      supabase
        .from('news')
        .select('content')
        .eq('id', news.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setFormData(prev => ({ ...prev, content: data.content || '' }));
          }
          setLoadingContent(false);
        });
    }
  }, [news]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (news) {
        // Update
        const { error } = await supabase
          .from('news')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', news.id);
        
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('news')
          .insert([formData]);
        
        if (error) throw error;
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving news:', error);
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
            {news ? '소식 수정' : '새 소식 작성'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="소식 제목을 입력하세요"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="공지사항">공지사항</option>
              <option value="시공사례">시공사례</option>
              <option value="언론보도">언론보도</option>
              <option value="이벤트">이벤트</option>
            </select>
          </div>

          {/* Thumbnail URL */}
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

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
            {loadingContent ? (
              <div className="w-full h-48 border border-gray-200 rounded-lg flex items-center justify-center">
                <RefreshCw className="animate-spin text-gray-400" size={24} />
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                placeholder="소식 내용을 입력하세요..."
              />
            )}
          </div>

          {/* Options */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">공개</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_notice}
                onChange={(e) => setFormData({ ...formData, is_notice: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">공지로 고정</span>
            </label>
          </div>

          {/* Actions */}
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
              {loading ? '저장 중...' : (news ? '수정' : '등록')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
