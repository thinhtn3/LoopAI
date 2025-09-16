import { ScrollArea } from "@/components/ui/scroll-area";
import { useHomeTheme } from "@/context/HomeThemeContext";
export default function OutputBox({ output }) {
  return (
    <div className="flex flex-col h-full w-full overflow-y-scroll">
      {/* Header */}

      {/* Output Content */}
      <ScrollArea className="flex-1 rounded-b-md p-2 border-1 border-[var(--home-border)]">
        <h3 className="xl:text-sm 2xl:text-lg font-medium text-[var(--home-muted)]">Output</h3>
        <div className="py-2">
          {output && (
            <pre className="xl:text-sm 2xl:text-lg font-mono text-[var(--home-text)] whitespace-pre-wrap leading-relaxed">
              {output}{" "}
            </pre>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
