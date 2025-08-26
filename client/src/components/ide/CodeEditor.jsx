import Editor from "@monaco-editor/react";
import RunButton from "./RunButton";
import { useState } from "react";
import { runPython } from "../../lib/runPython";
import OutputBox from "./OutputBox";

export default function CodeEditor() {
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");

  {/* Send code to PistonAPI to be executed */}
  const handleRun = async () => {
    try {
      const result = await runPython(code);
      setOutput(result.run.stdout);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="h-[60vh] w-[50vw]">
        <Editor
          height="100%"
          language="python"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
        <RunButton handleRun={handleRun} />
      </div>
      <OutputBox output={output} />
    </div>
  );
}
