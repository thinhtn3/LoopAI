import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Interview from "./pages/Interview";
import Home from "./pages/Home";
import { HomeThemeProvider } from "./context/HomeThemeContext";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
// import '@fontsource/geist-sans';
import axios from "axios";

export default function App() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const fetchSessionId = async () => {
      if (user) {
        //retrieve session id from supabase
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/chat/session`,
          {
            params: {
              userId: user.id,
            },
          }
        );
        localStorage.setItem("sessionId", response.data.sessionId);
      } else {
        localStorage.removeItem("sessionId");
        console.log("User not found");
      }
    };
    fetchSessionId();
  }, [user]);

  return (
    <HomeThemeProvider>
      <Routes>
        <Route path="/" element={<Landing user={user} isLoading={isLoading}  />} />
        <Route path="/home" element={<Home user={user} isLoading={isLoading}  />} />
        <Route path="/interview" element={<Interview user={user} isLoading={isLoading} />} />
        <Route path="/auth" element={<Auth user={user} isLoading={isLoading} />} />
      </Routes>
    </HomeThemeProvider>
  );
}
