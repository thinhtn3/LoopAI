import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import DefaultButton from "../common/DefaultButton";

export default function SignIn({ setShowSignUp }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate();

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error(error);
            setError(error.message);
            return;
        }  
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/`, {
            userId: data.user.id,
        });
        //store session id in local storage
        if (response.status === 200) {
            // localStorage.setItem("user", JSON.stringify({sessionId: response.data.session, userId: response.data.userId}));
            console.log("Authenticated");
            navigate("/problems");
        } else {
            // TODO: Add error message for invalid credentials
            console.error("Error storing session id");
        }
        
        
    }
    const handleClick = () => {
        setShowSignUp(true);
    }

    return (
        <div className="w-1/6">
            <Card className="bg-[var(--home-surface)] border-[var(--home-border)] text-[var(--home-text)]">
                <CardHeader className="flex justify-center">
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="text-[var(--home-error)]">{error}</p>}
                    <p>No account? <span className="text-[var(--home-accent)] cursor-pointer" onClick={handleClick}>Sign Up</span></p>
                    <DefaultButton className="bg-[var(--home-accent)] text-[var(--home-accentText)] border border-[var(--home-border)] transition-all duration-150 hover:bg-[var(--home-accentHover)]" onClick={handleSignIn}>Sign In</DefaultButton>
                </CardContent>
            </Card>
        </div>
)
}
