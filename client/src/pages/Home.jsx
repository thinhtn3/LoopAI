import QuestionSelector from "@/components/home/QuestionSelector";
import ProblemSet from "@/components/home/ProblemSet";
import { useState, useEffect } from "react";
import { useHomeTheme } from "@/context/HomeThemeContext";
import Navbar from "@/components/common/Navbar";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const { theme } = useHomeTheme();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      //Get JWT Token from localStorage (already verified by supabase)
      const { data, error } = await supabase.auth.getSession();
      setAuthenticated(data.session !== null);
      if (error) {
        console.error(error);
        return;
      }
      if (authenticated) {
        setAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  return (
    authenticated ? (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--home-bg)]">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <QuestionSelector questions={questions} setQuestions={setQuestions} />
        <ProblemSet questions={questions} />
      </div>
    </div>
    ) : (
      <div>
        <h1>You are not authenticated</h1>
      </div>
    )
  );
}
