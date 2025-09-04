import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useHomeTheme } from "@/context/HomeThemeContext";
import { getDifficultyColor } from "@/constants/difficultyColor";
import { Badge } from "@/components/ui/badge";


export default function ProblemSet({ questions }) {
  const { theme } = useHomeTheme();
  return (
    <div className="w-1/2 flex flex-col items-center justify-center gap-y-6 py-4">
      {questions.map((question) => (
        <Link className="w-full" key={question.slug} to={`/interview/?slug=${question.slug}`}>
          <Card className="w-full bg-[var(--home-surface)] border border-[var(--home-border)] p-4">
            <CardHeader>
              <CardTitle className="text-[var(--home-text)] flex flex-row items-center gap-2"><p>{question.title}</p><Badge className={getDifficultyColor(question.difficulty.toLowerCase())}>{question.difficulty}</Badge></CardTitle>
              <CardDescription>
                {question.tags.map((tag) => tag.name).join(", ")}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
