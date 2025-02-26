import React from 'react';
import { Menu, X, Mail, Phone, Linkedin, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onThemeToggle: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onThemeToggle, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add window resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll state
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside of it
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navItems = [
    { label: 'Accueil', id: 'hero', type: 'section' },
    { label: 'À propos', id: 'about', type: 'section' },
    { label: 'Expérience', id: 'experience', type: 'section' },
    { label: 'Compétences', id: 'competences', type: 'section' },
    { label: 'Mes Projets', id: 'projects', type: 'section' },
    { label: 'CV', id: 'resume', type: 'section' },
    { label: 'Contact', id: 'contact', type: 'section' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { id: string, type: string }) => {
    e.preventDefault();
    if (item.type === 'section') {
      // Si nous sommes sur une autre page, retournons d'abord à l'accueil
      if (location.pathname !== '/') {
        navigate('/');
        // Attendons un peu que la page d'accueil se charge avant de défiler
        setTimeout(() => onNavigate(item.id), 100);
      } else {
        onNavigate(item.id);
      }
    } else {
      navigate(item.id);
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    onThemeToggle();
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-200 ${
      scrolled ? 'bg-white bg-opacity-95 dark:bg-gray-800 dark:bg-opacity-95 shadow-md' : 'bg-white dark:bg-gray-800'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer"
          >
            Rodrigue GBADOU
          </motion.div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.type === 'section' ? `#${item.id}` : item.id}
                onClick={(e) => handleNavClick(e, item)}
                whileHover={{ scale: 1.05 }}
                className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors ${
                  (item.type === 'route' && location.pathname === item.id) ? 'text-primary-600 dark:text-primary-400' : ''
                }`}
              >
                {item.label}
              </motion.a>
            ))}

            <div className="flex items-center gap-4 ml-4">
              <LanguageSelector
                currentLocale={locale}
                onLocaleChange={setLocale}
              />
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <LanguageSelector
              currentLocale={locale}
              onLocaleChange={setLocale}
            />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile avec animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
                className="py-4 bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-xl"
              >
                <div className="flex flex-col space-y-3 px-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={item.type === 'section' ? `#${item.id}` : item.id}
                      onClick={(e) => handleNavClick(e, item)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`py-2 px-4 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        (item.type === 'route' && location.pathname === item.id) ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : ''
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
