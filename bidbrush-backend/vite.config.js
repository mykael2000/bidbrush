import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/build',
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
    outDir: '/build',  // for example, build outside public at project root ../assets_build
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'resources/js/app.jsx',
    },
  },
});
