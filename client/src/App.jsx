import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Interview from './pages/Interview';
import Home from './pages/Home';
import { HomeThemeProvider } from './context/HomeThemeContext';
import Auth from './pages/Auth';
// import '@fontsource/geist-sans';

export default function App() {
  return (
    <HomeThemeProvider>
      <Routes>  
        <Route path="/" element={<Landing />} />  
        <Route path="/home" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </HomeThemeProvider>
  );
}