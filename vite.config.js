import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Al-tife/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        articles: resolve(__dirname, 'articles.html'),
        login: resolve(__dirname, 'login.html'),
        dashboard: resolve(__dirname, 'dashboard.html')
      }
    }
  },

  server: {
    port: 3000,
    open: true
  }
});