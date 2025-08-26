import Editor from "@monaco-editor/react";
import { useState } from "react";
import OutputBox from "./OutputBox";

export default function CodeEditor({ code, setCode, output }) {

  {/* Send code to PistonAPI to be executed */}

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[60vh] w-[70vw]">
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
      </div>
      <OutputBox output={output} />
    </div>
  );
}
