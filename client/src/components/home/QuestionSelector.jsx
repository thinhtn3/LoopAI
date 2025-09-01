import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuestionSelector() {
  const [search, setSearch] = useState("");
  return (
    <Card className="flex flex-col justify-center items-center w-1/2">
      <div className="flex flex-col justify-center items-center">
        <Input placeholder="Search for a question" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button>Search</Button>
      </div>
      <div>
        <Button>Random</Button>
      </div>
    </Card>
  );
}
