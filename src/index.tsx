import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import './scss/global.scss';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("appointment-widget-root");
    if (root)
    {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>, root);
    }
    else
    {
        console.error("Appointment root selector not found")
    }
});