import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vite runs the website. Vitest runs the component tests using the same tools.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Provide a simulated browser for component tests.
    setupFiles: ['./src/test/setup.js'],
    css: true,
  },
});
