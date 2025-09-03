
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function QuestionSelector({ questions, setQuestions }) {
  const [search, setSearch] = useState("");
  const fetchQuestions = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/search?keyword=${search}`);
    setQuestions(response.data.problems);
  }


  return (
    <Card className="flex flex-col justify-center items-center w-1/2">
      <div className="flex flex-col justify-center items-center">
        <Input placeholder="Search for a question" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={fetchQuestions}>Search</Button>
      </div>
      <div>
        <Button>Random</Button>
      </div>
    </Card>
  );
}
