import { useState } from 'react';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  size: string;
}

const houseItems: GalleryItem[] = [
  {
    id: 1,
    title: '일산 단독주택',
    category: '주택',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '모던하고 세련된 단독주택 설계',
    location: '경기도 고양시',
    size: '230㎡'
  },
  {
    id: 2,
    title: '파주 아파트 인테리어',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '세련되고 감각적인 주거공간',
    location: '경기도 파주시',
    size: '84㎡'
  },
  {
    id: 3,
    title: '용인 카페',
    category: '상업공간',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '감성을 담은 카페 인테리어',
    location: '경기도 용인시',
    size: '120㎡'
  },
  {
    id: 4,
    title: '수원 사무실',
    category: '상공간',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '효율적이고 세련된 업무 공간',
    location: '경기도 수원시',
    size: '200㎡'
  },
  {
    id: 5,
    title: '양평 주택',
    category: '주택',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '산과 강이 어우러진 힐링 주택',
    location: '경기도 양평군',
    size: '165㎡'
  },
  {
    id: 6,
    title: '남양주 빌라 리모델링',
    category: '디자인계획',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '공간을 새롭게 재탄생시킨 리모델링',
    location: '경기도 남양주시',
    size: '95㎡'
  },
  {
    id: 7,
    title: '화성 레스토랑',
    category: '상업공간',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '고객을 사로잡는 공간 디자인',
    location: '경기도 화성시',
    size: '180㎡'
  },
  {
    id: 8,
    title: '광주 아파트 인테리어',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '가족의 라이프스타일을 담은 공간',
    location: '경기도 광주시',
    size: '120㎡'
  },
  {
    id: 9,
    title: '고양 쇼룸',
    category: '상공간',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '브랜드 가치를 높이는 감각적 쇼룸',
    location: '경기도 고양시',
    size: '150㎡'
  }
];

interface Category {
  name: string;
  description: string;
}

const categories: Category[] = [
  { name: '전체', description: '당신만을 위한 특별한 주택을 설계합니다' },
  { name: '주택', description: '단독주택부터 전원주택, 다가구주택까지' },
  { name: '주거공간', description: '당신의 공간을 새롭게 설계하는 인테리어 디자인' },
  { name: '상업공간', description: '집과 공간에 가치를 더하는 인테리어 솔루션' },
  { name: '상공간', description: '라이프스타일을 담는 감각적 공간 디자인' },
  { name: '디자인계획', description: '주거·상업공간, 디자인으로 다시 태어나다' }
];

export function HousePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === '전체'
      ? houseItems
      : houseItems.filter((item) => item.category === selectedCategory);
  
  const currentCategory = categories.find(cat => cat.name === selectedCategory) || categories[0];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="주택 갤러리"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="mb-3 text-xs sm:text-sm tracking-[0.3em] font-normal opacity-90">HOUSE GALLERY</p>
          <h1 className="mb-4 sm:mb-6 font-extrabold text-2xl sm:text-3xl md:text-4xl">{currentCategory.name}</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal opacity-90">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-2 rounded-full transition-colors font-semibold ${
                  selectedCategory === category.name
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-80 overflow-hidden rounded-lg bg-gray-200">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.95) contrast(1.05) saturate(0.9)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-2 font-normal">
                      {item.category}
                    </div>
                    <h3 className="mb-1 font-bold">{item.title}</h3>
                    <p className="text-white/90 text-sm font-normal">{item.description}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-white/80 font-normal">
                      <span>{item.location}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 font-normal">해당 카테고리의 프로젝트가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <ImageWithFallback
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                style={{
                  filter: 'brightness(0.95) contrast(1.05) saturate(0.9)'
                }}
              />
            </div>
            <div className="mt-6 text-white text-center">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-3 font-normal">
                {selectedItem.category}
              </div>
              <h2 className="mb-2 font-bold">{selectedItem.title}</h2>
              <p className="text-white/80 text-lg font-normal mb-2">{selectedItem.description}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/70 font-normal">
                <span>{selectedItem.location}</span>
                <span>•</span>
                <span>{selectedItem.size}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">인테리어 프로세스</h2>
            <p className="text-gray-600 font-normal">
              하우두홈과 함께하는 주택 건축의 모든 과정
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">01</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">상담 및 현장조사</h3>
              <p className="text-sm text-gray-600 font-normal">
                부지 조사와 건축 가능성 검토
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">02</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">설계 및 인허가</h3>
              <p className="text-sm text-gray-600 font-normal">
                맞춤 설계와 인허가 진행
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">03</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">시공 및 완공</h3>
              <p className="text-sm text-gray-600 font-normal">
                체계적인 시공 관리와 마무리
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 font-bold text-white">당신의 꿈을 현실로 만들어드립니다</h2>
          <p className="mb-10 text-lg font-normal opacity-90 leading-relaxed">
            30년의 경험과 노하우로 완벽한 주택을 설계합니다<br />
            지금 바로 상담을 시작하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support/consultation"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              상담 신청하기
            </a>
            <a
              href="tel:031-975-9372"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold"
            >
              전화 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}