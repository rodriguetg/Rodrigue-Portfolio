// Script d'initialisation pour éviter les écrans blancs
(function() {
  // Vérifier si le DOM est déjà chargé
  function domReady() {
    try {
      const root = document.getElementById('root');
      
      // Si root existe mais est vide, ajouter un message de chargement
      if (root && !root.hasChildNodes()) {
        const loadingDiv = document.createElement('div');
        loadingDiv.style.minHeight = '100vh';
        loadingDiv.style.display = 'flex';
        loadingDiv.style.flexDirection = 'column';
        loadingDiv.style.alignItems = 'center';
        loadingDiv.style.justifyContent = 'center';
        loadingDiv.style.padding = '0 1rem';
        loadingDiv.style.textAlign = 'center';
        loadingDiv.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        
        const title = document.createElement('h1');
        title.textContent = 'Chargement du portfolio...';
        title.style.fontSize = '1.5rem';
        title.style.marginBottom = '1rem';
        
        const spinner = document.createElement('div');
        spinner.style.border = '4px solid rgba(0, 0, 0, 0.1)';
        spinner.style.borderRadius = '50%';
        spinner.style.borderTop = '4px solid #2563eb';
        spinner.style.width = '40px';
        spinner.style.height = '40px';
        spinner.style.animation = 'spin 1s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        
        document.head.appendChild(style);
        loadingDiv.appendChild(title);
        loadingDiv.appendChild(spinner);
        root.appendChild(loadingDiv);
      }
    } catch (e) {
      console.error('Erreur dans le script d\'initialisation:', e);
    }
  }
  
  // Exécuter au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', domReady);
  } else {
    domReady();
  }
  
  // Mettre en place un dernier recours en cas d'écran blanc persistant
  setTimeout(function() {
    if (document.body && (!document.getElementById('root') || !document.getElementById('root').hasChildNodes())) {
      window.location.reload();
    }
  }, 10000); // Rafraîchir après 10 secondes si toujours rien
})();
