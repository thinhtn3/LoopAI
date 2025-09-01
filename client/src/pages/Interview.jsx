import Layout from "../components/layout/Layout";
import CodeEditor from "../components/ide/CodeEditor";
import Chatbox from "../components/ide/Chatbox";
import ThemeSelector from "../components/ide/ThemeSelector";
import { useInterviewTheme } from "../context/InterviewThemeContext";
import { useState } from "react";
import DefaultButton from "@/components/common/DefaultButton";
import { runPython } from "../lib/handleRun";
import QuestionDisplay from "../components/ide/QuestionDisplay";
import { questionBank } from "../constants/questionBank";
import OutputBox from "../components/ide/OutputBox";

export default function Interview() {
  const { theme } = useInterviewTheme();
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(questionBank[0]); // Default question, object from questionBank

  const handleRunCode = async () => {
    //Pass in current code to helper function to compile Python and set output
    const result = await runPython(code);
    setOutput(result.run.stdout);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
        {/* Main Content */}
        <div className="flex-1 flex min-h-0">
          {/* Question Display Section */}
          <div className="w-[20vw] flex flex-col border overflow-hidden">
            <QuestionDisplay selectedProblem={selectedProblem} />
          </div>

          {/* Code Editor Section */}
          <div
            className="flex-1 flex flex-col border overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b flex items-center justify-between flex-shrink-0"
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
            <div className="flex flex-col h-full">
              <CodeEditor code={code} setCode={setCode} output={output} />
              <OutputBox output={output} />
            </div>
          </div>

          {/* Chat Section */}
          <div
            className="w-[20vw] flex flex-col border overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }}
          >
            <h2
              className="px-4 py-3 border-b flex-shrink-0 text-lg font-semibold"
              style={{ color: theme.colors.text }}
            >
              Bob
            </h2>
            <div className="flex-1 min-h-0">
              <Chatbox code={code} question={selectedProblem}/>
            </div>
          </div>
        </div>
    </div>
  );
}
