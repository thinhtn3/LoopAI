import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDifficultyColor } from "@/constants/difficultyColor";
import { useHomeTheme } from "@/context/HomeThemeContext";

export default function QuestionDisplay({ selectedProblem }) {
  const { theme } = useHomeTheme();

  const formatWithCommaSpace = (value) => {
    if (Array.isArray(value)) {
      return `[ ${value
        .map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v)))
        .join(", ")} ]`;
    }
    if (value && typeof value === "object") {
      return JSON.stringify(value).replace(/,\s*/g, ", ");
    }
    if (typeof value === "string") {
      return value.replace(/,\s*/g, ", ");
    }
    return String(value);
  };

  return (
    <div className="h-full flex flex-col bg-[var(--home-surface)] gap-y-2 p-4">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="xl:text-xl 2xl:text-2xl font-bold">
            {selectedProblem.title}
          </h3>
          <Badge
            className={getDifficultyColor(
              selectedProblem.difficulty.toLowerCase()
            )}
          >
            {selectedProblem.difficulty}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>{selectedProblem.acceptance}</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div>
          {/* Description */}
          <p className="xl:text-sm 2xl:text-lg text-[var(--home-muted)] 2xl:my-5 2 xl:my-2">
            {selectedProblem.description}
          </p>

          {/* Examples */}
          {selectedProblem.examples && (
            <div className="w-full bg-[var(--home-surface)] border-0">
              <h4 className="font-semibold mb-2 xl:text-sm 2xl:text-lg">
                Examples
              </h4>
              {selectedProblem.examples.map((ex, idx) => (
                <Card
                  key={idx}
                  className="w-full xl:mb-5 2xl:mb-8 p-1 xl:py-2 xl:px-3 2xl:p-6 rounded xl:text-xs 2xl:text-lg bg-[var(--home-bg)] border-1 border-[var(--home-border)] text-[var(--home-text)]"
                >
                  <div className="flex flex-col gap-2">
                    <p>
                      <strong>Input:</strong>
                    </p>
                    <div>
                      {Object.entries(ex.input).map(([key, value]) => (
                        <p key={key}>
                          {key}: {formatWithCommaSpace(value)}
                        </p>
                      ))}
                    </div>
                  </div>

                  <p>
                    <strong>Output:</strong> {formatWithCommaSpace(ex.output)}
                  </p>
                  <p className="text-[var(--home-accent)]">
                    <strong>Explanation: </strong>
                    {ex.explanation}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
