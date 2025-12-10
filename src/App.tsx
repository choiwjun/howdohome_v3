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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}