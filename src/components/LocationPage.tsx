import { MapPin, Phone, Printer, Clock, Car, Train, Bus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect } from 'react';

export function LocationPage() {
  useEffect(() => {
    // 네이버 지도 API 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID`;
    script.async = true;
    
    script.onload = () => {
      // 지도 초기화
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.6689, 126.7688), // 경기도 고양시 일산동구 중산로 156번길 62-4 근처 좌표
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT
        },
        mapTypeControl: false,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false
      };
      
      const map = new window.naver.maps.Map('map', mapOptions);
      
      // 마커 추가
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.6689, 126.7688),
        map: map,
        title: '하우두홈'
      });
    };
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="pt-20">
      {/* 히어로 섹션 */}
      <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="오시는 길"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="mb-3 text-xs sm:text-sm tracking-[0.3em] font-normal opacity-90">LOCATION</p>
          <h1 className="mb-4 sm:mb-6 font-extrabold text-2xl sm:text-3xl md:text-4xl">
            하우두홈으로 오시는 길
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal opacity-90">
            당신의 꿈을 함께 나눌 준비가 되어 있습니다
          </p>
        </div>
      </section>

      {/* 따뜻한 메시지 */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
              집을 짓고 싶지만 어디서부터 시작해야 할지 막막한 순간, 하우두홈이 당신 곁에서 길을 밝혀드립니다.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
              가볍게 마음만 들고 오셔도 괜찮습니다. 당신의 땅과 꿈을 듣고, 어떤 집이 가장 어울릴지 함께 그려드립니다.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-normal">
              멀리서라도 찾아가고, 필요하다면 여러 번 함께 고민합니다. 집짓기라는 큰 여정이 조금 더 따뜻하고, 덜 부담스럽기를 바라며 하우두홈은 오늘도 당신의 새로운 시작을 기다리고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 오시는 길 정보 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">오시는 길</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 주소 및 연락처 */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">주소</h3>
                    <p className="text-gray-700 font-normal leading-relaxed">
                      경기도 고양시 일산동구<br />
                      중산로 156번길 62-4, 201호
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">전화</h3>
                    <a href="tel:031-975-9372" className="text-gray-700 hover:text-gray-900 font-normal">
                      031-975-9372
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Printer size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">팩스</h3>
                    <p className="text-gray-700 font-normal">
                      031-975-4461
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">운영시간</h3>
                    <p className="text-gray-700 font-normal leading-relaxed">
                      평일: 09:00 ~ 18:00<br />
                      점심시간: 12:00 ~ 13:00<br />
                      주말 및 공휴일: 휴무 (사전 예약 시 가능)
                    </p>
                  </div>
                </div>
              </div>

              {/* 방문 전 안내 */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h3 className="font-bold text-gray-900 mb-4">방문 전 안내</h3>
                <ul className="space-y-3 text-gray-700 font-normal">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-1">•</span>
                    <span>원활한 상담을 위해 사전 예약을 권장드립니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-1">•</span>
                    <span>부지 정보나 희망하시는 도면이 있다면 함께 가져와 주세요.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-1">•</span>
                    <span>주차 공간이 제한적이니 대중교통 이용을 권장합니다.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 지도 */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-[600px]">
              <div id="map" style={{ width: '100%', height: '100%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 교통편 안내 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">교통편 안내</h2>
            <p className="text-gray-600 font-normal">
              다양한 교통수단으로 편리하게 방문하실 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 지하철 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <Train size={32} />
              </div>
              <h3 className="mb-4 font-bold text-gray-900 text-center">지하철</h3>
              <div className="space-y-3 text-sm text-gray-700 font-normal">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">3호선 정발산역</p>
                  <p>2번 출구에서 도보 약 15분</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">3호선 마두역</p>
                  <p>1번 출구에서 도보 약 12분</p>
                </div>
              </div>
            </div>

            {/* 버스 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <Bus size={32} />
              </div>
              <h3 className="mb-4 font-bold text-gray-900 text-center">버스</h3>
              <div className="space-y-3 text-sm text-gray-700 font-normal">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">일반버스</p>
                  <p>88, 92, 97번 버스 이용</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">마을버스</p>
                  <p>031번 마을버스 이용</p>
                </div>
                <p className="text-xs text-gray-500 pt-2">
                  중산마을 정류장 하차
                </p>
              </div>
            </div>

            {/* 자가용 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <Car size={32} />
              </div>
              <h3 className="mb-4 font-bold text-gray-900 text-center">자가용</h3>
              <div className="space-y-3 text-sm text-gray-700 font-normal">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">서울 방면</p>
                  <p>자유로 → 일산IC → 중산로</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">의정부 방면</p>
                  <p>통일로 → 일산동구청 → 중산로</p>
                </div>
                <p className="text-xs text-gray-500 pt-2">
                  건물 주차장 이용 가능
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 font-bold text-white">방문 상담을 예약하세요</h2>
          <p className="text-lg mb-8 font-normal opacity-90 leading-relaxed">
            전문가와 직접 만나 당신의 꿈을 자세히 상담받으실 수 있습니다.<br />
            편안한 시간에 방문하시도록 미리 예약해주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support/visit"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              방문 상담 신청하기
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