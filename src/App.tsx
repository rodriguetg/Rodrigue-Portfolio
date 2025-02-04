import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { SEO } from './components/SEO';
import { useDarkMode } from './hooks/useDarkMode';

// Lazy loading des composants avec type annotations
const About = React.lazy(() => import('./components/About').then(module => ({ default: module.default })));
const Experience = React.lazy(() => import('./components/Experience').then(module => ({ default: module.default })));
const Skills = React.lazy(() => import('./components/Skills').then(module => ({ default: module.default })));
const Contact = React.lazy(() => import('./components/Contact').then(module => ({ default: module.default })));
const Projects = React.lazy(() => import('./components/Projects').then(module => ({ default: module.default })));
const ManualVerification = React.lazy(() => import('./components/ManualVerification').then(module => ({ default: module.default })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(module => ({ default: module.default })));
const GitHubProjects = React.lazy(() => import('./components/GitHubProjects').then(module => ({ default: module.default })));

// Loading fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

// Composant pour gérer le scroll au changement de route
function ScrollToTopOnMount() {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  const { isDark, toggle } = useDarkMode();

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
    <LanguageProvider>
      <Router>
        <ScrollToTopOnMount />
        <div className={`min-h-screen ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-50'} transition-colors duration-200`}>
          <SEO />
          <ScrollProgress />
          <Header onThemeToggle={toggle} onNavigate={scrollToSection} />
          
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={
                <main>
                  <Hero onNavigate={scrollToSection} />
                  <Suspense fallback={<LoadingSpinner />}><About /></Suspense>
                  <Suspense fallback={<LoadingSpinner />}><Experience /></Suspense>
                  <Suspense fallback={<LoadingSpinner />}><Skills /></Suspense>
                  <Suspense fallback={<LoadingSpinner />}><GitHubProjects /></Suspense>
                  <Suspense fallback={<LoadingSpinner />}><Projects /></Suspense>
                  <Suspense fallback={<LoadingSpinner />}><Testimonials /></Suspense>
                  <Suspense fallback={<LoadingSpinner />}><Contact /></Suspense>
                </main>
              } />
              <Route path="/verification" element={<ManualVerification />} />
            </Routes>
          </Suspense>

          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;