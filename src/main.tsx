import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enregistrement du service worker pour le cache offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Préchargement des polices critiques
const link = document.createElement('link');
link.rel = 'preload';
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
link.as = 'style';
document.head.appendChild(link);

// Préchargement des ressources critiques
const criticalResources = [
  '/CV_Rodrigue_GBADOU.pdf',
  '/images/projects/les-cinephiles.jpg.png'
];

criticalResources.forEach(resource => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = resource;
  link.as = resource.endsWith('.pdf') ? 'document' : 'image';
  document.head.appendChild(link);
});

// Optimisation du rendu
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
