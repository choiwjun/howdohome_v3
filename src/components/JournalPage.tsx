import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface JournalItem {
  id: number;
  category: '주택' | '주거공간' | '상업공간' | '상공간' | '디자인계획';
  title: string;
  location: string;
  date: string;
  thumbnail: string;
  progress: string;
  description: string;
}

export function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['전체', '주택', '주거공간', '상업공간', '상공간', '디자인계획'];

  const journalData: JournalItem[] = [
    {
      id: 1,
      category: '주택',
      title: '고양시 일산동구 단독주택 신축',
      location: '경기도 고양시 일산동구',
      date: '2024.11.20',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '마감공사 진행중',
      description: '250㎡ 대지에 철근콘크리트 구조로 진행되는 신축 프로젝트입니다. 현재 내부 마감공사가 한창입니다.'
    },
    {
      id: 2,
      category: '디자인계획',
      title: '서울 강남구 주택 리모델링',
      location: '서울특별시 강남구',
      date: '2024.11.18',
      thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '구조변경 완료',
      description: '30년된 주택의 전면 리모델링 작업입니다. 구조 보강 및 내부 공간 재배치가 완료되었습니다.'
    },
    {
      id: 3,
      category: '주택',
      title: '파주시 전원주택 신축현장',
      location: '경기도 파주시',
      date: '2024.11.15',
      thumbnail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '골조공사 완료',
      description: '전원주택 특성에 맞는 목구조 시공이 진행되고 있습니다. 골조공사가 마무리되었습니다.'
    },
    {
      id: 4,
      category: '주택',
      title: '인천 연수구 다가구주택 신축',
      location: '인천광역시 연수구',
      date: '2024.11.12',
      thumbnail: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '기초공사 진행중',
      description: '4층 규모의 다가구주택 신축 프로젝트입니다. 기초공사가 순조롭게 진행되고 있습니다.'
    },
    {
      id: 5,
      category: '상업공간',
      title: '성남시 카페 인테리어 공사',
      location: '경기도 성남시',
      date: '2024.11.10',
      thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '마감공사 95% 완료',
      description: '모던한 감성의 카페 인테리어 작업이 거의 마무리 단계입니다.'
    },
    {
      id: 6,
      category: '주택',
      title: '용인시 단독주택 신축현장',
      location: '경기도 용인시',
      date: '2024.11.08',
      thumbnail: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '지붕공사 완료',
      description: '현대적인 디자인의 단독주택 신축 프로젝트입니다. 지붕 시공이 완료되었습니다.'
    },
    {
      id: 7,
      category: '디자인계획',
      title: '분당 아파트 인테리어 리모델링',
      location: '경기도 성남시 분당구',
      date: '2024.11.05',
      thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '철거작업 완료',
      description: '40평대 아파트의 전면 리모델링 작업입니다. 철거가 완료되고 새로운 공간 구성 중입니다.'
    },
    {
      id: 8,
      category: '주택',
      title: '부천시 다가구주택 신축',
      location: '경기도 부천시',
      date: '2024.11.01',
      thumbnail: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '외부공사 진행중',
      description: '5층 규모의 다가구주택 신축입니다. 외부 마감재 시공이 진행되고 있습니다.'
    },
    {
      id: 9,
      category: '주택',
      title: '김포시 단독주택 신축공사',
      location: '경기도 김포시',
      date: '2024.10.28',
      thumbnail: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      progress: '내부공사 진행중',
      description: '남향의 좋은 입지에 위치한 단독주택 신축 프로젝트입니다. 내부 배관 및 전기공사 중입니다.'
    }
  ];

  const filteredJournal = journalData.filter(item => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                placeholder="제목, 지역으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
              />
            </div>
          </div>

          {/* 카드 그리드 */}
          {filteredJournal.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredJournal.map(item => (
                <Link
                  key={item.id}
                  to={`/journal/${item.id}`}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-900 transition-all hover:shadow-lg"
                >
                  {/* 썸네일 */}
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={item.thumbnail}
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
                      <span className="text-xs text-blue-600 font-semibold">
                        {item.progress}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3 className="mb-2 font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    {/* 설명 */}
                    <p className="mb-3 text-sm text-gray-600 font-normal line-clamp-2">
                      {item.description}
                    </p>

                    {/* 위치 + 날짜 */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span className="font-normal">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span className="font-normal">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-gray-500 font-normal">검색 결과가 없습니다</p>
            </div>
          )}

          {/* 페이지네이션 */}
          {filteredJournal.length > 0 && (
            <div className="flex justify-center gap-2">
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
