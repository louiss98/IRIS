import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // The folder where index.html is located
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
      }
    }
  },
  server: {
    open: true,
  },
});