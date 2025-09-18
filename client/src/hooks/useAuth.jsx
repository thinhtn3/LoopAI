import { useState, useEffect, useContext, createContext } from "react";
import { HTTP_STATUS_CODES } from "../../../backend/constants/index.js";
import axios from "axios";

const AuthContext = createContext();

//Provider for auth context (overarching auth state for the entire app)
export function AuthProvider({ children }) {
  //Global user state
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user on first load (from cookies)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true })
      .then((res) => {
        if (res.status === HTTP_STATUS_CODES.BAD_REQUEST) {
          setUser(null);
        } else {
          setUser({
            userId: res.data.user.id,
            displayName: res.data.user.displayName,
          });
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
      setUser({
        userId: res.data.user.id,
        displayName: res.data.user.displayName,
      });
      return {
        ok: true,
        userId: res.data.user.id,
        displayName: res.data.user.displayName,
      };
    } catch (error) {
      if (error.response.status === 400) {
        return {
          ok: false,
          message: error.response.data.message,
        };
      }
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res, "foo");
      return { ok: true };
    } catch (error) {
      //TODO: ADD VALIDATION FOR EMAIL AND PASSWORD (NO DUPLICATE EMAILS)
      if (error.response.status === 400) {
        return {
          ok: false,
          message: error.response.data.message,
        };
      }
    }
  };

  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

//Hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}
