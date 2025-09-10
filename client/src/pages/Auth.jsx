import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignIn from "@/components/auth/signIn";
import SignUp from "@/components/auth/signUp";
import { useHomeTheme } from "@/context/HomeThemeContext";
import logo from "@/assets/icon.png";
import Navbar from "@/components/common/Navbar";

export default function Auth({ authenticated, setAuthenticated, setSessionId }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const { theme } = useHomeTheme();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between bg-[var(--home-bg)]">
      <Navbar authenticated={authenticated} setAuthenticated={setAuthenticated} setSessionId={setSessionId} />

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
        {showSignUp ? <SignUp setShowSignUp={setShowSignUp} setAuthenticated={setAuthenticated} /> : <SignIn setShowSignUp={setShowSignUp} setAuthenticated={setAuthenticated} />}
      </div>
    </div>
  );
}
