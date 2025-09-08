import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { InterviewThemeProvider } from './context/InterviewThemeContext'
import { HomeThemeProvider } from './context/HomeThemeContext'
import App from './App.jsx'
import './index.css'
import '@fontsource/geist-sans';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <InterviewThemeProvider>
          <HomeThemeProvider>
            <App />
          </HomeThemeProvider>
        </InterviewThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
