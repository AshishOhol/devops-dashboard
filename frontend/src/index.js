/*
 * React Application Entry Point
 * This file is the starting point of the React application.
 * It renders the main App component into the DOM element with id='root'.
 * 
 * Purpose:
 * - Initialize React 18's new root API
 * - Mount the main App component
 * - Start the React application lifecycle
 */

// Import React library - core library for building user interfaces
import React from 'react';

// Import ReactDOM client API - React 18's new rendering system
import ReactDOM from 'react-dom/client';

// Import the main App component that contains the entire dashboard
import App from './App';

// Create React root using the new React 18 API
// This finds the HTML element with id='root' and prepares it for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root element
// This starts the React application and displays the dashboard
root.render(<App />);