import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HomeThemeProvider } from "./context/HomeThemeContext";
import { AuthProvider } from "./hooks/useAuth.jsx";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/geist-sans";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HomeThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
