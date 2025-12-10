import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Eye, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../lib/supabase';

interface NewsDetail {
  id: string;
  category: string;
  title: string;
  content: string;
  thumbnail_url: string | null;
  created_at: string;
  published_at: string;
  views: number;
}

interface RelatedNews {
  id: string;
  title: string;
  published_at: string;
}

export function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [relatedNews, setRelatedNews] = useState<RelatedNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // 뉴스 상세 정보 가져오기
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) throw error;

        if (!data) {
          navigate('/news');
          return;
        }

        setNewsDetail(data);

        // 조회수 증가
        await supabase
          .from('news')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', id);

        // 관련 뉴스 가져오기 (같은 카테고리, 현재 글 제외)
        const { data: related } = await supabase
          .from('news')
          .select('id, title, published_at')
          .eq('is_published', true)
          .eq('category', data.category)
          .neq('id', id)
          .order('published_at', { ascending: false })
          .limit(3);

        setRelatedNews(related || []);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        navigate('/news');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id, navigate]);

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

  if (!newsDetail) {
    return null;
  }

  return (
    <div className="pt-20">
      {/* 헤더 */}
      <section className="py-8 border-b bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 font-normal"
          >
            <ChevronLeft size={20} />
            목록으로
          </Link>

          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(newsDetail.category)}`}>
              {newsDetail.category}
            </span>
          </div>

          <h1 className="mb-4 font-extrabold text-2xl md:text-3xl">{newsDetail.title}</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-normal">{formatDate(newsDetail.published_at || newsDetail.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span className="font-normal">조회 {(newsDetail.views || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 대표 이미지 */}
          {newsDetail.thumbnail_url && (
            <div className="aspect-video rounded-lg overflow-hidden mb-12">
              <ImageWithFallback
                src={newsDetail.thumbnail_url}
                alt={newsDetail.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* 본문 내용 */}
          <article className="prose prose-lg max-w-none">
            {newsDetail.content ? (
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: newsDetail.content }}
              />
            ) : (
              <p className="text-gray-500">내용이 없습니다.</p>
            )}
          </article>

          {/* 하단 버튼 */}
          <div className="mt-12 pt-8 border-t">
            <Link 
              to="/news"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              <ChevronLeft size={20} />
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>

      {/* 관련 게시물 */}
      {relatedNews.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="mb-6 font-bold">다른 소식 보기</h3>
            <div className="space-y-4">
              {relatedNews.map(item => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-900 transition-colors group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-normal text-gray-900 group-hover:underline">{item.title}</span>
                    <span className="text-sm text-gray-500 font-normal">{formatDate(item.published_at)}</span>
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
