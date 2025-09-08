import Editor from "@monaco-editor/react";
import OutputBox from "./OutputBox";
import { useHomeTheme } from "@/context/HomeThemeContext";

export default function CodeEditor({ code, setCode, output }) {
  const { theme } = useHomeTheme();
  {/* Send code to PistonAPI to be executed */}
  return (
    <div className="flex flex-col h-[75%] border-1 border-[var(--home-border)]">
      <div className="flex-1 min-h-0 text-xl">
        <Editor
          height="100%"
          language="python"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            fontSize: 16,
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  );
}
