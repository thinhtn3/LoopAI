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
import { Resizable } from "re-resizable";
import { useAuth } from "@/hooks/useAuth.jsx";
import axios from "axios";

export default function Interview() {
  const { theme } = useHomeTheme();
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const problemSlug = searchParams.get("slug");
  const ranRef = useRef(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);


  const fetchQuestion = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/chat/paraphrase?slug=${problemSlug}`
    );
    setSelectedProblem(response.data.question);
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  useEffect(() => {
    console.log("useEffect");
    if (!problemSlug) return;

    const url = `${import.meta.env.VITE_API_URL}/api/chat/history`;
    console.log("history start", { problemSlug, url });

    axios
      .get(url, {
        withCredentials: true,
        params: { problemSlug },
      })
      .then((res) => {
        console.log("history ok", res.status);
        if (res.status === 200) {
          setMessages(res.data.history);
        }
      })
      .catch((err) => {
        console.error("history error", err?.response?.status, err?.message);
      });
  }, [problemSlug]);

  useEffect(() => {
    const fetchSessionId = async () => {
      if (!user) return;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/`,
        { problemSlug: problemSlug },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Session id fetched");
      } else {
        console.log("Error fetching session id");
      }
    };
    fetchSessionId();
  }, [problemSlug]);

  useEffect(() => {
    // if (ranRef.current) return;
    // ranRef.current = true;
    if (!problemSlug) return;
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
        <Resizable
          defaultSize={{
            width: "20vw",
            height: "100%",
          }}
          minWidth="20vw"
          maxWidth="50vw"
          minHeight="100%"
          className="flex flex-col  border-0 overflow-hidden bg-[var(--home-surface)]"
        >
          {selectedProblem ? (
            <QuestionDisplay selectedProblem={selectedProblem} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Loading question...
              </p>
            </div>
          )}
        </Resizable>

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
              className="bg-[var(--home-accent)] text-[var(--home-accentText)] hover:bg-[var(--home-accentHover)] xl:text-sm 2xl:text-lg"
            >
              <Play /> Run
            </DefaultButton>
          </div>

          {/* Code Editor */}
          <div className="h-full flex flex-col min-h-0">
            <CodeEditor code={code} setCode={setCode} output={output} />
            <Resizable
              defaultSize={{ width: "100%", height: "25%" }}
              minHeight="0%"
              maxHeight="80%"
              enable={{ top: true }}
              className="overflow-hidden flex-shrink-0"
            >
              <OutputBox output={output} />
            </Resizable>
          </div>
        </div>

        {/* Chat Section */}
        <Resizable
          defaultSize={{
            width: "20vw",
            height: "100%",
          }}
          minWidth="20vw"
          maxWidth="50vw"
          minHeight="100%"
          className="flex flex-col border-0 overflow-hidden bg-[var(--home-surface)]"
        >
          <div className="flex-1 min-h-0">
            {selectedProblem ? (
              <Chatbox
                key={`${problemSlug}`}
                code={code}
                question={selectedProblem}
                user={user}
                problemSlug={problemSlug}
                messages={messages}
                setMessages={setMessages}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Loading question...
                </p>
              </div>
            )}
          </div>
        </Resizable>
      </div>
    </div>
  );
}
