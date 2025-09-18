import CodeEditor from "../components/ide/CodeEditor";
import Chatbox from "../components/ide/Chatbox";
import DefaultButton from "@/components/common/DefaultButton";
import QuestionDisplay from "../components/ide/QuestionDisplay";
import OutputBox from "../components/ide/OutputBox";
import Navbar from "@/components/common/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { runPython } from "../lib/handleRun";
import { useSearchParams } from "react-router-dom";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Resizable } from "re-resizable";
import { useAuth } from "@/hooks/useAuth.jsx";

export default function Interview() {
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const problemSlug = searchParams.get("slug");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  //Fetch question from database after paraphrasing
  const fetchQuestion = async () => {
    // const response = await axios.get(
    //   `${import.meta.env.VITE_API_URL}/api/chat/paraphrase?slug=${problemSlug}`
    // );
    // setSelectedProblem(response.data.question);

    //placeholder for selected problem
    setSelectedProblem({
      title: "Hello",
      description: "Hello",
      difficulty: "Easy",
      tags: ["Array", "String"],
    });
  };

  //Redirect to auth if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  //Create session if session for this slug does not exist
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
      }
    };
    fetchSessionId();
  }, [problemSlug]);


  useEffect(() => {
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
      className="h-screen w-screen flex flex-col overflow-hidden bg-[var(--home-bg)] text-[var(--home-text)]"
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
          className="flex-1 flex flex-col overflow-hidden bg-[var(--home-surface)] border border-[var(--home-border)]"
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b flex items-center justify-between flex-shrink-0 bg-[var(--home-surface)] border border-[var(--home-border)]"
          >
            <h2
              className="text-lg font-semibold text-[var(--home-text)]"
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
                key={problemSlug}
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
