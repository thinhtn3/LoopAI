import { useState } from "react";
import SignIn from "@/components/auth/SignIn.jsx";
import SignUp from "@/components/auth/SignUp.jsx";
import logo from "@/assets/icon.png";
import Navbar from "@/components/common/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth.jsx";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const [showSignUp, setShowSignUp] = useState(() => location.state?.showSignUp ?? false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/problems");
    }
  }, [user]);

  useEffect(() => {
    if (typeof location.state?.showSignUp === "boolean") {
      setShowSignUp(location.state.showSignUp);
    }
  }, [location.state]);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between bg-[var(--home-bg)]">
      <Navbar />

      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <div className="flex items-center">
          <img src={logo} alt="LoopAI" className="w-24" />
          <h1 className="text-3xl font-black text-[var(--home-accent)]">
            LoopAI
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h2 className="text-3xl font-extrabold text-[var(--home-text)]">
            {showSignUp ? "Create an account" : "Welcome back"}
          </h2>
          <p className="text-sm text-[var(--home-muted)]">
            {showSignUp
              ? "Join us today to start your journey"
              : "Sign in to your account to continue"}
          </p>
        </div>
        {showSignUp ? <SignUp setShowSignUp={setShowSignUp} /> : <SignIn setShowSignUp={setShowSignUp} />}
      </div>
    </div>
  );
}
