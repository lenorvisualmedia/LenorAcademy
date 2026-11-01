import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          'vendor-lenis': ['lenis'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react', '@hugeicons/react', '@hugeicons/core-free-icons'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
