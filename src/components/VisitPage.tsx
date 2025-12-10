import { useState } from 'react';
import { MapPin, Phone, Mail, User, Calendar, Clock, CheckCircle2, Home, Briefcase, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VisitPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    projectType: '',
    budget: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('방문 상담 신청이 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const visitProcess = [
    {
      step: '01',
      title: '상담 신청',
      description: '온라인 또는 전화로\n방문 상담을 신청합니다'
    },
    {
      step: '02',
      title: '일정 확인',
      description: '담당자가 연락드려\n방문 일정을 조율합니다'
    },
    {
      step: '03',
      title: '현장 방문',
      description: '전문가가 직접 방문하여\n현장을 확인합니다'
    },
    {
      step: '04',
      title: '맞춤 제안',
      description: '분석을 바탕으로\n최적의 솔루션을 제안합니다'
    }
  ];

  const visitBenefits = [
    {
      icon: Home,
      title: '현장 중심 상담',
      description: '실제 공간을 확인하며 구체적이고 실현 가능한 계획을 수립합니다'
    },
    {
      icon: User,
      title: '전문가 직접 방문',
      description: '30년 경력의 시공 전문가가 직접 방문하여 상담합니다'
    },
    {
      icon: CheckCircle2,
      title: '무료 견적 제공',
      description: '방문 상담 후 상세한 견적서를 무료로 제공해드립니다'
    }
  ];

  const visitAreas = [
    '서울특별시 전역',
    '경기도 고양시, 파주시, 김포시',
    '경기도 성남시, 용인시, 화성시',
    '인천광역시 (일부 지역)',
    '* 기타 지역은 별도 문의 바랍니다'
  ];

  return (
    <div className="pt-20">
      {/* 히어로 섹션 */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="방문 상담"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="mb-3 text-sm tracking-[0.3em] font-normal opacity-90">HOUSE VISIT CONSULTING</p>
          <h1 className="mb-6 font-extrabold">
            하우두홈이 당신의 공간으로 갑니다
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed font-normal opacity-90">
            당신의 삶을 담은 집을 만들기 위해, 먼저 우리가 가겠습니다.<br />
            따뜻한 상담과 세심한 설계로 집의 시작을 함께 채워드립니다.
          </p>
        </div>
      </section>

      {/* 방문 상담 프로세스 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">방문 상담 프로세스</h2>
            <p className="text-gray-600 font-normal">
              간단한 신청으로 시작되는 전문 상담 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {visitProcess.map((item, index) => (
              <div key={index} className="relative text-center">
                {/* 연결선 */}
                {index < visitProcess.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                )}
                
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 방문 상담의 장점 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">왜 방문 상담인가요?</h2>
            <p className="text-gray-600 font-normal">
              현장에서만 알 수 있는 것들이 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visitBenefits.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} />
                </div>
                <h3 className="mb-3 font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 방문 가능 지역 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="mb-4 font-bold">방문 가능 지역</h2>
          </div>

          <div className="max-w-2xl mx-auto bg-gray-50 rounded-lg p-8">
            <ul className="space-y-3">
              {visitAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-3">
                  {area.startsWith('*') ? (
                    <span className="text-gray-500 font-normal">{area}</span>
                  ) : (
                    <>
                      <MapPin size={20} className="text-gray-900 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-normal">{area}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 방문 상담 신청 폼 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">방문 상담 신청</h2>
            <p className="text-gray-600 font-normal">
              아래 양식을 작성해주시면 담당자가 빠르게 연락드리겠습니다
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="space-y-6">
              {/* 이름 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  이름 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="성함을 입력해주세요"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                  />
                </div>
              </div>

              {/* 연락처 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="010-0000-0000"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  이메일
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                  />
                </div>
              </div>

              {/* 방문 주소 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  방문 주소 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="방문 받으실 주소를 입력해주세요"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                  />
                </div>
              </div>

              {/* 프로젝트 유형 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  프로젝트 유형 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal appearance-none"
                  >
                    <option value="">선택해주세요</option>
                    <option value="단독주택 신축">단독주택 신축</option>
                    <option value="다가구주택 신축">다가구주택 신축</option>
                    <option value="주택 리모델링">주택 리모델링</option>
                    <option value="아파트 인테리어">아파트 인테리어</option>
                    <option value="상업시설">상업시설</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>

              {/* 예산 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  예산
                </label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal appearance-none"
                  >
                    <option value="">선택해주세요</option>
                    <option value="3천이하">3천이하</option>
                    <option value="5천이하">5천이하</option>
                    <option value="1억이하">1억이하</option>
                    <option value="1억이상">1억이상</option>
                  </select>
                </div>
              </div>

              {/* 희망 일정 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-900">
                    희망 날짜 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-900">
                    희망 시간 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                    >
                      <option value="">선택해주세요</option>
                      <option value="오전 (09:00~12:00)">오전 (09:00~12:00)</option>
                      <option value="오후 (13:00~17:00)">오후 (13:00~17:00)</option>
                      <option value="협의">협의</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 상담 내용 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  상담 내용
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="궁금하신 사항이나 요청사항을 자유롭게 작성해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none font-normal"
                />
              </div>

              {/* 개인정보 동의 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 accent-gray-900"
                  />
                  <span className="text-sm text-gray-700 font-normal">
                    개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
                    <br />
                    <span className="text-xs text-gray-500">
                      입력하신 정보는 상담 목적으로만 사용되며, 상담 완료 후 즉시 파기됩니다.
                    </span>
                  </span>
                </label>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                방문 상담 신청하기
              </button>
            </div>
          </form>

          {/* 연락처 정보 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2 font-normal">
              급하신 경우 전화로 문의해주세요
            </p>
            <a href="tel:031-975-9372" className="text-lg font-bold text-gray-900 hover:text-gray-700">
              031-975-9372
            </a>
            <p className="text-xs text-gray-500 mt-1 font-normal">
              평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}