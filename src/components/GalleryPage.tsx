import { useState } from 'react';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: '모던 아파트 A동',
    category: '거실',
    image: 'https://images.unsplash.com/photo-1613545325268-9265e1609167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQwOTg4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '넓은 창과 자연광이 가득한 모던한 거실 공간',
  },
  {
    id: 2,
    title: '프리미엄 주방',
    category: '주방',
    image: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDg5NTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '실용성과 디자인을 모두 갖춘 주방',
  },
  {
    id: 3,
    title: '미니멀 침실',
    category: '침실',
    image: 'https://images.unsplash.com/photo-1535049752-3baf525dd015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDA1NTEzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '편안한 휴식을 위한 미니멀 침실',
  },
  {
    id: 4,
    title: '럭셔리 욕실',
    category: '욕실',
    image: 'https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiYXRocm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NjQwMzY2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '호텔 같은 프리미엄 욕실 공간',
  },
  {
    id: 5,
    title: '엘레강트 다이닝',
    category: '식당',
    image: 'https://images.unsplash.com/photo-1758977405163-f2595de08dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGluaW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQwODY5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '특별한 시간을 위한 다이닝 공간',
  },
  {
    id: 6,
    title: '모던 외관',
    category: '외관',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM5ODg5NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '세련된 건물 외관 디자인',
  },
  {
    id: 7,
    title: '컨템포러리 거실',
    category: '거실',
    image: 'https://images.unsplash.com/photo-1639400973459-bfda4538964d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBrb3JlYW4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQwOTg4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '현대적 감각의 거실 인테리어',
  },
  {
    id: 8,
    title: '스타일리시 인테리어',
    category: '거실',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY0MDI5NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '트렌디한 인테리어 디자인',
  },
];

const categories = ['전체', '거실', '주방', '침실', '욕실', '식당', '외관'];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === '전체'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1639400973459-bfda4538964d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBrb3JlYW4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQwOTg4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="주거공간 갤러리"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-4">주거공간 갤러리</h1>
            <p className="text-xl text-white/90">
              하우두홈이 완성한 프리미엄 주거공간
            </p>
          </div>
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
                className={`px-6 py-2 rounded-full transition-colors ${
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
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-80 overflow-hidden rounded-lg bg-gray-200">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      filter: 'brightness(0.95) contrast(1.05) saturate(0.9)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-2">
                      {item.category}
                    </div>
                    <h3 className="mb-1">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">해당 카테고리의 프로젝트가 없습니다.</p>
            </div>
          )}
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
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-3">
                {selectedItem.category}
              </div>
              <h2 className="mb-2">{selectedItem.title}</h2>
              <p className="text-white/80 text-lg">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4">
            당신의 공간도 이렇게 변화시킬 수 있습니다
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            하우두홈과 함께 특별한 주거공간을 만들어보세요
          </p>
          <a
            href="tel:031-975-9372"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
          >
            상담 문의하기
          </a>
        </div>
      </section>
    </div>
  );
}
