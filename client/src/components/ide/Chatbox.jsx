import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import ArchiveAlertDialog from "./ArchiveAlertDialog";
import ChatBubble from "./ChatBubble";
import axios from "axios";
import DefaultButton from "@/components/common/DefaultButton";
import usePushToTalk from "@/hooks/usePushToTalk";
import { Mic, MicOff, Plus } from "lucide-react";
import { Resizable } from "re-resizable";

export default function Chatbox({
  code,
  question,
  user,
  problemSlug,
  messages,
  setMessages,
}) {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const { listening, transcript, startListening, stopListening } =
    usePushToTalk();

  //Search for history of messages in supabase
  useEffect(() => {
    if (!problemSlug) return;
    const controller = new AbortController();

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

    return () => controller.abort();
  }, [problemSlug]);

  //Scroll to bottom of chat box when new messages are added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    //Prepare user message and add to messages state for display
    const userMessage = {
      role: "user",
      content: userInput,
      code: code,
    };
    setMessages((prev) => [...prev, userMessage]);

    //Send message to /api/chat endpoint (post request)
    setUserInput("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat/`,
        {
          userMessage: userInput,
          userCode: code,
          question: question,
          problemSlug: problemSlug,
        },
        { withCredentials: true }
      );

      //If response is successful, prepare model response and add to messages state for display
      if (response.status === 200) {
        const modelMessage = {
          role: "model",
          content: response.data.response,
        };
        setMessages((prev) => [...prev, modelMessage]);
      } else {
        console.error("No response from API");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-end border-1 border-t border-[var(--home-border)] p-4">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <ArchiveAlertDialog
          setMessages={setMessages}
          problemSlug={problemSlug}
        />
      </div>

      {/* Chat history */}
      <ScrollArea className="flex-1 min-h-0 bg-[var(--home-surface)]">
        <div className="h-full w-full px-3 py-3 space-y-3">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
          <div ref={bottomRef} /> {/* Dummy div to scroll to bottom */}
        </div>
      </ScrollArea>
      <p>{transcript}</p>
      <p>{listening ? "Listening" : "Not Listening"}</p>

      {/* User chat input */}
      <Resizable
        defaultSize={{ height: "10%" }}
        minHeight="10%"
        maxHeight="100%"
        enable={{ top: true }}
        className="border-t border-[var(--home-border)] pt-3 px-3 flex gap-2 flex-shrink-0 bg-[var(--home-surface)]"
      >
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          className="resize-none h-[100%] flex-1 overflow-auto bg-[var(--home-bg)] border-1 border-[var(--home-border)]"
        />

        <div className="flex flex-row gap-2">
          <DefaultButton
            className="bg-[var(--home-accent)] text-[var(--home-accentText)] hover:bg-[var(--home-accentHover)]"
            onClick={listening ? stopListening : startListening}
          >
            {listening ? <Mic /> : <MicOff />}
          </DefaultButton>

          <DefaultButton
            className="bg-[var(--home-accent)] text-[var(--home-accentText)] hover:bg-[var(--home-accentHover)]"
            onClick={handleSendMessage}
          >
            Send
          </DefaultButton>
        </div>
      </Resizable>
    </div>
  );
}
