import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../hooks/useDarkMode';

export function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </motion.button>
  );
}
