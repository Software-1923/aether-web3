import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      input: {
        main: 'data.js',
        index: 'public/index.html',
      },
    },
  },
  optimizeDeps: {
    exclude: ['crypto'],
  },
});
