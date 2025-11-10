// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App.jsx'; // let op: AppWrapper, niet App!
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);
