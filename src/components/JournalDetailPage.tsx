import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function JournalDetailPage() {
  const { id } = useParams();

  // 실제로는 API에서 데이터를 가져올 것
  const journalDetail = {
    id: Number(id),
    category: '단독주택',
    title: '고양시 일산동구 단독주택 신축',
    location: '경기도 고양시 일산동구',
    date: '2024.11.20',
    progress: '마감공사 진행중',
    description: '250㎡ 대지에 철근콘크리트 구조로 진행되는 신축 프로젝트입니다.',
    specs: {
      area: '250㎡',
      building: '150㎡',
      structure: '철근콘크리트 + 경량목구조',
      period: '2024.03 ~ 2024.12 (10개월)'
    }
  };

  const progressImages = [
    {
      title: '기초공사 완료',
      date: '2024.04.15',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: '지반 다짐과 기초 콘크리트 타설이 완료되었습니다.'
    },
    {
      title: '골조공사 진행',
      date: '2024.06.20',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: '1층, 2층 골조 시공이 완료되어 건물의 전체적인 형태가 드러났습니다.'
    },
    {
      title: '지붕공사 완료',
      date: '2024.08.10',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: '방수 작업과 지붕 마감재 시공이 완료되었습니다.'
    },
    {
      title: '외부 마감 진행',
      date: '2024.09.25',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: '외벽 단열과 석재 마감 작업이 진행되고 있습니다.'
    },
    {
      title: '창호 설치 완료',
      date: '2024.10.15',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: '시스템 창호 설치가 완료되어 단열 성능이 확보되었습니다.'
    },
    {
      title: '내부 마감 진행중',
      date: '2024.11.20',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      description: '현재 내부 도배, 마루, 타일 등 마감공사가 한창 진행 중입니다.'
    }
  ];

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
            <span className="text-sm text-blue-600 font-semibold">
              {journalDetail.progress}
            </span>
          </div>

          <h1 className="mb-4 font-extrabold">{journalDetail.title}</h1>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="font-normal">{journalDetail.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-normal">최종 업데이트: {journalDetail.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 개요 */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-bold">프로젝트 개요</h2>
          <p className="mb-6 text-gray-700 font-normal leading-relaxed">
            {journalDetail.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1 font-normal">대지면적</p>
              <p className="font-semibold text-gray-900">{journalDetail.specs.area}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1 font-normal">건축면적</p>
              <p className="font-semibold text-gray-900">{journalDetail.specs.building}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1 font-normal">구조</p>
              <p className="font-semibold text-gray-900 text-sm">{journalDetail.specs.structure}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1 font-normal">공사기간</p>
              <p className="font-semibold text-gray-900 text-sm">{journalDetail.specs.period}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 공사 진행 과정 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-bold">공사 진행 과정</h2>

          <div className="space-y-12">
            {progressImages.map((item, index) => (
              <div key={index} className="relative">
                {/* 타임라인 선 */}
                {index !== progressImages.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-300 md:left-40 md:top-8" />
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* 날짜 */}
                  <div className="md:col-span-3 flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold z-10">
                      {index + 1}
                    </div>
                    <div className="pt-2">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                        <Clock size={14} />
                        <span className="font-normal">{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* 이미지 + 설명 */}
                  <div className="md:col-span-9 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <div className="aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        style={{
                          filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 font-normal">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="mb-6 font-bold">다른 현장 보기</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 2,
                title: '서울 강남구 주택 리모델링',
                location: '서울특별시 강남구',
                thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
              },
              {
                id: 3,
                title: '파주시 전원주택 신축현장',
                location: '경기도 파주시',
                thumbnail: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
              },
              {
                id: 4,
                title: '인천 연수구 다가구주택 신축',
                location: '인천광역시 연수구',
                thumbnail: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
              }
            ].map(item => (
              <Link
                key={item.id}
                to={`/journal/${item.id}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-900 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={item.thumbnail}
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
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={14} />
                    <span className="font-normal">{item.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
