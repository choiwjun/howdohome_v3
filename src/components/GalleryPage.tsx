import { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../lib/supabase';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  sub_category: string | null;
  thumbnail_url: string | null;
  description: string;
  location: string | null;
  area: string | null;
}

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
}

// 기본 갤러리 아이템 (DB에 데이터가 없을 경우 표시)
const defaultGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: '모던 아파트 A동',
    category: '주거공간',
    sub_category: '거실',
    thumbnail_url: 'https://images.unsplash.com/photo-1613545325268-9265e1609167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '넓은 창과 자연광이 가득한 모던한 거실 공간',
    location: null,
    area: null,
  },
  {
    id: '2',
    title: '프리미엄 주방',
    category: '주거공간',
    sub_category: '주방',
    thumbnail_url: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '실용성과 디자인을 모두 갖춘 주방',
    location: null,
    area: null,
  },
  {
    id: '3',
    title: '미니멀 침실',
    category: '주거공간',
    sub_category: '침실',
    thumbnail_url: 'https://images.unsplash.com/photo-1535049752-3baf525dd015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '편안한 휴식을 위한 미니멀 침실',
    location: null,
    area: null,
  },
  {
    id: '4',
    title: '럭셔리 욕실',
    category: '주거공간',
    sub_category: '욕실',
    thumbnail_url: 'https://images.unsplash.com/photo-1688786219616-598ed96aa19d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '호텔 같은 프리미엄 욕실 공간',
    location: null,
    area: null,
  },
  {
    id: '5',
    title: '엘레강트 다이닝',
    category: '주거공간',
    sub_category: '식당',
    thumbnail_url: 'https://images.unsplash.com/photo-1758977405163-f2595de08dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '특별한 시간을 위한 다이닝 공간',
    location: null,
    area: null,
  },
  {
    id: '6',
    title: '모던 외관',
    category: '주택',
    sub_category: '외관',
    thumbnail_url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '세련된 건물 외관 디자인',
    location: null,
    area: null,
  },
];

const categories = ['전체', '거실', '주방', '침실', '욕실', '식당', '외관'];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedItemImages, setSelectedItemImages] = useState<GalleryImage[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryItems = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('gallery_projects')
        .select('*')
        .eq('is_published', true)
        .eq('page_type', 'gallery');

      // 카테고리 필터 (서브 카테고리 기준)
      if (selectedCategory !== '전체') {
        query = query.eq('sub_category', selectedCategory);
      }

      const { data, error } = await query
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

      // DB에 데이터가 있으면 사용, 없으면 기본 데이터 사용
      if (data && data.length > 0) {
        setGalleryItems(data);
      } else {
        // 기본 데이터에서 필터링
        const filtered = selectedCategory === '전체' 
          ? defaultGalleryItems 
          : defaultGalleryItems.filter(item => item.sub_category === selectedCategory);
        setGalleryItems(filtered);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      // 에러 발생 시 기본 데이터 사용
      const filtered = selectedCategory === '전체' 
        ? defaultGalleryItems 
        : defaultGalleryItems.filter(item => item.sub_category === selectedCategory);
      setGalleryItems(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, [selectedCategory]);

  // 선택된 아이템의 이미지 가져오기
  const fetchItemImages = async (itemId: string) => {
    try {
      const { data } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('project_id', itemId)
        .order('sort_order', { ascending: true });
      
      setSelectedItemImages(data || []);
    } catch (error) {
      console.error('Error fetching item images:', error);
      setSelectedItemImages([]);
    }
  };

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    fetchItemImages(item.id);
  };

  // 기본 썸네일
  const defaultThumbnail = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1639400973459-bfda4538964d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
          {loading ? (
            <div className="py-24 text-center">
              <RefreshCw className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
              <p className="text-gray-500">불러오는 중...</p>
            </div>
          ) : galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative h-80 overflow-hidden rounded-lg bg-gray-200">
                    <ImageWithFallback
                      src={item.thumbnail_url || defaultThumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        filter: 'brightness(0.95) contrast(1.05) saturate(0.9)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-2">
                        {item.sub_category || item.category}
                      </div>
                      <h3 className="mb-1">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-gray-500">등록된 갤러리 이미지가 없습니다</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedItem(null);
            setSelectedItemImages([]);
          }}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            onClick={() => {
              setSelectedItem(null);
              setSelectedItemImages([]);
            }}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <ImageWithFallback
                src={selectedItem.thumbnail_url || defaultThumbnail}
                alt={selectedItem.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>
            <div className="mt-6 text-center text-white">
              <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
                {selectedItem.sub_category || selectedItem.category}
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
              <p className="text-white/80">{selectedItem.description}</p>
              {selectedItem.location && (
                <p className="text-white/60 text-sm mt-2">위치: {selectedItem.location}</p>
              )}
              {selectedItem.area && (
                <p className="text-white/60 text-sm">면적: {selectedItem.area}</p>
              )}
            </div>

            {/* 추가 이미지 갤러리 */}
            {selectedItemImages.length > 0 && (
              <div className="mt-6 grid grid-cols-4 gap-2">
                {selectedItemImages.map((img) => (
                  <div key={img.id} className="aspect-square rounded overflow-hidden">
                    <ImageWithFallback
                      src={img.image_url}
                      alt={img.caption || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
