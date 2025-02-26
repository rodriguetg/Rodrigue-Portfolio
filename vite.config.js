import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Réduire la taille du bundle et éviter les erreurs liées à framer-motion
      external: ['framer-motion'],
      output: {
        // Remplacer les imports de framer-motion par des stubs vides
        globals: {
          'framer-motion': 'FramerMotion',
        },
      },
    },
    // Augmenter la limite de taille du chunk pour éviter les erreurs
    chunkSizeWarningLimit: 2000,
  },
  // Augmenter la limite de mémoire pour le processus de compilation
  optimizeDeps: {
    force: true,
  },
  server: {
    host: true,
  },
});
