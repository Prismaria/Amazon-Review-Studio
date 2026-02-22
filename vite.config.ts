import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: false, // Ensure readability for Greasy Fork reviewers
    },
    plugins: [
        react({ jsxRuntime: 'classic' }),
        monkey({
            entry: 'src/main.tsx',
            userscript: {
                name: 'Amazon Review Toolkit 2.0',
                namespace: 'https://github.com/Prismaria/Amazon-Review-Studio',
                version: '2.0.7',
                description: 'Complete review writing tookit for Amazon.',
                author: 'Prismaris',
                license: 'MIT',
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
                require: [
                    'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js',
                    'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js',
                    'https://cdn.jsdelivr.net/npm/sweetalert2@11.10/dist/sweetalert2.all.min.js'
                ],
                connect: [
                    'pastebin.com',
                    'catbox.moe',
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
                externalGlobals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'react-dom/client': 'ReactDOM',
                    'sweetalert2': 'Swal',
                },
            },
        }),
    ],
});
