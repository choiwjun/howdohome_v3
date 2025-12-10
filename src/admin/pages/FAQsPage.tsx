import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  GripVertical,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

const categories = ['전체', '상담문의', '설계/시공', '비용/계약', '기타'];

export function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (selectedCategory !== '전체') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [selectedCategory]);

  const deleteFaq = async (id: string) => {
    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) throw error;
      setDeleteConfirm(null);
      fetchFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_published: !currentStatus })
        .eq('id', id);
      if (error) throw error;
      fetchFaqs();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case '상담문의': return 'bg-blue-100 text-blue-700';
      case '설계/시공': return 'bg-green-100 text-green-700';
      case '비용/계약': return 'bg-yellow-100 text-yellow-700';
      case '기타': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ 관리</h1>
          <p className="text-gray-500 mt-1">자주 묻는 질문을 관리합니다</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          새 FAQ
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={fetchFaqs}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg ml-auto"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
            <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
            불러오는 중...
          </div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
            등록된 FAQ가 없습니다.
          </div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white rounded-xl border ${
                faq.is_published ? 'border-gray-200' : 'border-gray-200 opacity-60'
              }`}
            >
              {/* Question */}
              <div
                className="flex items-center gap-3 p-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <GripVertical size={18} className="text-gray-300 flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryBadgeColor(faq.category)}`}>
                      {faq.category}
                    </span>
                    {!faq.is_published && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">비공개</span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900">Q. {faq.question}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePublish(faq.id, faq.is_published);
                    }}
                    className={`px-3 py-1 text-xs rounded-lg ${
                      faq.is_published
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {faq.is_published ? '공개' : '비공개'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingFaq(faq);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(faq.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                  {expandedId === faq.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* Answer */}
              {expandedId === faq.id && (
                <div className="px-4 pb-4 pt-0 ml-9">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">A. {faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingFaq) && (
        <FAQFormModal
          faq={editingFaq}
          onClose={() => {
            setShowCreateModal(false);
            setEditingFaq(null);
          }}
          onSave={() => {
            setShowCreateModal(false);
            setEditingFaq(null);
            fetchFaqs();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">삭제 확인</h3>
            <p className="text-gray-600 mb-6">이 FAQ를 삭제하시겠습니까?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">취소</button>
              <button onClick={() => deleteFaq(deleteConfirm)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// FAQ Form Modal
interface FAQFormModalProps {
  faq: FAQ | null;
  onClose: () => void;
  onSave: () => void;
}

function FAQFormModal({ faq, onClose, onSave }: FAQFormModalProps) {
  const [formData, setFormData] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || '상담문의',
    sort_order: faq?.sort_order || 0,
    is_published: faq?.is_published ?? true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (faq) {
        const { error } = await supabase
          .from('faqs')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', faq.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('faqs').insert([formData]);
        if (error) throw error;
      }
      onSave();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{faq ? 'FAQ 수정' : '새 FAQ'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="상담문의">상담문의</option>
                <option value="설계/시공">설계/시공</option>
                <option value="비용/계약">비용/계약</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">정렬 순서</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">질문</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="자주 묻는 질문을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">답변</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              placeholder="답변을 입력하세요"
            />
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
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">취소</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">
              {loading ? '저장 중...' : (faq ? '수정' : '등록')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
