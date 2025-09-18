import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import DefaultButton from "../common/DefaultButton";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../hooks/useAuth.jsx";


export default function SignUp({ setShowSignUp }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signup } = useAuth();
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const signedUp = await signup(email, password);
        if (signedUp.ok) {
            setShowSignUp(false);
        } else {
            setError(signedUp.message);
        }
    }

    const handleClick = () => {
        setShowSignUp(false);
    }

    return (
        <div className="w-1/6">
            <Card className="bg-[var(--home-surface)] border-[var(--home-border)] text-[var(--home-text)]">
                <CardHeader className="flex justify-center">
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="text" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" className="border-1 border-[var(--home-border)] bg-[var(--home-bg)]" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <p>Already have an account? <span className="text-[var(--home-accent)] cursor-pointer" onClick={handleClick}>Sign In</span></p>
                    {error && <p className="text-red-500">{error}</p>}
                    <DefaultButton className="bg-[var(--home-accent)] text-[var(--home-accentText)] border border-[var(--home-border)] transition-all duration-150 hover:bg-[var(--home-accentHover)]" onClick={handleSignUp}>Sign up</DefaultButton>
                </CardContent>
            </Card>
        </div>
)
}