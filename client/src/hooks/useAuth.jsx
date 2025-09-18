import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

//Provider for auth context (overarching auth state for the entire app)
export function AuthProvider({ children }) {
  //Global user state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user on first load (from cookies)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true })
    //if response is 401, set user to null
      .then(res => {
        if (res.status === 400) {
          setUser(null);
        } else {
          setUser({ userId: res.data.user.id, displayName: res.data.user.displayName });
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);
  
  const login = async (email, password) => {
    try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      { email, password },
      { withCredentials: true }
      );
      setUser({ userId: res.data.user.id, displayName: res.data.user.displayName  });

      return { userId: res.data.user.id, displayName: res.data.user.displayName };
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//Hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}
