import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/index.ts'), 
      name: 'CanvasTransitions',
      fileName: (format) => `canvas-transitions.${format}.js`,
    },
    rollupOptions: {
      output: {
        dir: 'dist',
      },
    },
  },
  server: {
    open: '/index.html',
    watch: {
      ignored: ['dist/**'], // Avoid infinite loops caused by build outputs
    },
  },
});