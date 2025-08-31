import Editor from "@monaco-editor/react";
import { useState } from "react";
import OutputBox from "./OutputBox";

export default function CodeEditor({ code, setCode, output }) {

  {/* Send code to PistonAPI to be executed */}
  return (
    <div className="flex flex-col h-[75%]">
      <div className="flex-1 min-h-0">
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
    </div>
  );
}
