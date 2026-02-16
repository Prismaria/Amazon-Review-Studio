import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        monkey({
            entry: 'src/main.tsx',
            userscript: {
                name: 'Amazon Review Toolkit 2.0',
                namespace: 'https://github.com/Prismaria/Amazon-Review-Studio',
                version: '2.0.0',
                description: 'Complete review writing tookit for Amazon.',
                author: 'Prismaris',
                match: [
                    '*://*.amazon.com/*',
                    '*://*.amazon.ca/*',
                    '*://*.amazon.co.uk/*',
                    '*://*.amazon.de/*',
                    '*://*.amazon.fr/*',
                    '*://*.amazon.it/*',
                    '*://*.amazon.es/*',
                    '*://*.amazon.co.jp/*',
                    '*://*.amazon.in/*',
                    '*://*.amazon.com.au/*'
                ],
                connect: [
                    'pastebin.com',
                    'localhost',
                    '127.0.0.1',
                    'generativelanguage.googleapis.com'
                ],
                grant: [
                    'GM_xmlhttpRequest',
                    'GM_setValue',
                    'GM_getValue',
                    'GM_deleteValue',
                    'GM_listValues',
                    'unsafeWindow'
                ],
                'run-at': 'document-start'
            },
            build: {
                // Bundling React to avoid CSP blocking external CDNs
                externalGlobals: {
                },
            },
        }),
    ],
});
