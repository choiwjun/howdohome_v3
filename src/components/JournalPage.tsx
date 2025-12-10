import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../lib/supabase';

interface JournalItem {
  id: string;
  category: string;
  title: string;
  location: string;
  published_at: string;
  created_at: string;
  thumbnail_url: string | null;
  progress_status: string;
  description: string;
}

export function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [journalData, setJournalData] = useState<JournalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 9;

  const categories = ['전체', '주택', '주거공간', '상업공간', '상공간', '디자인계획'];

  const fetchJournals = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('journals')
        .select('*', { count: 'exact' })
        .eq('is_published', true);

      // 카테고리 필터
      if (selectedCategory !== '전체') {
        query = query.eq('category', selectedCategory);
      }

      // 검색 필터
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      const { data, error, count } = await query
        .order('published_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;

      setJournalData(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, [selectedCategory, page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchJournals();
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace('.', '');
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  // 기본 썸네일 이미지
  const defaultThumbnail = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

  return (
    <div className="pt-20">
      {/* 헤더 */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 font-extrabold">현장일지</h1>
          <p className="text-gray-600 text-lg font-normal">
            하우두홈의 시공 현장을 실시간으로 확인하세요
          </p>
        </div>
      </section>

      {/* 컨텐츠 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 카테고리 + 검색 */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* 카테고리 */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full transition-colors font-semibold text-sm ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 검색 */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="제목, 지역으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
              />
            </div>
          </div>

          {/* 로딩 상태 */}
          {loading ? (
            <div className="py-24 text-center">
              <RefreshCw className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
              <p className="text-gray-500">불러오는 중...</p>
            </div>
          ) : (
            <>
              {/* 카드 그리드 */}
              {journalData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {journalData.map(item => (
                    <Link
                      key={item.id}
                      to={`/journal/${item.id}`}
                      className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-900 transition-all hover:shadow-lg"
                    >
                      {/* 썸네일 */}
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.thumbnail_url || defaultThumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{
                            filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                          }}
                        />
                      </div>

                      {/* 내용 */}
                      <div className="p-5">
                        {/* 카테고리 + 진행상태 */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            {item.category}
                          </span>
                          {item.progress_status && (
                            <span className="text-xs text-blue-600 font-semibold">
                              {item.progress_status}
                            </span>
                          )}
                        </div>

                        {/* 제목 */}
                        <h3 className="mb-2 font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                          {item.title}
                        </h3>

                        {/* 설명 */}
                        {item.description && (
                          <p className="mb-3 text-sm text-gray-600 font-normal line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        {/* 위치 + 날짜 */}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span className="font-normal">{item.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span className="font-normal">{formatDate(item.published_at || item.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <p className="text-gray-500 font-normal">등록된 현장일지가 없습니다</p>
                </div>
              )}

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        page === p
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
