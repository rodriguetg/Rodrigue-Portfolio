import React from 'react';
import { Menu, X, Mail, Phone, Linkedin, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { label: 'Accueil', id: 'hero', type: 'section' },
    { label: 'À propos', id: 'about', type: 'section' },
    { label: 'Expérience', id: 'experience', type: 'section' },
    { label: 'Compétences', id: 'competences', type: 'section' },
    { label: 'Mes Projets', id: 'projects', type: 'section' },
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
    <header className="fixed w-full bg-white dark:bg-gray-800 shadow-sm z-50">
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
          <div className="hidden md:flex items-center space-x-8">
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

            <div className="flex items-center gap-4">
              <LanguageSelector
                currentLocale={locale}
                onLocaleChange={setLocale}
              />
              <button
                onClick={onThemeToggle}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4"
          >
            <div className="flex flex-col space-y-4">
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
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}