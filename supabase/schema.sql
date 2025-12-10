-- =============================================
-- 하우두홈 관리자 시스템 DB 스키마
-- Supabase SQL Editor에서 실행
-- =============================================

-- 1. 상담 신청 테이블
CREATE TABLE consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 고객 정보
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  
  -- 상담 정보
  consultation_type VARCHAR(50), -- 전화상담, 화상상담, 온라인상담
  project_type VARCHAR(50),      -- 단독주택신축, 다가구주택신축, 주택리모델링, 아파트인테리어, 상업시설, 기타
  area VARCHAR(50),              -- 면적
  budget VARCHAR(50),            -- 예산
  preferred_date DATE,           -- 희망 날짜
  preferred_time VARCHAR(50),    -- 희망 시간
  message TEXT,                  -- 상담 내용
  
  -- 관리 정보
  status VARCHAR(20) DEFAULT 'new', -- new, in_progress, completed, cancelled
  admin_memo TEXT,                   -- 관리자 메모
  
  -- 메타
  ip_address VARCHAR(50),
  user_agent TEXT
);

-- 2. 상담 상태 변경 이력
CREATE TABLE consultation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_id UUID REFERENCES consultations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  previous_status VARCHAR(20),
  new_status VARCHAR(20),
  memo TEXT,
  admin_email VARCHAR(255)
);

-- 3. 소식 (News) 테이블
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 공지사항, 시공사례, 언론보도, 이벤트
  content TEXT,                   -- HTML 콘텐츠
  thumbnail_url TEXT,
  
  is_notice BOOLEAN DEFAULT FALSE, -- 공지 상단 고정
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  views INTEGER DEFAULT 0,
  
  -- SEO
  meta_description TEXT,
  slug VARCHAR(255) UNIQUE
);

-- 4. 현장일지 (Journal) 테이블
CREATE TABLE journals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 주택, 주거공간, 상업공간, 상공간, 디자인계획
  location VARCHAR(255),          -- 위치
  
  progress_status VARCHAR(100),   -- 진행상태 (마감공사 진행중, 골조공사 완료 등)
  description TEXT,               -- 간단 설명
  content TEXT,                   -- 상세 내용 (HTML)
  
  thumbnail_url TEXT,
  
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- SEO
  slug VARCHAR(255) UNIQUE
);

-- 5. 현장일지 이미지 갤러리
CREATE TABLE journal_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  journal_id UUID REFERENCES journals(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 갤러리 프로젝트 테이블
CREATE TABLE gallery_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  title VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,  -- 주택, 주거공간, 상업공간, 상공간, 디자인계획
  sub_category VARCHAR(50),       -- 거실, 주방, 침실, 욕실, 식당, 외관
  
  location VARCHAR(255),
  area VARCHAR(50),               -- 면적
  description TEXT,
  
  thumbnail_url TEXT,
  
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  
  -- 페이지 구분: house, apartment, gallery
  page_type VARCHAR(50) DEFAULT 'gallery'
);

-- 7. 갤러리 프로젝트 이미지
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES gallery_projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 지명원 (Portfolio) 테이블
CREATE TABLE portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  year INTEGER NOT NULL,
  title VARCHAR(500) NOT NULL,
  structure_type VARCHAR(50),  -- 철근콘크리트, 목조주택, 철골구조, 인테리어
  
  sort_order INTEGER DEFAULT 0
);

-- 9. 프로세스 단계 테이블
CREATE TABLE process_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  step_number VARCHAR(10) NOT NULL,  -- 01, 02, 03...
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

-- 10. FAQ 테이블
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  
  category VARCHAR(50) DEFAULT 'general', -- general, consultation, construction
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

-- 11. 사이트 설정 테이블
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. 카테고리 관리 테이블
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL,      -- news, journal, gallery
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(20),              -- 태그 색상
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  
  UNIQUE(type, name)
);

-- 13. 미디어 라이브러리
CREATE TABLE media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),          -- image, video, document
  file_size INTEGER,              -- bytes
  
  folder VARCHAR(100) DEFAULT 'general',
  alt_text TEXT,
  
  uploaded_by VARCHAR(255)
);

-- 14. 메인페이지 콘텐츠 관리
CREATE TABLE main_page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key VARCHAR(100) UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB,                   -- 유연한 콘텐츠 구조
  image_url TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 인덱스 생성
-- =============================================

CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX idx_journals_category ON journals(category);
CREATE INDEX idx_journals_published ON journals(is_published, published_at DESC);
CREATE INDEX idx_gallery_category ON gallery_projects(category);
CREATE INDEX idx_gallery_page_type ON gallery_projects(page_type);
CREATE INDEX idx_portfolios_year ON portfolios(year DESC);

-- =============================================
-- RLS (Row Level Security) 정책
-- =============================================

-- RLS 활성화
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE main_page_sections ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (메인 사이트용)
CREATE POLICY "Public read news" ON news FOR SELECT USING (is_published = true);
CREATE POLICY "Public read journals" ON journals FOR SELECT USING (is_published = true);
CREATE POLICY "Public read journal_images" ON journal_images FOR SELECT USING (true);
CREATE POLICY "Public read gallery_projects" ON gallery_projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read portfolios" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Public read process_steps" ON process_steps FOR SELECT USING (is_published = true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read main_page_sections" ON main_page_sections FOR SELECT USING (is_visible = true);

-- 상담 신청은 누구나 삽입 가능
CREATE POLICY "Anyone can insert consultation" ON consultations FOR INSERT WITH CHECK (true);

-- 인증된 관리자 전체 접근 (관리자 페이지용)
CREATE POLICY "Admin full access consultations" ON consultations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access consultation_logs" ON consultation_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access news" ON news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access journals" ON journals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access journal_images" ON journal_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access gallery_projects" ON gallery_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access gallery_images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access portfolios" ON portfolios FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access process_steps" ON process_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access media" ON media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access main_page_sections" ON main_page_sections FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 트리거: updated_at 자동 업데이트
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_journals_updated_at BEFORE UPDATE ON journals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_projects_updated_at BEFORE UPDATE ON gallery_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_process_steps_updated_at BEFORE UPDATE ON process_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_main_page_sections_updated_at BEFORE UPDATE ON main_page_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 초기 데이터 삽입
-- =============================================

-- 사이트 기본 설정
INSERT INTO site_settings (key, value) VALUES
  ('company_name', '주식회사 하우두홈'),
  ('phone', '031-975-9372'),
  ('fax', '031-975-4461'),
  ('email', 'ppappy1118@naver.com'),
  ('address', '경기도 고양시 일산동구 중산로 156번길 62-4, 201호'),
  ('business_hours', '평일 09:00 ~ 18:00'),
  ('lunch_hours', '12:00 ~ 13:00'),
  ('youtube_url', 'https://www.youtube.com/@HOWDOHOME'),
  ('youtube_embed_url', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
  ('instagram_url', ''),
  ('blog_url', ''),
  ('kakao_url', ''),
  ('map_lat', '37.6689'),
  ('map_lng', '126.7688');

-- 뉴스 카테고리
INSERT INTO categories (type, name, color, sort_order) VALUES
  ('news', '공지사항', 'red', 1),
  ('news', '시공사례', 'blue', 2),
  ('news', '언론보도', 'green', 3),
  ('news', '이벤트', 'purple', 4);

-- 현장일지 카테고리
INSERT INTO categories (type, name, sort_order) VALUES
  ('journal', '주택', 1),
  ('journal', '주거공간', 2),
  ('journal', '상업공간', 3),
  ('journal', '상공간', 4),
  ('journal', '디자인계획', 5);

-- 갤러리 카테고리
INSERT INTO categories (type, name, description, sort_order) VALUES
  ('gallery', '전체', '당신만을 위한 특별한 주택을 설계합니다', 0),
  ('gallery', '주택', '단독주택부터 전원주택, 다가구주택까지', 1),
  ('gallery', '주거공간', '당신의 공간을 새롭게 설계하는 인테리어 디자인', 2),
  ('gallery', '상업공간', '집과 공간에 가치를 더하는 인테리어 솔루션', 3),
  ('gallery', '상공간', '라이프스타일을 담는 감각적 공간 디자인', 4),
  ('gallery', '디자인계획', '주거·상업공간, 디자인으로 다시 태어나다', 5);

-- 갤러리 서브 카테고리 (GalleryPage용)
INSERT INTO categories (type, name, sort_order) VALUES
  ('gallery_sub', '거실', 1),
  ('gallery_sub', '주방', 2),
  ('gallery_sub', '침실', 3),
  ('gallery_sub', '욕실', 4),
  ('gallery_sub', '식당', 5),
  ('gallery_sub', '외관', 6);

-- 프로세스 단계
INSERT INTO process_steps (step_number, title, description, image_url, sort_order) VALUES
  ('01', '상담 & 라이프스타일 분석', '당신의 가족 구성, 취향, 생활패턴을 섬세하게 듣고
"우리 가족에게 꼭 맞는 집"의 방향을 설계합니다.', 'https://images.unsplash.com/photo-1714536377674-e3d9026bf6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 1),
  ('02', '설계 확정 & 투명 견적 제시', '도면, 자재, 공정을 모두 사전에 확정하여
예산이 튀지 않는 견적을 제공합니다.', 'https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 2),
  ('03', '시공 준비 & 자재 검수', '프리미엄 자재 선정부터 공정 일정까지
현장 전문가가 직접 점검하며 완성도를 준비합니다.', 'https://images.unsplash.com/photo-1759922378275-32d7ca8bbcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 3),
  ('04', '본 시공', '30년 경력의 시공팀이
디테일까지 정확한 기준으로 집을 완성합니다.', 'https://images.unsplash.com/photo-1704742950992-9815a104820c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 4),
  ('05', '준공 & 고객 인수', '최종 점검 후 집을 함께 확인하고
마감·설비·사용 설명까지 꼼꼼히 안내합니다.', 'https://images.unsplash.com/photo-1656947847511-a041b540b106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 5),
  ('06', '사후관리 & 유지보수', '완공이 끝이 아니라,
하우두홈의 책임이 시작되는 순간입니다.
문제가 생기면 언제든 빠르게 돕습니다.', 'https://images.unsplash.com/photo-1758977405163-f2595de08dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 6);

-- FAQ
INSERT INTO faqs (question, answer, category, sort_order) VALUES
  ('상담은 무료인가요?', '네, 모든 상담은 무료로 제공됩니다. 견적 제공까지 비용이 발생하지 않습니다.', 'consultation', 1),
  ('상담 시간은 얼마나 걸리나요?', '일반적으로 30분에서 1시간 정도 소요되며, 프로젝트 규모에 따라 달라질 수 있습니다.', 'consultation', 2),
  ('주말에도 상담이 가능한가요?', '평일 상담을 원칙으로 하지만, 사전 예약 시 주말 상담도 가능합니다.', 'consultation', 3);

-- 메인페이지 섹션
INSERT INTO main_page_sections (section_key, title, subtitle, description, image_url, sort_order, content) VALUES
  ('hero', '우리 가족의 삶을 설계하는 집, 하우두홈', NULL, '30년 경력의 대표가 설계부터 시공, A/S까지 책임지는 프리미엄 원스톱 건축 솔루션', 'https://images.unsplash.com/photo-1725042893312-5ec0dea9e369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 1, '{"cta_text": "건축 상담 받기", "cta_link": "/support/consultation"}'),
  ('value_signature', '우리 가족의 일상을 완성하는 인테리어, 하우두홈', 'VALUE OF SPACE', '30년 경력의 대표가 디자인부터 시공까지 직접 관리
A/S까지 책임지는 프리미엄 원스톱 인테리어 솔루션', NULL, 2, '{"cards": [{"image": "", "title": "사용할수록 만족이 깊어지는 공간"}, {"image": "", "title": "시간이 지나도 질리지 않는 디자인"}, {"image": "", "title": "가족의 생활을 중심으로 설계된 집"}]}'),
  ('youtube', '영상으로 만나는 하우두홈', 'HOWDOHOME TV', '하우두홈이 완성한 주택 이야기부터 집짓기 노하우까지,
하우두홈TV에서 영상으로 만나보세요.', NULL, 3, '{"youtube_url": "https://www.youtube.com/embed/dQw4w9WgXcQ"}');

