import { ImageWithFallback } from './figma/ImageWithFallback';

const portfolioItems = [
  { year: 2014, text: '경기도 고양시 성석동 단독주택 1호 시공 (철근콘크리트)' },
  { year: 2014, text: '경기도 파주시 산남동 단독주택 1호 시공 (목조주택)' },
  { year: 2014, text: '경기도 용인시 제일리 단독주택 시공 (목조주택)' },
  { year: 2014, text: '제주도 서귀포시 호근동 단독주택 1호 시공 (목조주택)' },
  { year: 2014, text: '경기도 화성시 신외동 단독주택 1호 시공 (철근콘크리트)' },
  { year: 2014, text: '경기도 화성시 기천리 단독주택 2호 시공 (목조주택)' },
  { year: 2015, text: '경기도 안산시 에코텍 게스트하우스 시공 (철근콘크리트)' },
  { year: 2015, text: '충청북도 괴산 무인텔 시공 (철근콘크리트)' },
  { year: 2015, text: '경상남도 통영시 서예가를 위한 단독주택 시공 (목조주택)' },
  { year: 2015, text: '전라북도 전주시 효자동 단독주택 시공 (철근콘크리트)' },
  { year: 2015, text: '경기도 파주시 산남동 단독주택 2호 시공 (목조주택)' },
  { year: 2015, text: '전라북도 진안군 이랑교육원 증축공사 (철근콘크리트)' },
  { year: 2015, text: '강원도 평창시 재산리 단독주택 시공 (철근콘크리트)' },
  { year: 2016, text: '제주도 제주시 애월읍 고내리 단독주택 2호 시공 (목조주택)' },
  { year: 2016, text: '경기도 김포시 장기동 단독주택 1호 시공 (목조주택)' },
  { year: 2016, text: '경상남도 고성군 단독주택 시공 (목조주택)' },
  { year: 2016, text: '전라북도 전주시 위례신도시 다세대주택 시공 (철근콘크리트)' },
  { year: 2016, text: '전라북도 전주시 화산동 단독주택 시공 (목조주택)' },
  { year: 2016, text: '인천 서구 청라동 상가주택 시공 (철근콘크리트)' },
  { year: 2016, text: '경기도 김포시 대능리 단독주택 2호 시공 (목조주택)' },
  { year: 2016, text: '경기도 김포시 양곡리 단독주택 3호 시공 (목조주택)' },
  { year: 2016, text: '경기도 고양시 문봉동 단독주택 2호 시공 (목조주택)' },
  { year: 2016, text: '제주도 제주시 노형동 단독주택 3호 시공 (목조주택)' },
  { year: 2017, text: '경기도 일산 마두동 다세대주택 시공 (철근콘크리트)' },
  { year: 2017, text: '경기도 파주시 교하동 단독주택 시공 (목조주택)' },
  { year: 2017, text: '경기도 의정부시 아파트 인테리어' },
  { year: 2017, text: '강원도 홍천시 유목정리 단독주택 시공 (목조주택)' },
  { year: 2017, text: '인천 중구 운서동 단독주택 시공 (목조주택)' },
  { year: 2017, text: '경기도 시흥시 정왕동 중식당 1호 인테리어' },
  { year: 2017, text: '인천 강화도 선두리 단독주택 시공 (목조주택)' },
  { year: 2017, text: '경기도 김포시 운양동 단독주택 4호 시공 (목조주택)' },
  { year: 2017, text: '경기도 안산시 대부남동 단독주택 시공 (철근콘크리트)' },
  { year: 2018, text: '경기도 김포시 장기동 단독주택 5호 시공 (철근콘크리트)' },
  { year: 2018, text: '경기도 안산시 대부남동 펜션 시공 (철근콘크리트)' },
  { year: 2018, text: '경기도 시흥시 배곧 단독주택 1호 시공 (철근콘크리트)' },
  { year: 2018, text: '경기도 시흥시 배 gord 단독주택 2호 시공 (철근콘크리트)' },
  { year: 2018, text: '인천 서구 청라동 단독주택 1호 시공 (목조주택)' },
  { year: 2018, text: '인천 서구 청라동 더카운티웨스트 단독주택 2호 시공 (목조주택)' },
  { year: 2018, text: '경기도 파주시 산남동 단독주택 3호 시공' },
  { year: 2018, text: '경기도 시흥시 월곶동 근린생활시설 시공 (철골구조)' },
  { year: 2018, text: '경기도 시흥시 정왕동 중식당 2호 인테리어' },
  { year: 2019, text: '인천 서구 청라동 단독주택 3호 시공 (목조주택)' },
  { year: 2019, text: '인천 서구 청라동 단독주택 4호 시공 (목조주택)' },
  { year: 2019, text: '인천 서구 청라동 더카운티웨스트 단독주택 5호 시공 (철근콘크리트)' },
  { year: 2019, text: '경기도 성남시 분당구 운중더디바인 단독주택 시공 (철근콘크리트)' },
  { year: 2019, text: '인천 서구 청라동 단독주택 6호 시공 (철근콘크리트)' },
  { year: 2019, text: '인천 서구 청라동 더카운티웨스트 단독주택 7호 시공 (철근콘크리트)' },
  { year: 2019, text: '인천 서구 청라동 단독주택 8호 시공 (목조주택)' },
  { year: 2020, text: '서울 용산구 용문동 다세대주택 1호 시공 (철근콘크리트)' },
  { year: 2020, text: '인천 서구 청라동 단독주택 9호 시공 (목조주택)' },
  { year: 2020, text: '인천 서구 청라동 단독주택 10호 시공 (철근콘크리트)' },
  { year: 2020, text: '인천 서구 청라동 단독주택 11호 시공 (목조주택)' },
  { year: 2020, text: '경기도 안양시 석수동 아파트 인테리어' },
  { year: 2021, text: '서울 용산구 용문동 다세대주택 2호 시공 (철근콘크리트)' },
  { year: 2021, text: '인천 서구 청라동 단독주택 12호 시공 (철근콘크리트)' },
  { year: 2021, text: '인천 서구 청라동 단독주택 13호 시공 (철근콘크리트)' },
  { year: 2021, text: '강원도 홍천 물걸리 단독주택 1,2,3호 시공 (목조주택)' },
  { year: 2021, text: '충청남도 아산시 산전리 단독주택 시공 (목조주택)' },
  { year: 2021, text: '경기도 화성시 청계동 단독주택 시공 (철근콘크리트)' },
  { year: 2022, text: '경기도 고양시 지축동 단독주택 3호 시공 (철근콘크리트)' },
  { year: 2022, text: '경기도 화성시 송산그린시티 단독주택 시공 (철근콘크리트)' },
  { year: 2022, text: '경기도 일산동구 아파트 인테리어' },
  { year: 2022, text: '인천 서구 청라동 더카운티웨스트 단독주택 14호 시공 (철근콘크리트)' },
  { year: 2022, text: '경기도 화성시 청계동 단독주택 시공 (철근콘크리트)' },
  { year: 2022, text: '인천 연수구 동춘동 단독주택 시공 (철근콘크리트)' },
  { year: 2023, text: '경기도 평택시 지제동 근린생활시설 1,2,3호 시공 (철골구조)' },
  { year: 2023, text: '경기도 시흥시 정왕동 중식당 3호 인테리어' },
  { year: 2023, text: '경기도 고양시 용두동 단독주택 3,4호 시공 (철근콘크리트)' },
  { year: 2023, text: '경기도 김포시 아파트 인테리어' },
  { year: 2023, text: '경기도 평택시 고덕면 단독주택 시공 (철근콘크리트)' },
  { year: 2024, text: '대전 중구 안영동 장애인보호시설 시공 (철근콘크리트)' },
  { year: 2024, text: '경기도 시흥시 정왕동 중식당 4호 인테리어' },
  { year: 2024, text: '인천 연수구 송도 단독주택 시공 (철근콘크리트)' },
  { year: 2024, text: '서울 강남구 역삼동 근린생활시설 시공 (철근콘크리트)' },
  { year: 2024, text: '인천 서구 청라동 아파트 인테리어' },
  { year: 2024, text: '경기도 평택시 진위면 근린생활시설 시공 (철골구조)' },
  { year: 2025, text: '인천 서구 청라동 단독주택 15호 시공 (철근콘크리트)' },
  { year: 2025, text: '경기도 고양시 아파트 인테리어' },
  { year: 2025, text: '인천 서구 청라동 아파트 인테리어' },
  { year: 2025, text: '경기도 파주시 운정동 아파트 인테리어' },
  { year: 2025, text: '경기도 시흥시 정왕동 중식당 5호 인테리어' },
  { year: 2025, text: '경기도 성남시 분당구 아파트 인테리어' }
];

// 연도별로 그룹화
const groupedByYear = portfolioItems.reduce((acc, item) => {
  if (!acc[item.year]) {
    acc[item.year] = [];
  }
  acc[item.year].push(item.text);
  return acc;
}, {} as Record<number, string[]>);

const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

export function PortfolioPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="지명원"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="mb-3 text-xs sm:text-sm tracking-[0.3em] font-normal opacity-90">PROJECT PORTFOLIO</p>
          <h1 className="mb-4 sm:mb-6 font-extrabold text-2xl sm:text-3xl md:text-4xl">지명원</h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal opacity-90">
            2014년부터 현재까지<br className="hidden sm:inline" />
            하우두홈이 완성한 모든 프로젝트
          </p>
        </div>
      </section>

      {/* Portfolio List Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {years.map((year, index) => (
              <div key={year} className={index !== 0 ? 'border-t border-gray-200' : ''}>
                <div className="bg-gray-100 px-6 sm:px-8 py-4 border-b border-gray-200">
                  <h2 className="font-bold text-gray-900">{year}년</h2>
                </div>
                <div className="px-6 sm:px-8 py-6">
                  <ul className="space-y-3">
                    {groupedByYear[Number(year)].map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3 text-gray-700 font-normal">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">하우두홈의 실적</h2>
            <p className="text-gray-600 font-normal">
              30년간 축적된 경험과 노하우
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-gray-900 mb-2">30+</div>
              <p className="text-gray-600 font-normal">년간의 경력</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
              <p className="text-gray-600 font-normal">완공 프로젝트</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600 font-normal">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 font-bold text-white">다음 프로젝트의 주인공은 당신입니다</h2>
          <p className="mb-10 text-lg font-normal opacity-90 leading-relaxed">
            30년간의 경험과 노하우로<br />
            당신의 꿈을 현실로 만들어드립니다
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