import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Interview from "./pages/Interview";
import Problems from "./pages/Problems";
import { HomeThemeProvider } from "./context/HomeThemeContext";
import Auth from "./pages/Auth";
// import '@fontsource/geist-sans';

export default function App() {

  return (
    <HomeThemeProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/problems" element={<Problems  />} />
        <Route path="/interview" element={<Interview  />} />
      </Routes>
    </HomeThemeProvider>
  );
}
