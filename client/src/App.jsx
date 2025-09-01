import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Interview from './pages/Interview';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/interview" element={<Interview />} />
    </Routes>
  );
}