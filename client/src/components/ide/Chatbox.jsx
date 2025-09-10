import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import axios from "axios";
import DefaultButton from "@/components/common/DefaultButton";

export default function Chatbox({ code, question }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    "Type here to start a conversation with LoopAI!",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));
  const bottomRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  //Search for history of messages in supabase
  useEffect(() => {
    const searchHistory = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/chat/history`,
        {
          params: {
            sessionId: sessionId,
          },
        }
      );
      if (response.status === 200) {
        console.log("History:", response.data);
        setMessages(response.data.history);
      }
    };

    if (sessionId) {
      searchHistory();
    }
  }, [sessionId]);

  useEffect(() => {
    console.log("Messages:", messages);
  }, [messages]);

  //Scroll to bottom of chat box when new messages are added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;
    setIsLoading(true);

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
          userId: user.userId,
          userCode: code,
          question: question,
        }
      );

      //If response is successful, prepare model response and add to messages state for display
      if (response.status === 200) {
        const modelMessage = {
          role: "model",
          content: response.data.response,
        };
        setMessages((prev) => [...prev, modelMessage]);
        if (!sessionId && response.data.sessionId) {
          setSessionId(response.data.sessionId);
        }
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

      {/* User chat input */}
      <div className="border-t border-[var(--home-border)] p-3 flex gap-2 flex-shrink-0 bg-[var(--home-surface)]">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          className="resize-none h-12 max-h-28 flex-1 overflow-auto bg-[var(--home-bg)] border-1 border-[var(--home-border)]"
        />
        <DefaultButton
          className="bg-[var(--home-accent)] text-[var(--home-accentText)]"
          onClick={handleSendMessage}
        >
          Send
        </DefaultButton>
      </div>
    </div>
  );
}
