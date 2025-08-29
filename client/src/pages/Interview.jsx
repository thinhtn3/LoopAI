import Layout from "../components/layout/Layout";
import CodeEditor from "../components/ide/CodeEditor";
import Chatbox from "../components/ide/Chatbox";
import ThemeSelector from "../components/ide/ThemeSelector";
import { useInterviewTheme } from "../context/InterviewThemeContext";
import { useState } from "react";
import DefaultButton from "@/components/common/DefaultButton";
import { runPython } from "../lib/handleRun";

export default function Interview() {
  const { theme } = useInterviewTheme();
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    //Pass in current code to helper function to compile Python and set output
    const result = await runPython(code);
    setOutput(result.run.stdout);
  };

  return (
    <Layout>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
        }}
      >
        {/* Header with Theme Selector */}
        <div
          className="border-b px-6 py-4 flex items-center justify-between"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
        >
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: theme.colors.text }}
            >
              Technical Interview
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: theme.colors.textSecondary }}
            >
              Practice coding problems with AI assistance
            </p>
          </div>
          <ThemeSelector />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex p-6 space-x-6">
          {/* Code Editor Section */}
          <div
            className="flex-1 flex flex-col rounded-lg border overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b flex items-center justify-between"
              style={{
                backgroundColor: theme.colors.codeBg,
                borderColor: theme.colors.border,
              }}
            >
              <h2
                className="text-lg font-semibold"
                style={{ color: theme.colors.codeText }}
              >
                Code Editor
              </h2>
              <DefaultButton onClick={handleRunCode}>Run</DefaultButton>
            </div>

            {/* Code Editor */}
            <div className="flex-1">
              <CodeEditor code={code} setCode={setCode} output={output} />
            </div>
          </div>

          {/* Chat Section */}
          <div
            className="w-96 flex flex-col rounded-lg border overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
              <h2
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                Bob
              </h2>
            <Chatbox code={code}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}
