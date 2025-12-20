import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
      '/sessionLogin': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
      '/sessionLogout': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@guards': path.resolve(__dirname, 'src/guards'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@providers': path.resolve(__dirname, 'src/providers'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});
