import QuestionSelector from "@/components/home/QuestionSelector";
import ProblemSet from "@/components/home/ProblemSet";
import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.jsx";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  return user ? (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--home-bg)]">
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <QuestionSelector setQuestions={setQuestions} />
        <ProblemSet questions={questions} />
      </div>
    </div>
  ) : (
    //bad request
    <div>
      <h1>You are not authenticated</h1>
    </div>
  );
}
