import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import axios from "axios";

export default function Chatbox({ codeContext }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    //Scroll to bottom of chat box when new messages are added
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;
    setIsLoading(true);

    //Prepare user message and add to messages
    const userMessage = {
      role: "user",
      content: userInput,
      codeContext: codeContext,
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
          sessionId: sessionId,
        }
      );

      //If response is successful, prepare model response and add to messages
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
    <div className="w-full max-w-md h-[70vh] border rounded-md flex flex-col">
      {/* Chat history */}
      <ScrollArea className="flex-1 min-h-0">
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
      <div className="border-t p-3 flex gap-2">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          className="resize-none h-12 max-h-28 flex-1 overflow-auto"
        />
        <Button onClick={handleSendMessage} className="shrink-0">
          Send
        </Button>
      </div>
    </div>
  );
}
