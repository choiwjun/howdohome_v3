import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsItem {
  id: string;
  category: string;
  title: string;
  created_at: string;
  published_at: string;
  views: number;
  is_notice: boolean;
  is_published: boolean;
}

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const categories = ['전체', '공지사항', '시공사례', '언론보도', '이벤트'];

  const fetchNews = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('news')
        .select('*', { count: 'exact' })
        .eq('is_published', true);

      // 카테고리 필터
      if (selectedCategory !== '전체') {
        query = query.eq('category', selectedCategory);
      }

      // 검색 필터
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      // 정렬: 공지 우선, 그 다음 최신순
      const { data, error, count } = await query
        .order('is_notice', { ascending: false })
        .order('published_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;

      setNewsData(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchNews();
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '공지사항':
        return 'bg-red-50 text-red-700';
      case '시공사례':
        return 'bg-blue-50 text-blue-700';
      case '언론보도':
        return 'bg-green-50 text-green-700';
      case '이벤트':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const noticeItems = newsData.filter(item => item.is_notice);
  const regularItems = newsData.filter(item => !item.is_notice);
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="pt-20">
      {/* 헤더 */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 font-extrabold">하우두홈 소식</h1>
          <p className="text-gray-600 text-lg font-normal">
            하우두홈의 최신 소식과 시공 사례를 만나보세요
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
                placeholder="제목으로 검색"
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
              {/* 게시판 테이블 */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* 헤더 */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="col-span-1 text-gray-600 font-semibold text-sm">카테고리</div>
                  <div className="col-span-8 text-gray-600 font-semibold text-sm">제목</div>
                  <div className="col-span-2 text-gray-600 font-semibold text-sm text-center">날짜</div>
                  <div className="col-span-1 text-gray-600 font-semibold text-sm text-center">조회</div>
                </div>

                {/* 공지사항 */}
                {noticeItems.length > 0 && (
                  <>
                    {noticeItems.map(item => (
                      <Link
                        key={item.id}
                        to={`/news/${item.id}`}
                        className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className="md:col-span-1 flex items-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="md:col-span-8 flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded font-bold">공지</span>
                          <span className="font-semibold text-gray-900 hover:underline">{item.title}</span>
                        </div>
                        <div className="md:col-span-2 flex items-center md:justify-center text-sm text-gray-500 font-normal">
                          {formatDate(item.published_at || item.created_at)}
                        </div>
                        <div className="md:col-span-1 flex items-center md:justify-center text-sm text-gray-500 font-normal">
                          {(item.views || 0).toLocaleString()}
                        </div>
                      </Link>
                    ))}
                  </>
                )}

                {/* 일반 게시물 */}
                {regularItems.length > 0 ? (
                  regularItems.map(item => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="md:col-span-1 flex items-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="md:col-span-8 flex items-center gap-2">
                        <span className="font-normal text-gray-900 group-hover:underline">{item.title}</span>
                        <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="md:col-span-2 flex items-center md:justify-center text-sm text-gray-500 font-normal">
                        {formatDate(item.published_at || item.created_at)}
                      </div>
                      <div className="md:col-span-1 flex items-center md:justify-center text-sm text-gray-500 font-normal">
                        {(item.views || 0).toLocaleString()}
                      </div>
                    </Link>
                  ))
                ) : noticeItems.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-500">
                    등록된 소식이 없습니다
                  </div>
                ) : null}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
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
