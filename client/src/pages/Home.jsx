import QuestionSelector from "@/components/home/QuestionSelector";
import ProblemSet from "@/components/home/ProblemSet";
import { useState, useEffect } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <QuestionSelector questions={questions} setQuestions={setQuestions} />
      <ProblemSet questions={questions} />
    </div>
  );
}