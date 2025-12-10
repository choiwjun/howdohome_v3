import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
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
            <Route path="news" element={<ComingSoon title="소식 관리" />} />
            <Route path="journals" element={<ComingSoon title="현장일지 관리" />} />
            <Route path="gallery" element={<ComingSoon title="갤러리 관리" />} />
            <Route path="portfolios" element={<ComingSoon title="지명원 관리" />} />
            <Route path="process" element={<ComingSoon title="프로세스 관리" />} />
            <Route path="faqs" element={<ComingSoon title="FAQ 관리" />} />
            <Route path="media" element={<ComingSoon title="미디어 라이브러리" />} />
            <Route path="settings" element={<ComingSoon title="사이트 설정" />} />
          </Route>
          
          {/* Main Site Routes */}
          <Route path="/" element={<MainLayout><MainPage /></MainLayout>} />
          <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
          <Route path="/gallery/house" element={<MainLayout><HousePage /></MainLayout>} />
          <Route path="/gallery/apartment" element={<MainLayout><ApartmentPage /></MainLayout>} />
          <Route path="/process" element={<MainLayout><ProcessPage /></MainLayout>} />
          <Route path="/portfolio" element={<MainLayout><PortfolioPage /></MainLayout>} />
          <Route path="/news" element={<MainLayout><NewsPage /></MainLayout>} />
          <Route path="/news/:id" element={<MainLayout><NewsDetailPage /></MainLayout>} />
          <Route path="/journal" element={<MainLayout><JournalPage /></MainLayout>} />
          <Route path="/journal/:id" element={<MainLayout><JournalDetailPage /></MainLayout>} />
          <Route path="/support/consultation" element={<MainLayout><ConsultationPage /></MainLayout>} />
          <Route path="/support/visit" element={<MainLayout><VisitPage /></MainLayout>} />
          <Route path="/support/location" element={<MainLayout><LocationPage /></MainLayout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
