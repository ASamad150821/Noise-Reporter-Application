import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite is the build tool that serves your code in dev (with hot-reload)
// and bundles it for production. The React plugin adds JSX/TSX support.
// Your work app uses Vite too — see the real app's vite.config.ts.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
