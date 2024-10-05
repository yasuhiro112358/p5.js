import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // root directory for the project
  base: './', // base path for the project
  build: {
    outDir: '../dist', // output directory for the build
    emptyOutDir: true, // clean the output directory before building
    chunkSizeWarningLimit: 1500, // warn when the bundle size exceeds 1500KB
  }
});
