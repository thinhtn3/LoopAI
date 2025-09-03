import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function ProblemSet({ questions }) {
  return (
    <div className="w-screen flex flex-col items-center justify-center">
      {questions.map((question) => (
        <Link key={question.slug} to={`/interview/?slug=${question.slug}`}>
          <Card className="w-1/2">
            <CardHeader>
              <CardTitle>{question.title}</CardTitle>
              <CardDescription>{question.difficulty}</CardDescription>
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
