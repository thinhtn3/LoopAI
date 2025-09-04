import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useHomeTheme } from "@/context/HomeThemeContext";
import DefaultButton from "@/components/common/DefaultButton";

export default function QuestionSelector({ questions, setQuestions }) {
  const [search, setSearch] = useState("");
  const { theme } = useHomeTheme();
  const fetchQuestions = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/search?keyword=${search}`
    );
    setQuestions(response.data.problems);
  };

  return (
    <Card className="flex flex-col justify-center items-start w-1/2 bg-[var(--home-surface)] border border-[var(--home-border)] p-4">
      <div className="flex flex-col justify-center w-full">
        <Input
          className="w-[100%] bg-[var(--home-surface)] border border-[var(--home-border)] active:border-[var(--home-accent) focus:border-[var(--home-accent)] text-[var(--home-text)]"
          placeholder="Search for a question"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-row justify-start w-full gap-4 mt-4">
          <DefaultButton
            asChild //passes parent styling to child
            onClick={fetchQuestions}
            className="text-left  bg-[var(--home-accent)] text-[var(--home-accentText)] border border-[var(--home-border)] transition-all duration-150 hover:bg-[var(--home-accentHover)]"
          >
            <p>Search</p>
          </DefaultButton>

          <DefaultButton
            asChild //passes parent styling to child
            onClick={fetchQuestions}
            className="text-left  bg-[var(--home-surface)] text-[var(--home-text)] border border-[var(--home-border)] transition-all duration-150 hover:bg-[var(--home-accentHover)]"
          >
            <p>Random</p>
          </DefaultButton>
        </div>
      </div>
    </Card>
  );
}
