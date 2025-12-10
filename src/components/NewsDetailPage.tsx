import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Calendar, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import img1 from 'figma:asset/484e40df2aa4a411a694b784e230ad49ccb50f39.png';
import img2 from 'figma:asset/ead4bf345d7b70e1db1649145c6c77a246545686.png';
import img3 from 'figma:asset/5385629297c2e39306cb1decb9745c51bd0e5637.png';
import img4 from 'figma:asset/de8dbf683c880b2c3d917d342a5e4ea581614191.png';
import img5 from 'figma:asset/5ac4eea53944be73f72fc58b24b22d7c8bcf14a7.png';
import img6 from 'figma:asset/b9d51e66ee3b946038ea82f117569f7a0c6284cb.png';
import img7 from 'figma:asset/3633a605f03cbace4e4589925b72a04f5af2619f.png';
import img8 from 'figma:asset/70a12a7763b4e4420472e1cc68c4cc9e1453b7fb.png';
import img9 from 'figma:asset/f0daad5f76936f308903577f71f124a6140d9924.png';
import img10 from 'figma:asset/521894d6ca1dee35a8706c8c809236266968a86d.png';
import img11 from 'figma:asset/250315c5eb7966288037af3261432e421e7366ed.png';
import img12 from 'figma:asset/264b2c8b7d86a973d0e6270e2dfc2631aa3d2620.png';
import img13 from 'figma:asset/83ea3cce78e48d728e941efc636c4605db9a73a4.png';
import img14 from 'figma:asset/b5134dc9dc3526ea0c1bef7678c7712bd7046396.png';

export function NewsDetailPage() {
  const { id } = useParams();
  const newsId = Number(id);

  // 청라동 단독주택 12호 프로젝트 (ID: 11)
  if (newsId === 11) {
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
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                시공사례
              </span>
            </div>

            <h1 className="mb-4 font-extrabold">청라동 단독주택 12호 인테리어 프로젝트</h1>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="font-normal">2024.02.10</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span className="font-normal">조회 4,832</span>
              </div>
            </div>
          </div>
        </section>

        {/* 본문 */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 대표 이미지 - 외관 야경 */}
            <div className="aspect-video rounded-lg overflow-hidden mb-12">
              <img
                src={img1}
                alt="청라동 단독주택 12호 외관"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 본문 내용 */}
            <article className="space-y-8 text-gray-700 leading-relaxed">
              
              {/* 프로젝트 개요 */}
              <div>
                <h2 className="mb-6 font-bold text-gray-900">프로젝트 개요</h2>
                <div className="bg-gray-50 p-6 rounded-lg space-y-3 font-normal">
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-semibold min-w-[100px]">위치:</span>
                    <span>인천 서구 청라동 20-8</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-semibold min-w-[100px]">연면적:</span>
                    <span>190㎡</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-semibold min-w-[100px]">대지면적:</span>
                    <span>279㎡</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-semibold min-w-[100px]">구조:</span>
                    <span>철근 콘크리트 2층</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-semibold min-w-[100px]">공사기간:</span>
                    <span>7개월</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-semibold min-w-[100px]">컨셉:</span>
                    <span>심플 & 모던 프리미엄 인테리어</span>
                  </div>
                </div>
              </div>

              {/* 외관 이미지 추가 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={img2}
                    alt="청라동 단독주택 측면"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1715890109438-066a50eee357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGVudHJhbmNlfGVufDF8fHx8MTc2NDM5NjkzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="현관"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                    }}
                  />
                </div>
              </div>

              {/* 프로젝트 특징 */}
              <div>
                <h2 className="mb-6 font-bold text-gray-900">프로젝트 특징</h2>
                
                {/* 1. 개방감을 살린 거실 디자인 */}
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">1. 개방감을 살린 거실 디자인</h3>
                  <p className="mb-4 font-normal">
                    넓은 창과 이중 높이 구조를 활용해 채광과 개방감을 극대화했습니다.
                    전체 톤을 화이트·우드 조합으로 맞추어, 공간 전체가 밝고 고급스럽게 느껴지도록 설계했습니다.
                  </p>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={img3}
                      alt="거실 내부"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 거실 + 주방 오픈형 공간 */}
                <div className="rounded-lg overflow-hidden mb-8">
                  <img
                    src={img4}
                    alt="거실과 주방 오픈형 공간"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 2. 호텔 라이크 키친 & 다이닝 */}
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">2. 호텔 라이크 키친 & 다이닝</h3>
                  <p className="mb-4 font-normal">
                    일체형 주방 라인과 절제된 컬러 매칭으로 군더더기 없는 조리공간을 구현했습니다.
                    대형 창을 통해 자연광이 들어와 식사 공간 또한 여유로운 분위기로 완성되었습니다.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={img10}
                        alt="주방 아일랜드"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={img11}
                        alt="주방 전경"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. 고급 자재를 활용한 디테일 완성도 */}
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">3. 고급 자재를 활용한 디테일 완성도</h3>
                  <p className="mb-4 font-normal">
                    거실 벽면의 마블 텍스처, 우드 패턴의 바닥재, 간접조명 라인 등
                    집의 중심이 되는 공간마다 고급 마감재를 적용하여 전체적인 완성도를 높였습니다.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={img6}
                        alt="침실"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={img9}
                        alt="마블 욕실"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 추가 침실 및 파우더룸 이미지 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={img7}
                      alt="간접조명이 있는 침실"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={img8}
                      alt="우드 패널 벽 침실"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 파우더룸 및 욕실 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={img12}
                      alt="고급스러운 파우더룸"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={img13}
                      alt="욕실 세면대"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 욕실 추가 */}
                <div className="rounded-lg overflow-hidden mb-8">
                  <img
                    src={img14}
                    alt="모던 욕실"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 4. 동선 중심의 실용적 설계 */}
                <div className="mb-8">
                  <h3 className="mb-4 font-bold">4. 동선 중심의 실용적 설계</h3>
                  <p className="mb-4 font-normal">
                    현관-거실-주방-계단실로 이어지는 흐름을 자연스럽게 연결하고,
                    계단실에는 우드 천장 조명 라인을 적용하여 공간적 깊이를 더했습니다.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1759299983467-5276cb6ac2c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdGFpcmNhc2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ0NDc2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="계단"
                        className="w-full h-full object-cover"
                        style={{
                          filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                        }}
                      />
                    </div>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img
                        src={img5}
                        alt="우드 천장 조명이 있는 계단 및 복도"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 추가 공간 이미지 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1739172586862-80edb0432fba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGhhbGx3YXl8ZW58MXx8fHwxNzY0NDQ3NjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="복도"
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                      }}
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1565672597725-f3101482cf6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwbW9kZXJuJTIwaG91c2V8ZW58MXx8fHwxNzY0NDQ3NjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="발코니"
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 고객 한줄평 */}
              <div>
                <h2 className="mb-4 font-bold text-gray-900">고객 한줄평</h2>
                <div className="p-8 bg-gray-50 rounded-lg border-l-4 border-gray-900">
                  <p className="text-lg italic font-normal leading-relaxed">
                    "정말 호텔 같은 집이 완성됐어요. 밝고 따뜻한 분위기 덕분에 가족 모두가 만족하고 있습니다.
                    세심한 디테일 덕분에 오래 머물수록 더 좋은 집입니다."
                  </p>
                </div>
              </div>

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
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="mb-6 font-bold">다른 소식 보기</h3>
            <div className="space-y-4">
              {[
                { id: 3, title: '경기도 고양시 단독주택 신축 공사 완료', date: '2024.01.20' },
                { id: 4, title: '서울 강남구 주택 리모델링 프로젝트', date: '2024.01.18' },
                { id: 10, title: '인천 연수구 다가구주택 신축 완료', date: '2023.12.05' }
              ].map(item => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-900 transition-colors group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-normal text-gray-900 group-hover:underline">{item.title}</span>
                    <span className="text-sm text-gray-500 font-normal">{item.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 기본 시공사례 (다른 ID들)
  const newsDetail = {
    id: Number(id),
    category: '시공사례',
    title: '경기도 고양시 단독주택 신축 공사 완료',
    date: '2024.01.20',
    views: 3421,
    content: `
      <p>경기도 고양시 일산동구에 위치한 단독주택 신축 공사가 성공적으로 완료되었습니다.</p>
      
      <h3>프로젝트 개요</h3>
      <ul>
        <li>위치: 경기도 고양시 일산동구</li>
        <li>대지면적: 250㎡</li>
        <li>건축면적: 150㎡</li>
        <li>구조: 철근콘크리트 + 경량목구조</li>
        <li>공사기간: 2023.06 ~ 2024.01 (8개월)</li>
      </ul>

      <h3>프로젝트 특징</h3>
      <p>고객님은 자녀 3명과 함께 거주할 넓은 공간과, 재택근무를 위한 독립된 서재 공간을 원하셨습니다. 
      하우두홈은 고객의 라이프스타일을 세심하게 분석하여 다음과 같은 특징을 반영했습니다.</p>

      <p><strong>1. 가족 친화적 공간 설계</strong><br/>
      넓은 거실과 주방을 오픈형으로 연결하여 가족 간 소통이 원활한 공간을 만들었습니다. 
      2층에는 각 자녀의 개성을 살린 독립적인 방 3개와 부모님 안방을 배치했습니다.</p>

      <p><strong>2. 자연채광 극대화</strong><br/>
      남향 배치와 대형 창호를 통해 자연채광을 최대한 끌어들였습니다. 
      특히 거실과 주방에는 천창을 설치하여 하루 종일 밝은 빛이 들어옵니다.</p>

      <p><strong>3. 에너지 효율</strong><br/>
      고단열 시스템과 삼중 유리창을 적용하여 에너지 효율을 극대화했습니다. 
      또한 태양광 패널을 설치하여 전기세 절감 효과를 누리실 수 있습니다.</p>

      <h3>고객 만족도</h3>
      <p>"설계 단계부터 시공, 준공까지 하우두홈의 꼼꼼한 관리에 정말 만족합니다. 
      특히 현장소장님이 매주 시공 진행 상황을 사진으로 공유해주셔서 믿고 맡길 수 있었습니다. 
      입주한 지 한 달이 지났는데 아이들이 너무 좋아해요." - 김OO 고객님</p>

      <p>하우두홈은 앞으로도 고객의 삶을 더 행복하게 만드는 공간을 완성하기 위해 최선을 다하겠습니다.</p>
    `
  };

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
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
              {newsDetail.category}
            </span>
          </div>

          <h1 className="mb-4 font-extrabold">{newsDetail.title}</h1>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-normal">{newsDetail.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span className="font-normal">조회 {newsDetail.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 대표 이미지 */}
          <div className="aspect-video rounded-lg overflow-hidden mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt={newsDetail.title}
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
              }}
            />
          </div>

          {/* 본문 내용 */}
          <article className="space-y-6 text-gray-700 leading-relaxed">
            <p className="font-normal">
              경기도 고양시 일산동구에 위치한 단독주택 신축 공사가 성공적으로 완료되었습니다.
            </p>
            
            <div>
              <h3 className="mb-4 font-bold">프로젝트 개요</h3>
              <ul className="space-y-2 list-disc list-inside font-normal">
                <li>위치: 경기도 고양시 일산동구</li>
                <li>대지면적: 250㎡</li>
                <li>건축면적: 150㎡</li>
                <li>구조: 철근콘크리트 + 경량목구조</li>
                <li>공사기간: 2023.06 ~ 2024.01 (8개월)</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">프로젝트 특징</h3>
              <p className="mb-4 font-normal">
                고객님은 자녀 3명과 함께 거주할 넓은 공간과, 재택근무를 위한 독립된 서재 공간을 원하셨습니다. 
                하우두홈은 고객의 라이프스타일을 세심하게 분석하여 다음과 같은 특징을 반영했습니다.
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">1. 가족 친화적 공간 설계</p>
                  <p className="font-normal">
                    넓은 거실과 주방을 오픈형으로 연결하여 가족 간 소통이 원활한 공간을 만들었습니다. 
                    2층에는 각 자녀의 개성을 살린 독립적인 방 3개와 부모님 안방을 배치했습니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">2. 자연채광 극대화</p>
                  <p className="font-normal">
                    남향 배치와 대형 창호를 통해 자연채광을 최대한 끌어들였습니다. 
                    특히 거실과 주방에는 천창을 설치하여 하루 종일 밝은 빛이 들어옵니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">3. 에너지 효율</p>
                  <p className="font-normal">
                    고단열 시스템과 삼중 유리창을 적용하여 에너지 효율을 극대화했습니다. 
                    또한 태양광 패널을 설치하여 전기세 절감 효과를 누리실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-bold">고객 만족도</h3>
              <p className="p-6 bg-gray-50 rounded-lg border-l-4 border-gray-900 italic font-normal">
                "설계 단계부터 시공, 준공까지 하우두홈의 꼼꼼한 관리에 정말 만족합니다. 
                특히 현장소장님이 매주 시공 진행 상황을 사진으로 공유해주셔서 믿고 맡길 수 있었습니다. 
                입주한 지 한 달이 지났는데 아이들이 너무 좋아해요." - 김OO 고객님
              </p>
            </div>

            <p className="font-normal">
              하우두홈은 앞으로도 고객의 삶을 더 행복하게 만드는 공간을 완성하기 위해 최선을 다하겠습니다.
            </p>
          </article>

          {/* 추가 이미지 갤러리 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="시공사례 2"
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                }}
              />
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="시공사례 3"
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                }}
              />
            </div>
          </div>

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
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="mb-6 font-bold">다른 소식 보기</h3>
          <div className="space-y-4">
            {[
              { id: 4, title: '서울 강남구 주택 리모델링 프로젝트', date: '2024.01.18' },
              { id: 8, title: '경기도 파주시 전원주택 준공 사례', date: '2023.12.15' },
              { id: 10, title: '인천 연수구 다가구주택 신축 완료', date: '2023.12.05' }
            ].map(item => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-900 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-normal text-gray-900 group-hover:underline">{item.title}</span>
                  <span className="text-sm text-gray-500 font-normal">{item.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}