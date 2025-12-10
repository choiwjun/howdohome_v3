import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { GalleryPage } from './components/GalleryPage';
import { HousePage } from './components/HousePage';
import { ApartmentPage } from './components/ApartmentPage';
import { ProcessPage } from './components/ProcessPage';
import { PortfolioPage } from './components/PortfolioPage';
import { NewsPage } from './components/NewsPage';
import { NewsDetailPage } from './components/NewsDetailPage';
import { JournalPage } from './components/JournalPage';
import { JournalDetailPage } from './components/JournalDetailPage';
import { ConsultationPage } from './components/ConsultationPage';
import { VisitPage } from './components/VisitPage';
import { LocationPage } from './components/LocationPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Admin imports
import { 
  AuthProvider, 
  AdminLayout, 
  ProtectedRoute, 
  LoginPage,
  DashboardPage,
  ConsultationsPage,
  ConsultationDetailPage
} from './admin';

// Layout wrapper for main site
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// App content with routes
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes don't use main layout
  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="consultations" element={<ConsultationsPage />} />
            <Route path="consultations/:id" element={<ConsultationDetailPage />} />
            {/* 추가 관리자 페이지들은 여기에 추가 */}
            <Route path="news" element={<ComingSoon title="소식 관리" />} />
            <Route path="journals" element={<ComingSoon title="현장일지 관리" />} />
            <Route path="gallery" element={<ComingSoon title="갤러리 관리" />} />
            <Route path="portfolios" element={<ComingSoon title="지명원 관리" />} />
            <Route path="process" element={<ComingSoon title="프로세스 관리" />} />
            <Route path="faqs" element={<ComingSoon title="FAQ 관리" />} />
            <Route path="media" element={<ComingSoon title="미디어 라이브러리" />} />
            <Route path="settings" element={<ComingSoon title="사이트 설정" />} />
          </Route>
        </Routes>
      </AuthProvider>
    );
  }

  // Main site routes
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/house" element={<HousePage />} />
        <Route path="/gallery/apartment" element={<ApartmentPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/:id" element={<JournalDetailPage />} />
        <Route path="/support/consultation" element={<ConsultationPage />} />
        <Route path="/support/visit" element={<VisitPage />} />
        <Route path="/support/location" element={<LocationPage />} />
      </Routes>
    </MainLayout>
  );
}

// Coming soon placeholder for admin pages
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500">곧 추가될 예정입니다.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
