import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 3007,
    open: true,
    host: true, // Listen on all local IPs

  }
});
