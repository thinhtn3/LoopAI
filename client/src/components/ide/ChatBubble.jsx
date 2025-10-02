import React from "react";
import { useHomeTheme } from "../../context/HomeThemeContext.jsx";
import { formatContent } from "../../utils/formatBacktick.jsx";

export default function ChatBubble({ role, content, timestamp }) {
  const isUser = role === "user";
  const { theme } = useHomeTheme();

  const bubbleStyle = {
    backgroundColor: isUser ? theme.colors.bg : theme.colors.bg,
    color: isUser ? "#ffffff" : theme.colors.codeText,
    borderColor: isUser ? theme.colors.border : theme.colors.border,
  };

  const timeStyle = { color: isUser ? "#e5f0ff" : theme.colors.textSecondary };


  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[80%] rounded-xl px-3 py-2 xl:text-xs 2xl:text-sm shadow-sm border"
        style={bubbleStyle}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{formatContent(content)}</p>
        {timestamp && (
          <p className="mt-1" style={timeStyle}>
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </div>
  );
}