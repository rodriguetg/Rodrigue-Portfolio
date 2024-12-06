import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Newsletter } from './Newsletter';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Vérifier si le popup a déjà été fermé
    const hasClosedPopup = localStorage.getItem('newsletterPopupClosed');
    
    if (!hasClosedPopup) {
      // Afficher le popup après 30 secondes
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Sauvegarder que l'utilisateur a fermé le popup
    localStorage.setItem('newsletterPopupClosed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-full max-w-lg mx-4 z-50"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
              {/* Bouton fermer */}
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 p-1 bg-white dark:bg-gray-700 
                         rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 
                         transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Contenu */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Restez informé !
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Ne manquez aucun de mes articles et actualités en vous inscrivant à ma newsletter.
                </p>
                
                <Newsletter />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
