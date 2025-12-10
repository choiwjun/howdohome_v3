import { useState } from 'react';
import { Phone, Mail, User, Calendar, Clock, MessageSquare, Briefcase, DollarSign, CheckCircle2, Video, MessageCircle, Home, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { supabase } from '../lib/supabase';

export function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationType: '',
    projectType: '',
    area: '',
    budget: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase
        .from('consultations')
        .insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          consultation_type: formData.consultationType,
          project_type: formData.projectType,
          area: formData.area || null,
          budget: formData.budget || null,
          preferred_date: formData.preferredDate || null,
          preferred_time: formData.preferredTime || null,
          message: formData.message || null,
          status: 'new'
        });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('상담 신청 중 오류가 발생했습니다.');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        consultationType: '',
        projectType: '',
        area: '',
        budget: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error instanceof Error ? error.message : '상담 신청 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const consultationTypes = [
    {
      icon: Phone,
      title: '전화 상담',
      description: '빠르고 간편하게 전화로 상담받으세요',
      features: ['즉시 상담 가능', '실시간 문의 응답', '전문가 직접 통화']
    },
    {
      icon: Video,
      title: '화상 상담',
      description: '비대면으로 자세한 상담을 받아보세요',
      features: ['얼굴 보며 상담', '자료 공유 가능', '녹화 제공']
    },
    {
      icon: MessageCircle,
      title: '온라인 상담',
      description: '시간과 장소에 구애받지 않고 상담하세요',
      features: ['24시간 신청', '이메일 회신', '자료 첨부 가능']
    }
  ];

  const consultationProcess = [
    {
      step: '01',
      title: '상담 신청',
      description: '원하는 상담 방법을 선택하여 신청합니다'
    },
    {
      step: '02',
      title: '일정 확인',
      description: '담당자가 연락드려 상담 일정을 확정합니다'
    },
    {
      step: '03',
      title: '전문가 상담',
      description: '30년 경력의 전문가가 직접 상담해드립니다'
    },
    {
      step: '04',
      title: '견적 및 제안',
      description: '맞춤 견적과 함께 최적의 솔루션을 제공합니다'
    }
  ];

  const faqs = [
    {
      q: '상담은 무료인가요?',
      a: '네, 모든 상담은 무료로 제공됩니다. 견적 제공까지 비용이 발생하지 않습니다.'
    },
    {
      q: '상담 시간은 얼마나 걸리나요?',
      a: '일반적으로 30분에서 1시간 정도 소요되며, 프로젝트 규모에 따라 달라질 수 있습니다.'
    },
    {
      q: '주말에도 상담이 가능한가요?',
      a: '평일 상담을 원칙으로 하지만, 사전 예약 시 주말 상담도 가능합니다.'
    }
  ];

  return (
    <div className="pt-20">
      {/* 히어로 섹션 */}
      <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="상담"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <p className="mb-3 text-xs sm:text-sm tracking-[0.3em] font-normal opacity-90">CONSULTATION</p>
          <h1 className="mb-4 sm:mb-6 font-extrabold text-2xl sm:text-3xl md:text-4xl">
            당신의 꿈을 함께 설계합니다
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal opacity-90">
            30년 경력의 전문가가 직접 상담해드립니다.<br className="hidden sm:inline" />
            전화, 화상, 온라인 중 편한 방법을 선택하세요.
          </p>
        </div>
      </section>

      {/* 상담 방법 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">상담 방법</h2>
            <p className="text-gray-600 font-normal">
              고객님의 상황에 맞는 편리한 방법을 선택하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mb-4">
                  <type.icon size={32} />
                </div>
                <h3 className="mb-3 font-bold text-gray-900">{type.title}</h3>
                <p className="text-gray-600 font-normal mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-gray-900 flex-shrink-0" />
                      <span className="font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 프로세스 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">상담 진행 과정</h2>
            <p className="text-gray-600 font-normal">
              간단한 신청부터 맞춤 제안까지
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {consultationProcess.map((item, index) => (
              <div key={index} className="relative text-center">
                {/* 연결선 */}
                {index < consultationProcess.length - 1 && (
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

      {/* 상담 신청 폼 */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">상담 신청</h2>
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
                  이메일 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                  />
                </div>
              </div>

              {/* 상담 방법 */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  상담 방법 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal appearance-none"
                  >
                    <option value="">선택해주세요</option>
                    <option value="전화 상담">전화 상담</option>
                    <option value="화상 상담">화상 상담</option>
                    <option value="온라인 상담">온라인 상담</option>
                  </select>
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

              {/* 면적(평형) */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900">
                  면적(평형)
                </label>
                <div className="relative">
                  <Home size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="예: 30평, 85㎡"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal"
                  />
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
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-normal appearance-none"
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

              {/* 에러 메시지 */}
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {submitError}
                </div>
              )}

              {/* 성공 메시지 */}
              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    <span className="font-medium">상담 신청이 완료되었습니다!</span>
                  </div>
                  <p className="mt-1 text-sm">담당자가 빠른 시일 내에 연락드리겠습니다.</p>
                </div>
              )}

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    접수 중...
                  </>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle2 size={20} />
                    신청 완료
                  </>
                ) : (
                  '상담 신청하기'
                )}
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

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-bold">자주 묻는 질문</h2>
            <p className="text-gray-600 font-normal">
              상담과 관련하여 자주 묻는 질문들입니다
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 font-normal leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}