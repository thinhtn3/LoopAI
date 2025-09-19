import { useState, useRef } from "react";

export default function usePushToTalk() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const listeningRef = useRef(false); // <-- NEW

  // Initialize once
  if (!recognitionRef.current && "webkitSpeechRecognition" in window) {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += chunk; // permanent
        } else {
          interimText += chunk; // temporary preview
        }
      }

      // Append only *final* chunks
      if (finalText) {
        setTranscript((prev) => (prev + " " + finalText).trim());
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setListening(false);
      listeningRef.current = false;
    };

    recognition.onend = () => {
      if (listeningRef.current) {
        console.log("⏳ Restarting recognition...");
        recognition.start(); // auto-restart
      } else {
        console.log("🛑 Recognition stopped by user.");
        setListening(false);
      }
    };

    recognitionRef.current = recognition;
  }

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      listeningRef.current = true;
      recognitionRef.current.start();
      setTranscript("");
      setListening(true);
    }
  };

  const stopListening = () => {
    listeningRef.current = false;
    recognitionRef.current?.stop();
    setListening(false);
  };

  return { listening, transcript, startListening, stopListening };
}
