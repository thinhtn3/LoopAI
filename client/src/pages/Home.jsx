import QuestionSelector from "@/components/home/QuestionSelector";
import ProblemSet from "@/components/home/ProblemSet";
import { useState, useEffect } from "react";
import { useHomeTheme } from "@/context/HomeThemeContext";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const { theme } = useHomeTheme();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--home-bg)]">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <QuestionSelector questions={questions} setQuestions={setQuestions} />
        <ProblemSet questions={questions} />
      </div>
    </div>
  );
}
