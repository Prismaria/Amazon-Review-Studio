import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    root: 'extension-shell',
    build: {
        outDir: '../dist-shell',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'extension-shell/popup/index.html'),
            },
        },
    },
});
