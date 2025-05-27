import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/build/', // Laravel expects assets here
    build: {
        outDir: 'public/build', // VERY IMPORTANT: output to public/build
        emptyOutDir: true,
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
