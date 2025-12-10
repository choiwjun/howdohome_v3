-- =============================================
-- Supabase Storage 설정
-- Supabase 대시보드 > SQL Editor에서 실행
-- =============================================

-- 1. 미디어 버킷 생성 (이미 있으면 무시)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. 공개 읽기 정책 (누구나 이미지 조회 가능)
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT
USING (bucket_id = 'media');

-- 3. 인증된 사용자 업로드 정책
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);

-- 4. 인증된 사용자 삭제 정책
CREATE POLICY "Authenticated users can delete" ON storage.objects
FOR DELETE
USING (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);

-- 5. 인증된 사용자 업데이트 정책
CREATE POLICY "Authenticated users can update" ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);
