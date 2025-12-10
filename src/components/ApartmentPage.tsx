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

const apartmentItems: GalleryItem[] = [
  {
    id: 1,
    title: '일산 센트럴파크 거실',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1613545325268-9265e1609167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '화이트 톤의 모던한 거실 인테리어',
    location: '일산 센트럴파크',
    size: '34평'
  },
  {
    id: 2,
    title: '분당 푸르지오 주방',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '실용적이고 세련된 주방 공간',
    location: '분당 푸르지오',
    size: '42평'
  },
  {
    id: 3,
    title: '광교 힐스테이트 침실',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1535049752-3baf525dd015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '편안한 휴식을 위한 미니멀 침실',
    location: '광교 힐스테이트',
    size: '38평'
  },
  {
    id: 4,
    title: '판교 자이 욕실',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '프리미엄 마감재를 사용한 욕실',
    location: '판교 자이',
    size: '45평'
  },
  {
    id: 5,
    title: '수지 래미안 거실',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1639400973459-bfda4538964d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '넓고 쾌적한 거실 공간',
    location: '수지 래미안',
    size: '50평'
  },
  {
    id: 6,
    title: '동탄 롯데캐슬 주방',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '아일랜드 주방과 넓은 수납공간',
    location: '동탄 롯데캐슬',
    size: '52평'
  },
  {
    id: 7,
    title: '평촌 푸르지오 서재',
    category: '디자인계획',
    image: 'https://images.unsplash.com/photo-1573164574230-db1d5e960238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '집중력을 높이는 조용한 서재',
    location: '평촌 푸르지오',
    size: '40평'
  },
  {
    id: 8,
    title: '일산 호수공원 다이닝',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1758977405163-f2595de08dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '가족이 함께하는 다이닝 공간',
    location: '일산 호수공원',
    size: '36평'
  },
  {
    id: 9,
    title: '파주 운정 드레스룸',
    category: '디자인계획',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '효율적인 수납이 가능한 드레스룸',
    location: '파주 운정',
    size: '47평'
  },
  {
    id: 10,
    title: '용인 롯데캐슬 거실',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '현대적 감각의 트렌디한 거실',
    location: '용인 롯데캐슬',
    size: '44평'
  },
  {
    id: 11,
    title: '성남 판교 침실',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '우드 톤의 따뜻한 침실',
    location: '성남 판교',
    size: '39평'
  },
  {
    id: 12,
    title: '광교 자이 주방',
    category: '주거공간',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: '깔끔하고 기능적인 주방',
    location: '광교 자이',
    size: '48평'
  }
];

const categories = ['전체', '주택', '주거공간', '상업공간', '상공간', '디자인계획'];

export function ApartmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === '전체'
      ? apartmentItems
      : apartmentItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1613545325268-9265e1609167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="아파트 인테리어 갤러리"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="mb-3 text-xs sm:text-sm tracking-[0.3em] font-normal opacity-90">APARTMENT INTERIOR</p>
          <h1 className="mb-4 sm:mb-6 font-extrabold text-2xl sm:text-3xl md:text-4xl">아파트 인테리어</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal opacity-90">
            당신의 라이프스타일에 맞춘 공간 디자인<br className="hidden sm:inline" />
            실용성과 아름다움을 동시에
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors font-semibold ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
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
            <h2 className="mb-4 font-bold">아파트 인테리어 프로세스</h2>
            <p className="text-gray-600 font-normal">
              체계적인 프로세스로 완벽한 공간을 만들어갑니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">01</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">현장 조사</h3>
              <p className="text-sm text-gray-600 font-normal">
                공간 파악 및<br />요구사항 확인
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">02</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">디자인 제안</h3>
              <p className="text-sm text-gray-600 font-normal">
                맞춤 디자인 및<br />3D 시뮬레이션
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">03</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">시공 진행</h3>
              <p className="text-sm text-gray-600 font-normal">
                체계적인<br />공정 관리
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">04</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">최종 점검</h3>
              <p className="text-sm text-gray-600 font-normal">
                마감 확인 및<br />하자 보수
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">하우두홈 인테리어의 특징</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="mb-3 font-bold text-gray-900">맞춤형 디자인</h3>
              <p className="text-gray-600 font-normal leading-relaxed">
                고객님의 라이프스타일과 취향을 반영한 
                나만의 공간을 설계합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="mb-3 font-bold text-gray-900">품질 보증</h3>
              <p className="text-gray-600 font-normal leading-relaxed">
                엄선된 자재와 숙련된 시공팀으로
                최상의 품질을 보장합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="mb-3 font-bold text-gray-900">사후 관리</h3>
              <p className="text-gray-600 font-normal leading-relaxed">
                완공 후에도 꼼꼼한 점검과
                하자 보수 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 font-bold text-white">당신의 공간을 특별하게</h2>
          <p className="mb-10 text-lg font-normal opacity-90 leading-relaxed">
            아파트 인테리어 전문가와 함께<br />
            꿈꾸던 공간을 현실로 만들어보세요
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
