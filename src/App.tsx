import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { SEO } from './components/SEO';
import { useDarkMode } from './hooks/useDarkMode';
import ErrorBoundary from './components/ErrorBoundary';
import CustomCursor from './components/ui/CustomCursor';
import ParticleBackground from './components/ui/ParticleBackground';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy loading des composants avec type annotations
const About = React.lazy(() => import('./components/About').then(module => ({ default: module.default })));
const Experience = React.lazy(() => import('./components/Experience').then(module => ({ default: module.default })));
const Skills = React.lazy(() => import('./components/Skills').then(module => ({ default: module.default })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.default })));
const Projects = React.lazy(() => import('./components/Projects').then(module => ({ default: module.default })));
const ManualVerification = React.lazy(() => import('./components/ManualVerification').then(module => ({ default: module.default })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.default })));
const ResumeDownload = React.lazy(() => import('./components/ResumeDownload').then(module => ({ default: module.default })));

// Loading fallback
const LoadingSpinner = () => <LoadingScreen />;

// Composant pour gérer le scroll au changement de route
function ScrollToTopOnMount() {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const MainApp = () => {
  const { isDark, toggle } = useDarkMode();

  React.useEffect(() => {
    document.body.classList.add('cursor-hidden');
    return () => {
      document.body.classList.remove('cursor-hidden');
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-50'} transition-colors duration-200 cursor-hidden`}>
        <SEO />
        <ScrollProgress />
        <ParticleBackground />
        <CustomCursor />
        <Header />
        
        <Suspense fallback={<LoadingSpinner />}>
          <main>
            <Hero />
            <Suspense fallback={<LoadingSpinner />}><About /></Suspense>
            <Suspense fallback={<LoadingSpinner />}><Experience /></Suspense>
            <Suspense fallback={<LoadingSpinner />}><Skills /></Suspense>
            <Suspense fallback={<LoadingSpinner />}><Projects /></Suspense>
            <Suspense fallback={<LoadingSpinner />}><ResumeDownload cvUrl="/CV_Rodrigue_GBADOU.pdf" /></Suspense>
            <Suspense fallback={<LoadingSpinner />}><Testimonials /></Suspense>
            <Suspense fallback={<LoadingSpinner />}><Contact /></Suspense>
          </main>
        </Suspense>

        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTopOnMount />
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/verification" element={<ManualVerification />} />
          <Route path="*" element={<MainApp />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
