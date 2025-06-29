import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  focusVisible: boolean;
  setFocusVisible: (visible: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('highContrast') === 'true';
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('reducedMotion') === 'true' || 
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>(() => {
    return (localStorage.getItem('fontSize') as 'small' | 'medium' | 'large') || 'medium';
  });
  
  const [focusVisible, setFocusVisible] = useState(false);

  // Appliquer les paramètres d'accessibilité
  useEffect(() => {
    const root = document.documentElement;
    
    // Contraste élevé
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Mouvement réduit
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    // Taille de police
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    root.classList.add(`font-size-${fontSize}`);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('highContrast', highContrast.toString());
    localStorage.setItem('reducedMotion', reducedMotion.toString());
    localStorage.setItem('fontSize', fontSize);
  }, [highContrast, reducedMotion, fontSize]);

  // Gestionnaire de navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  const value: AccessibilityContextType = {
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    fontSize,
    setFontSize,
    focusVisible,
    setFocusVisible,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Composant pour les raccourcis clavier d'accessibilité
export const AccessibilityShortcuts: React.FC = () => {
  const { toggleHighContrast, toggleReducedMotion, setFontSize } = useAccessibility();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + H : Contraste élevé
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        toggleHighContrast();
      }
      
      // Ctrl/Cmd + Shift + M : Mouvement réduit
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        toggleReducedMotion();
      }
      
      // Ctrl/Cmd + Shift + Plus : Augmenter la taille de police
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '=') {
        e.preventDefault();
        const currentSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large' || 'medium';
        if (currentSize === 'small') setFontSize('medium');
        else if (currentSize === 'medium') setFontSize('large');
        else setFontSize('large');
      }
      
      // Ctrl/Cmd + Shift + Minus : Diminuer la taille de police
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '-') {
        e.preventDefault();
        const currentSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large' || 'medium';
        if (currentSize === 'large') setFontSize('medium');
        else if (currentSize === 'medium') setFontSize('small');
        else setFontSize('small');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleHighContrast, toggleReducedMotion, setFontSize]);

  return null;
}; 