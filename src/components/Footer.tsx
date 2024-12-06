import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} Votre Nom. Tous droits réservés.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/votre-username" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              GitHub
            </a>
            <a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              LinkedIn
            </a>
            <a href="https://twitter.com/votre-compte" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
