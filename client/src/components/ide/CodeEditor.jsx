import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, output, fontSize }) {
  {/* Send code to PistonAPI to be executed */}
  return (
    <div className="flex flex-col h-full min-h-0 border-0">
      <div className="flex-1 min-h-0 text-xl">
        <Editor
          height="100%"
          language="python"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
          options={{
            fontSize: fontSize,
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  );
}
