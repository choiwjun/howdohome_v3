import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Clock, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../lib/supabase';

interface JournalDetail {
  id: string;
  category: string;
  title: string;
  location: string;
  published_at: string;
  created_at: string;
  progress_status: string;
  description: string;
  content: string;
  thumbnail_url: string | null;
}

interface JournalImage {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
}

interface RelatedJournal {
  id: string;
  title: string;
  location: string;
  thumbnail_url: string | null;
}

export function JournalDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journalDetail, setJournalDetail] = useState<JournalDetail | null>(null);
  const [journalImages, setJournalImages] = useState<JournalImage[]>([]);
  const [relatedJournals, setRelatedJournals] = useState<RelatedJournal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournalDetail = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // 현장일지 상세 정보 가져오기
        const { data, error } = await supabase
          .from('journals')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) throw error;

        if (!data) {
          navigate('/journal');
          return;
        }

        setJournalDetail(data);

        // 현장일지 이미지 가져오기
        const { data: images } = await supabase
          .from('journal_images')
          .select('*')
          .eq('journal_id', id)
          .order('sort_order', { ascending: true });

        setJournalImages(images || []);

        // 관련 현장일지 가져오기 (같은 카테고리, 현재 글 제외)
        const { data: related } = await supabase
          .from('journals')
          .select('id, title, location, thumbnail_url')
          .eq('is_published', true)
          .eq('category', data.category)
          .neq('id', id)
          .order('published_at', { ascending: false })
          .limit(3);

        setRelatedJournals(related || []);
      } catch (error) {
        console.error('Error fetching journal detail:', error);
        navigate('/journal');
      } finally {
        setLoading(false);
      }
    };

    fetchJournalDetail();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace('.', '');
  };

  // 기본 썸네일 이미지
  const defaultThumbnail = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
          <p className="text-gray-500">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!journalDetail) {
    return null;
  }

  return (
    <div className="pt-20">
      {/* 헤더 */}
      <section className="py-8 border-b bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/journal" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 font-normal"
          >
            <ChevronLeft size={20} />
            목록으로
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
              {journalDetail.category}
            </span>
            {journalDetail.progress_status && (
              <span className="text-sm text-blue-600 font-semibold">
                {journalDetail.progress_status}
              </span>
            )}
          </div>

          <h1 className="mb-4 font-extrabold text-2xl md:text-3xl">{journalDetail.title}</h1>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            {journalDetail.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="font-normal">{journalDetail.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-normal">최종 업데이트: {formatDate(journalDetail.published_at || journalDetail.created_at)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 대표 이미지 */}
      {journalDetail.thumbnail_url && (
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src={journalDetail.thumbnail_url}
                alt={journalDetail.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 프로젝트 개요 */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {journalDetail.description && (
            <>
              <h2 className="mb-6 font-bold">프로젝트 개요</h2>
              <p className="mb-6 text-gray-700 font-normal leading-relaxed">
                {journalDetail.description}
              </p>
            </>
          )}

          {/* 본문 내용 */}
          {journalDetail.content && (
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: journalDetail.content }}
              />
            </div>
          )}
        </div>
      </section>

      {/* 공사 진행 이미지 갤러리 */}
      {journalImages.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-bold">공사 진행 과정</h2>

            <div className="space-y-12">
              {journalImages.map((image, index) => (
                <div key={image.id} className="relative">
                  {/* 타임라인 선 */}
                  {index !== journalImages.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-300 md:left-8 md:top-8" />
                  )}

                  <div className="flex gap-6">
                    {/* 번호 */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold z-10">
                      {index + 1}
                    </div>

                    {/* 이미지 + 설명 */}
                    <div className="flex-1 bg-white rounded-lg overflow-hidden border border-gray-200">
                      <div className="aspect-video overflow-hidden">
                        <ImageWithFallback
                          src={image.image_url}
                          alt={image.caption || `공사 진행 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {image.caption && (
                        <div className="p-4">
                          <p className="text-gray-700 font-normal">{image.caption}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 하단 버튼 */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/journal"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            <ChevronLeft size={20} />
            목록으로 돌아가기
          </Link>
        </div>
      </section>

      {/* 다른 현장 보기 */}
      {relatedJournals.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="mb-6 font-bold">다른 현장 보기</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedJournals.map(item => (
                <Link
                  key={item.id}
                  to={`/journal/${item.id}`}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-900 transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={item.thumbnail_url || defaultThumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{
                        filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    {item.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span className="font-normal">{item.location}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
