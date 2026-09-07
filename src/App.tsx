import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashGate from '@/components/SplashGate';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import ResourceArticle from '@/pages/ResourceArticle';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <SplashGate />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF9', color: '#2E2A4A' }}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/resource/:slug" element={<ResourceArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
