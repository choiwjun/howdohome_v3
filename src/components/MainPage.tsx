import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from './animations';
import img1 from 'figma:asset/4821fb3eb804be91daee42eaf943f7dfb9d96bf8.png';
import img2 from 'figma:asset/f359b8ce2c8eeac4e60b4492f744df35199d48b0.png';
import img3 from 'figma:asset/a049d52037ffb6966a9ebea319d7afa3152beac2.png';
import story01img1 from 'figma:asset/8e36eb6a7107240844aba4fd9e666830f571f975.png';
import story01img2 from 'figma:asset/64dc1a3d832fd3d6b475ce2461716a2ce8de5dd2.png';
import story02img1 from 'figma:asset/77e05a329f45789eebdb00e8816859f572877802.png';
import story02img2 from 'figma:asset/a7ea8cd8669c5362b627fe86c83d29443b0a60ff.png';
import story03img1 from 'figma:asset/f13f1983b698419dbca0db7b26ebd6ebb869f71d.png';
import story03img2 from 'figma:asset/b10cb90bef58139b06b445f69fe0902e6327806f.png';

export function MainPage() {
  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1725042893312-5ec0dea9e369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1MDAwNTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="하우두홈"
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.75) contrast(1.05) saturate(0.9)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>

        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.h1
              className="mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              우리 가족의 삶을 설계하는<br />
              집, 하우두홈
            </motion.h1>
            <motion.p
              className="mb-10 text-base sm:text-xl md:text-2xl text-white/90 max-w-5xl mx-auto font-normal leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              30년 경력의 대표가 설계부터 시공, A/S까지 책임지는 프리미엄 원스톱 건축 솔루션
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/support/consultation"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg"
              >
                건축 상담 받기
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUE SIGNATURE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm tracking-wider text-gray-600 mb-4 font-semibold">
              VALUE OF SPACE
            </div>
            <h2 className="mb-6 font-bold">
              우리 가족의 일상을 완성하는 인테리어, 하우두홈
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
              30년 경력의 대표가 디자인부터 시공까지 직접 관리
              <br />
              A/S까지 책임지는 프리미엄 원스톱 인테리어 솔루션
            </p>
            <div className="mt-8">
              <Link
                to="/support/consultation"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg"
              >
                인테리어 상담 받기
                <ArrowRight size={20} />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <StaggerItem>
              <motion.div
                className="relative h-96 rounded-lg overflow-hidden group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={img1}
                  alt="사용할수록 만족이 깊어지는 공간"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-2xl font-semibold">사용할수록 만족이 깊어지는 공간</h3>
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="relative h-96 rounded-lg overflow-hidden group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={img2}
                  alt="시간이 지나도 질리지 않는 디자인"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-2xl">시간이 지나도 질리지 않는 디자인</h3>
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="relative h-96 rounded-lg overflow-hidden group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={img3}
                  alt="가족의 생활을 중심으로 설계된 집"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-2xl">가족의 생활을 중심으로 설계된 집</h3>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* USP - 핵심 가치 3개 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="mb-6 font-bold">
              우리 가족의 삶을 디자인하는 공간, 하우두홈 인테리어
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              30년 경력의 대표가 처음부터 끝까지 직접 관리하는
              <br />
              프리미엄 홈 인테리어 원스톱 솔루션
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <StaggerItem>
              <ScaleIn className="bg-white p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <motion.div
                    className="w-12 h-1 bg-gray-900 mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <h3 className="text-2xl mb-4">인테리어 전문가</h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-3">
                    집을 꾸미는 일은 누구나 할 수 있지만,
                    <br />
                    완성도를 결정하는 것은 경험과 디테일입니다.
                  </p>
                  <p className="mb-3">
                    하우두홈은 30년 경력의 노하우로
                    <br />
                    설계부터 마감까지 모든 과정을 직접 관리합니다.
                  </p>
                  <p>
                    "생각보다 훨씬 더 세심하다"는 평가를 받는 이유입니다.
                  </p>
                </div>
              </ScaleIn>
            </StaggerItem>

            <StaggerItem>
              <ScaleIn className="bg-white p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <motion.div
                    className="w-12 h-1 bg-gray-900 mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <h3 className="text-2xl mb-4">맞춤 인테리어 설계</h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-3">
                    우리 가족의 생활 방식과 취향을 반영한
                    <br />
                    진짜 '우리 집다운 공간'을 설계합니다.
                  </p>
                  <p className="mb-3">
                    수많은 준공 사례를 통해 쌓인 설계 감각으로
                    <br />
                    생활 동선·채광·수납까지 완벽하게 고려합니다.
                  </p>
                  <p>
                    디자인뿐 아니라 실용성과 편안함까지
                    <br />
                    균형 있게 완성해드립니다.
                  </p>
                </div>
              </ScaleIn>
            </StaggerItem>

            <StaggerItem>
              <ScaleIn className="bg-white p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <motion.div
                    className="w-12 h-1 bg-gray-900 mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                  <h3 className="text-2xl mb-4">고품질 시공</h3>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  <p className="mb-3">
                    좋은 자재와 꼼꼼한 시공이 집의 가치를 결정합니다.
                  </p>
                  <p className="mb-3">
                    하우두홈은 표준화된 시공 시스템과
                    <br />
                    프리미엄 마감 기준으로 시공합니다.
                  </p>
                  <p>
                    A/S까지 책임지는 관리 체계로
                    <br />
                    오래 머물수록 만족도가 높아지는 집을 만들어드립니다.
                  </p>
                </div>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* YOUTUBE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gray-50 rounded-[20px] border border-gray-200 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* 왼쪽 텍스트 영역 */}
                <div>
                  <div className="text-xs tracking-wider text-gray-600 mb-6">
                    HOWDOHOME TV
                  </div>
                  <h2 className="mb-6">
                    영상으로 만나는 하우두홈
                  </h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    하우두홈이 완성한 주택 이야기부터 집짓기 노하우까지,
                    <br />
                    하우두홈TV에서 영상으로 만나보세요.
                  </p>
                  <a
                    href="https://www.youtube.com/@HOWDOHOME"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white border border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    유튜브 채널 보러가기
                  </a>
                </div>

                {/* 오른쪽 영상 영역 */}
                <motion.div
                  className="aspect-video bg-gray-200 rounded-[20px] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="하우두홈 시공 영상"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONSTRUCTION GALLERY - BLOCK 01 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-6">
            <div className="inline-block px-4 py-2 bg-white rounded-full text-sm tracking-wider text-gray-600 mb-4">
              CONSTRUCTION STORY 01
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn direction="left">
              <div className="aspect-video rounded-lg overflow-hidden mb-6 group">
                <img
                  src={story01img1}
                  alt="프리미엄 인테리어"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed text-left">
                30년 공간 경험을 가진 대표가 직접 모든 공정을 관리하며,
                <br />
                구조 변경·동선 설계·자재 선정·시공·A/S까지
                <br />
                한 번에 해결되는 프리미엄 원스톱 인테리어를 제공합니다.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div className="aspect-video rounded-lg overflow-hidden mb-6 group">
                <img
                  src={story01img2}
                  alt="프리미엄 인테리어"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed text-left">
                수많은 공간을 경험한 전문가만이 아는
                <br />
                생활 편의성과 감성의 균형,
                <br />
                그리고 시간이 지나도 질리지 않는 디자인.
                <br />
                <br />
                당신의 집, 이제 '프로'의 손에 맡길 시간입니다.
                <br />
                하우두홈.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONSTRUCTION GALLERY - BLOCK 02 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-6">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm tracking-wider text-gray-600 mb-4">
              CONSTRUCTION STORY 02
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn direction="left">
              <div className="aspect-video rounded-lg overflow-hidden mb-6 group">
                <img
                  src={story02img1}
                  alt="생활 맞춤형 인테리어"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                "우리 가족의 삶을 그리는 인테리어, 하우두홈"
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed text-left">
                하우두홈은 가족의 라이프스타일을 먼저 듣고,
                <br />
                그 삶을 그대로 공간에 담아냅니다.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div className="aspect-video rounded-lg overflow-hidden mb-6 group">
                <img
                  src={story02img2}
                  alt="생활 맞춤형 인테리어"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed text-left">
                평면 구성·수납·채광·동선 계획까지
                <br />
                세심하게 반영해 완성되는 생활 맞춤형 프리미엄 인테리어.
                <br />
                <br />
                유행이 아니라,
                <br />
                당신의 삶을 설계하는 집 —
                <br />
                하우두홈이 만듭니다.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONSTRUCTION GALLERY - BLOCK 03 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-6">
            <div className="inline-block px-4 py-2 bg-white rounded-full text-sm tracking-wider text-gray-600 mb-4">
              CONSTRUCTION STORY 03
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn direction="left">
              <div className="aspect-video rounded-lg overflow-hidden mb-6 group">
                <img
                  src={story03img1}
                  alt="가족을 위한 공간"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                "우리 가족의 하루가 더 따뜻해지는 집, 하우두홈"
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed text-left">
                당신의 생활과 마음을 담아 따뜻함을 설계합니다.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div className="aspect-video rounded-lg overflow-hidden mb-6 group">
                <img
                  src={story03img2}
                  alt="가족을 위한 공간"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed text-left">
                30년의 경험으로 작은 디테일까지 정성스럽게 완성합니다.
                <br />
                오래 머물수록 편안해지는 집, 그 변화의 시작을 하우두홈이 함께합니다.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA 3-BLOCK */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CTA 1 - 인테리어 상담 */}
            <StaggerItem>
              <motion.div
                className="bg-gray-50 p-8 rounded-lg text-center hover:bg-gray-100 transition-colors"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="mb-3">인테리어 상담</h3>
                <p className="text-gray-600 mb-6">
                  집짓기 고민, 하우두홈이
                  <br />
                  빠르게 상담해드립니다.
                </p>
                <Link
                  to="/support/consultation"
                  className="inline-flex items-center gap-2 text-gray-900 hover:gap-3 transition-all"
                >
                  상담 신청하기
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </StaggerItem>

            {/* CTA 2 - A/S 신청 */}
            <StaggerItem>
              <motion.div
                className="bg-gray-50 p-8 rounded-lg text-center hover:bg-gray-100 transition-colors"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="mb-3">A/S 신청</h3>
                <p className="text-gray-600 mb-6">
                  작은 하자도 놓치지 않는
                  <br />
                  하우두홈 A/S.
                </p>
                <Link
                  to="/support/consultation"
                  className="inline-flex items-center gap-2 text-gray-900 hover:gap-3 transition-all"
                >
                  A/S 신청하기
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </StaggerItem>

            {/* CTA 3 - 상담문의 */}
            <StaggerItem>
              <motion.div
                className="bg-gray-900 text-white p-8 rounded-lg text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="mb-3 text-white">상담문의</h3>
                <div className="mb-6">
                  <Phone size={32} className="mx-auto mb-3" />
                  <a
                    href="tel:031-975-9372"
                    className="text-2xl hover:text-gray-200 transition-colors"
                  >
                    031-975-9372
                  </a>
                </div>
                <p className="text-white/80 text-sm">
                  평일 09:00 - 18:00
                </p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}