import { CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProcessPage() {
  const steps = [
    {
      number: '01',
      title: '상담 & 라이프스타일 분석',
      description: '당신의 가족 구성, 취향, 생활패턴을 섬세하게 듣고\n"우리 가족에게 꼭 맞는 집"의 방향을 설계합니다.'
    },
    {
      number: '02',
      title: '설계 확정 & 투명 견적 제시',
      description: '도면, 자재, 공정을 모두 사전에 확정하여\n예산이 튀지 않는 견적을 제공합니다.'
    },
    {
      number: '03',
      title: '시공 준비 & 자재 검수',
      description: '프리미엄 자재 선정부터 공정 일정까지\n현장 전문가가 직접 점검하며 완성도를 준비합니다.'
    },
    {
      number: '04',
      title: '본 시공',
      description: '30년 경력의 시공팀이\n디테일까지 정확한 기준으로 집을 완성합니다.'
    },
    {
      number: '05',
      title: '준공 & 고객 인수',
      description: '최종 점검 후 집을 함께 확인하고\n마감·설비·사용 설명까지 꼼꼼히 안내합니다.'
    },
    {
      number: '06',
      title: '사후관리 & 유지보수',
      description: '완공이 끝이 아니라,\n하우두홈의 책임이 시작되는 순간입니다.\n문제가 생기면 언제든 빠르게 돕습니다.'
    }
  ];

  return (
    <div className="pt-20">
      {/* HERO - 인트로 섹션 */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 이미지 */}
          <div className="aspect-video rounded-lg overflow-hidden mb-12">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1713365747492-7918df1942b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwZmFtaWx5JTIwaG9tZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDEwMDQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="삶을 듣는 집짓기"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
              }}
            />
          </div>

          {/* 텍스트 */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-8 font-extrabold">삶을 담는 인테리어</h1>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-xl">
                우리의 인테리어는 언제나<br />
                <span className="text-gray-900 font-semibold">"당신의 이야기를 듣는 것"</span>에서 시작됩니다.
              </p>
              
              <p className="text-lg">
                하우두홈은 고객이 어떤 공간을 꿈꾸는지,<br />
                어떤 분위기에서 편안함을 느끼는지 깊이 이해하기 위해<br />
                처음부터 끝까지 진심으로 소통합니다.
              </p>
              
              <p className="text-lg">
                가족의 라이프스타일, 일상의 리듬, 공간의 취향까지<br />
                작은 디테일까지 놓치지 않는 이유는<br />
                당신의 삶을 그대로 담은 공간을 만들기 위해서입니다.
              </p>
              
              <p className="text-lg">
                집은 머무는 공간을 넘어,<br />
                하루의 에너지가 회복되고<br />
                가족의 시간이 쌓이는 곳이기 때문입니다.
              </p>
              
              <p className="text-lg">
                오늘도 우리는 묻습니다.<br />
                이 집이 당신의 삶에 어떤 변화를 줄 수 있을까?<br />
                그 고민의 끝에서, 하우두홈은 당신의 가장 따뜻한 공간을 완성합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS 섹션 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm tracking-wider text-gray-600 mb-4 font-semibold">
              PROCESS
            </div>
            <h2 className="font-bold">하우두홈 집짓기 프로세스</h2>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* 이미지 영역 - 홀수는 왼쪽, 짝수는 오른쪽 */}
                <div className={`aspect-video rounded-lg overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ImageWithFallback
                    src={
                      index === 0 ? 'https://images.unsplash.com/photo-1714536377674-e3d9026bf6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0YXRpb24lMjBtZWV0aW5nJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDEwMDMwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' :
                      index === 1 ? 'https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlcHJpbnQlMjBkZXNpZ24lMjBwbGFubmluZ3xlbnwxfHx8fDE3NjQxMDAzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' :
                      index === 2 ? 'https://images.unsplash.com/photo-1759922378275-32d7ca8bbcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBpbnNwZWN0aW9ufGVufDF8fHx8MTc2NDEwMDMwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' :
                      index === 3 ? 'https://images.unsplash.com/photo-1704742950992-9815a104820c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNvbnN0cnVjdGlvbiUyMHNpdGUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjQxMDAzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' :
                      index === 4 ? 'https://images.unsplash.com/photo-1656947847511-a041b540b106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBob21lJTIwaW5zcGVjdGlvbiUyMGhhbmRvdmVyfGVufDF8fHx8MTc2NDEwMDMwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' :
                      'https://images.unsplash.com/photo-1758272421751-963195322eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbWFpbnRlbmFuY2UlMjBzZXJ2aWNlfGVufDF8fHx8MTc2NDA2OTY2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                    }
                    alt={step.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.9) contrast(1.05) saturate(0.85)'
                    }}
                  />
                </div>

                {/* 텍스트 영역 */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xl">
                      {step.number}
                    </div>
                    <div className="h-px flex-1 bg-gray-200"></div>
                  </div>
                  
                  <h3 className="mb-4 font-bold">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-white font-bold">
            당신의 집짓기,<br />
            하우두홈과 함께 시작하세요
          </h2>
          <p className="mb-10 text-white/80 text-lg font-normal">
            30년 경력의 전문가가 처음부터 끝까지 책임지는<br />
            프리미엄 원스톱 건축 솔루션
          </p>
          <a
            href="/support/consultation"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-semibold"
          >
            무료 상담 신청하기
          </a>
        </div>
      </section>
    </div>
  );
}