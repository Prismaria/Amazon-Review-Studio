/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './extension-shell/**/*.{js,ts,jsx,tsx,html}'
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                primary: '#FF9900',
                'primary-hover': '#e68a00',
                secondary: '#232f3e',
                'secondary-hover': '#131921',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
