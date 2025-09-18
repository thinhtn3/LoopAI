import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DefaultButton from "../common/DefaultButton";
import { useAuth } from "../../hooks/useAuth.jsx";

export default function SignIn({ setShowSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user, login } = useAuth();

  const handleSignIn = async () => {
    const loggedIn = await login(email, password);
    if (loggedIn.ok || user) {
      navigate("/problems");
    } else {
      setError(loggedIn.message);
    }
  };
  const handleClick = () => {
    setShowSignUp(true);
  };

  return (
    <div className="w-1/6">
      <Card className="bg-[var(--home-surface)] border-[var(--home-border)] text-[var(--home-text)]">
        <CardHeader className="flex justify-center">
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-[var(--home-error)]">{error}</p>}

          {/* Sign Up Link */}
          <p>
            No account?{" "}
            <span
              className="text-[var(--home-accent)] cursor-pointer"
              onClick={handleClick}
            >
              Sign Up
            </span>
          </p>

          {/* Sign In Button */}
          <DefaultButton
            className="bg-[var(--home-accent)] text-[var(--home-accentText)] border border-[var(--home-border)] transition-all duration-150 hover:bg-[var(--home-accentHover)]"
            onClick={handleSignIn}
          >
            Sign In
          </DefaultButton>
        </CardContent>
      </Card>
    </div>
  );
}
