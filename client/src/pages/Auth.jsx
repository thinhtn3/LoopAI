import { useState } from "react";
import SignIn from "@/components/auth/SignIn.jsx";
import SignUp from "@/components/auth/SignUp.jsx";
import logo from "@/assets/icon.png";
import Navbar from "@/components/common/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth.jsx";


export default function Auth() {
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    //If user is authenticated, redirect to problems
    if (user) {
      navigate("/problems");
    }
  }, [user]);

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
