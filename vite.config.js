import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorer certains avertissements
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || 
            warning.code === 'THIS_IS_UNDEFINED') {
          return;
        }
        warn(warning);
      }
    },
    // Augmenter la limite de taille du chunk pour éviter les erreurs
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      // Remplacer framer-motion par notre stub
      'framer-motion': path.resolve(__dirname, './src/framer-motion-stub.js')
    },
  },
  // Augmenter la limite de mémoire pour le processus de compilation
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      target: 'es2020'
    }
  },
  server: {
    host: true,
  },
});
