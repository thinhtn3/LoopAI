import QuestionSelector from "@/components/home/QuestionSelector";
import ProblemSet from "@/components/home/ProblemSet";
import { useState, useEffect } from "react";
import { useHomeTheme } from "@/context/HomeThemeContext";
import Navbar from "@/components/common/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home({ user, isLoading }) {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/auth");
    }
  }, [user, isLoading]);

  return (
    user ? (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--home-bg)]">
      <Navbar user={user} isLoading={isLoading} />
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
