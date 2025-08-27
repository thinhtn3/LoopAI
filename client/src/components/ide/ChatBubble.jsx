import React from "react";
import { useInterviewTheme } from "../../context/InterviewThemeContext.jsx";

// Basic chat bubble component for Interview theme
// role: "user" | "assistant"
// props: { role, content, timestamp }
export default function ChatBubble({ role, content, timestamp }) {
  const isUser = role === "user";
  const { theme } = useInterviewTheme();

  const bubbleStyle = {
    backgroundColor: isUser ? theme.colors.chatUser : theme.colors.chatAI,
    color: isUser ? "#ffffff" : theme.colors.codeText,
    borderColor: isUser ? theme.colors.chatUser : theme.colors.border,
    boxShadow: theme.shadows.sm,
  };

  const timeStyle = {
    color: isUser ? "#e5f0ff" : theme.colors.textSecondary,
  };

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[80%] rounded-xl px-3 py-2 text-sm shadow-sm border"
        style={bubbleStyle}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        {timestamp && (
          <p className="mt-1 text-[11px]" style={timeStyle}>
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </div>
  );
}


