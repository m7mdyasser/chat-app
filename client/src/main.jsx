import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter as Router } from 'react-router-dom';
import { AuthContextProvider}  from './Context/AuthContext.jsx';
import {  ThemeContextProvider } from './Context/Theme/Theme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
      <ThemeContextProvider>
        <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
)
