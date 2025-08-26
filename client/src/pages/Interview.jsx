import Layout from "../components/layout/Layout";
import CodeEditor from "../components/ide/CodeEditor";
import RunButton from "../components/ide/RunButton";
import Chatbox from "../components/ide/Chatbox";
import ThemeSelector from "../components/ide/ThemeSelector";
import { useInterviewTheme } from "../context/InterviewThemeContext";
import { useState } from "react";

export default function Interview() {
  const { theme } = useInterviewTheme();
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");

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
              <RunButton code={code} setOutput={setOutput} />
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
            <div
              className="px-4 py-3 border-b"
              style={{
                backgroundColor: theme.colors.chatBg,
                borderColor: theme.colors.border,
              }}
            >
              <h2
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                AI Interviewer
              </h2>
            </div>
            <div className="flex-1">
              <Chatbox />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
