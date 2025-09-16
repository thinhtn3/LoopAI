import CodeEditor from "../components/ide/CodeEditor";
import Chatbox from "../components/ide/Chatbox";
import { useHomeTheme } from "@/context/HomeThemeContext";
import { useState, useEffect, useRef } from "react";
import DefaultButton from "@/components/common/DefaultButton";
import { runPython } from "../lib/handleRun";
import QuestionDisplay from "../components/ide/QuestionDisplay";
import OutputBox from "../components/ide/OutputBox";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function Interview({ user, isLoading }) {
  const { theme } = useHomeTheme();
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const ranRef = useRef(false);
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/chat/paraphrase?slug=${slug}`
    );
    setSelectedProblem(response.data.question);
  };



  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/auth");
    }
  }, [user, isLoading]);

  useEffect(() => {
    const fetchSessionId = async () => {
      if (!user) return;
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/`, { userId: user.id, problemSlug: slug });
      if (response.status === 200) {
        localStorage.setItem("sessionId", response.data.session);
      } else {
        console.error("Error fetching session id");
      }
    };
    fetchSessionId();
  }, [user]);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    fetchQuestion();
  }, []);

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
      <Navbar user={user} />
      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Question Display Section */}
        <div className="w-[20vw] flex flex-col  border-0 overflow-hidden bg-[var(--home-surface)]">
          {selectedProblem ? (
            <QuestionDisplay selectedProblem={selectedProblem} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Loading question...
              </p>
            </div>
          )}
        </div>

        {/* Code Editor Section */}
        <div
          className="flex-1 flex flex-col border-yellow-900 overflow-hidden"
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
            <DefaultButton
              onClick={handleRunCode}
              className="bg-[var(--home-accent)] text-[var(--home-accentText)] w-1/16 hover:bg-[var(--home-accentHover)] xl:text-sm 2xl:text-lg xl:w-1/12 2xl:w-1/16"
            >
              <Play /> Run
            </DefaultButton>
          </div>

          {/* Code Editor */}
          <div className="flex flex-col h-full">
            <CodeEditor code={code} setCode={setCode} output={output} />
            <OutputBox output={output} />
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-[20vw] flex flex-col border-0 overflow-hidden bg-[var(--home-surface)]">
          <div className="flex-1 min-h-0">
            {selectedProblem ? (
              <Chatbox code={code} question={selectedProblem} user={user} problemSlug={slug} />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Loading question...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
