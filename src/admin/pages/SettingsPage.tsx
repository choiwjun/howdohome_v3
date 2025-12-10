import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Save, 
  RefreshCw,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe
} from 'lucide-react';

interface SiteSettings {
  id: string;
  site_name: string;
  site_description: string | null;
  company_name: string | null;
  address: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  business_hours: string | null;
  ceo_name: string | null;
  business_number: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  footer_text: string | null;
  updated_at: string;
}

export function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setSettings(data);
      } else {
        // Create default settings if none exist
        const { data: newData, error: insertError } = await supabase
          .from('site_settings')
          .insert([{
            site_name: '하우두홈',
            company_name: '주식회사 하우두홈',
          }])
          .select()
          .single();
        
        if (insertError) throw insertError;
        setSettings(newData);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage({ type: 'error', text: '설정을 불러오는데 실패했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('site_settings')
        .update({
          ...settings,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settings.id);

      if (error) throw error;
      setMessage({ type: 'success', text: '설정이 저장되었습니다.' });
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: '저장 중 오류가 발생했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof SiteSettings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
        불러오는 중...
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-8 text-center text-gray-500">
        설정을 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사이트 설정</h1>
          <p className="text-gray-500 mt-1">기본 사이트 정보와 회사 정보를 관리합니다</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? '저장 중...' : '저장'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">기본 정보</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사이트 이름</label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={(e) => updateField('site_name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사이트 설명</label>
              <input
                type="text"
                value={settings.site_description || ''}
                onChange={(e) => updateField('site_description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">회사 정보</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
              <input
                type="text"
                value={settings.company_name || ''}
                onChange={(e) => updateField('company_name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">대표자명</label>
              <input
                type="text"
                value={settings.ceo_name || ''}
                onChange={(e) => updateField('ceo_name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사업자등록번호</label>
              <input
                type="text"
                value={settings.business_number || ''}
                onChange={(e) => updateField('business_number', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="000-00-00000"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Phone size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">연락처 정보</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Phone size={14} /> 전화번호</span>
              </label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="031-000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">팩스번호</label>
              <input
                type="text"
                value={settings.fax || ''}
                onChange={(e) => updateField('fax', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="031-000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Mail size={14} /> 이메일</span>
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Clock size={14} /> 영업시간</span>
              </label>
              <input
                type="text"
                value={settings.business_hours || ''}
                onChange={(e) => updateField('business_hours', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="평일 09:00 - 18:00"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-1"><MapPin size={14} /> 주소</span>
              </label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO 설정</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메타 타이틀</label>
              <input
                type="text"
                value={settings.meta_title || ''}
                onChange={(e) => updateField('meta_title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="검색 결과에 표시될 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메타 설명</label>
              <textarea
                value={settings.meta_description || ''}
                onChange={(e) => updateField('meta_description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                placeholder="검색 결과에 표시될 설명"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메타 키워드</label>
              <input
                type="text"
                value={settings.meta_keywords || ''}
                onChange={(e) => updateField('meta_keywords', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="키워드1, 키워드2, 키워드3"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">푸터 설정</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">푸터 텍스트</label>
            <textarea
              value={settings.footer_text || ''}
              onChange={(e) => updateField('footer_text', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              placeholder="© 2024 하우두홈. All rights reserved."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
