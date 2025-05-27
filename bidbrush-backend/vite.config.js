import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/build/', // URL path the browser will request
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: '/build', // this puts it in /account/build
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: 'resources/js/app.jsx',
        },
    },
});
