import React from 'react';
import ReactDOM from 'react-dom/client';
import { PopupApp } from './PopupApp';
import '../../src/index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <PopupApp />
        </React.StrictMode>
    );
}
