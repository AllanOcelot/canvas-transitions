import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Ensure root points to your `index.html`
  build: {
    outDir: 'dist', // Output folder for built files
  },
});