import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: number;
  category: '공지사항' | '시공사례' | '언론보도' | '이벤트';
  title: string;
  date: string;
  views: number;
  isNotice?: boolean;
}

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['전체', '공지사항', '시공사례', '언론보도', '이벤트'];

  const newsData: NewsItem[] = [
    {
      id: 1,
      category: '공지사항',
      title: '2024년 설 연휴 고객센터 운영 안내',
      date: '2024.02.05',
      views: 1245,
      isNotice: true
    },
    {
      id: 2,
      category: '공지사항',
      title: '하우두홈 홈페이지 리뉴얼 오픈 안내',
      date: '2024.01.15',
      views: 2103,
      isNotice: true
    },
    {
      id: 3,
      category: '시공사례',
      title: '경기도 고양시 단독주택 신축 공사 완료',
      date: '2024.01.20',
      views: 3421
    },
    {
      id: 4,
      category: '시공사례',
      title: '서울 강남구 주택 리모델링 프로젝트',
      date: '2024.01.18',
      views: 2876
    },
    {
      id: 5,
      category: '언론보도',
      title: '[매일경제] 30년 경력의 장인정신, 하우두홈을 만나다',
      date: '2024.01.10',
      views: 1567
    },
    {
      id: 6,
      category: '언론보도',
      title: '[건설경제] 프리미엄 주택 시공의 새로운 기준',
      date: '2024.01.05',
      views: 1234
    },
    {
      id: 7,
      category: '이벤트',
      title: '신규 고객 대상 무료 설계 상담 이벤트',
      date: '2023.12.20',
      views: 4532
    },
    {
      id: 8,
      category: '시공사례',
      title: '경기도 파주시 전원주택 준공 사례',
      date: '2023.12.15',
      views: 2890
    },
    {
      id: 9,
      category: '공지사항',
      title: 'A/S 신청 프로세스 개선 안내',
      date: '2023.12.10',
      views: 987
    },
    {
      id: 10,
      category: '시공사례',
      title: '인천 연수구 다가구주택 신축 완료',
      date: '2023.12.05',
      views: 3156
    },
    {
      id: 11,
      category: '시공사례',
      title: '청라동 단독주택 12호 인테리어 프로젝트',
      date: '2024.02.10',
      views: 4832
    }
  ];

  const filteredNews = newsData.filter(item => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const noticeItems = filteredNews.filter(item => item.isNotice);
  const regularItems = filteredNews.filter(item => !item.isNotice);

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
                  onClick={() => setSelectedCategory(category)}
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
                      {item.date}
                    </div>
                    <div className="md:col-span-1 flex items-center md:justify-center text-sm text-gray-500 font-normal">
                      {item.views.toLocaleString()}
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
                    {item.date}
                  </div>
                  <div className="md:col-span-1 flex items-center md:justify-center text-sm text-gray-500 font-normal">
                    {item.views.toLocaleString()}
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                검색 결과가 없습니다
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {regularItems.length > 0 && (
            <div className="mt-8 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(page => (
                <button
                  key={page}
                  className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                    page === 1
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
