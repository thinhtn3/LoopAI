import Editor from "@monaco-editor/react";
import OutputBox from "./OutputBox";
import { useHomeTheme } from "@/context/HomeThemeContext";

export default function CodeEditor({ code, setCode, output }) {
  {/* Send code to PistonAPI to be executed */}
  return (
    <div className="flex flex-col h-full min-h-0">
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
