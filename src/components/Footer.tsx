import React from 'react';
import { Github, Linkedin, Twitter, X } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Rodrigue GBADOU. Tous droits réservés.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/rodriguetg" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/rodrigue-gbadou/" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com/EsperantRodrigu" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
              <Twitter size={20} />
              <span>Twitter (X)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
