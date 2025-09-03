import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function QuestionDisplay({ selectedProblem }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-semibold">{selectedProblem.title}</h3>
          <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
            {selectedProblem.difficulty}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>{selectedProblem.acceptance}</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0 p-4">
        <div>
          <p>{selectedProblem.description}</p>
          {/* Examples */}
          
          {selectedProblem.examples && (
            <div>
              <h4 className="font-semibold mb-2">Examples</h4>
              {selectedProblem.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="mb-3 p-2 border rounded bg-muted/30 text-sm"
                >
                  <p>
                    <strong>Input:</strong> {JSON.stringify(ex.input, null, 2)}
                  </p>
                  <p>
                    <strong>Output:</strong> {JSON.stringify(ex.output)}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {ex.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
