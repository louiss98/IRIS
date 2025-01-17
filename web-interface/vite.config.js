import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Set the root directory for your project
  server: {
    open: true, // Automatically open the browser on server start
  },
  build: {
    outDir: '../dist', // Output directory for the build
  },
});