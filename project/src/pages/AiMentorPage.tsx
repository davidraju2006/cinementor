import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { getActiveProject } from "../utils/activeProject";
import MessageBubble from "../components/MessageBubble";
import QuickPrompts from "../components/QuickPrompts";

interface Message {
  role: "user" | "ai";
  text: string;
}

/* ===============================
   API BASE URL
================================ */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AiMentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text:
        "🎬 Hi Director! I’m your AI Mentor. Ask me about scripts, shots, direction, or pitch."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* ===============================
     LOAD ACTIVE PROJECT ONCE
  ================================ */
  useEffect(() => {
    const active = getActiveProject();
    if (active?.title) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `🎬 Active Project: "${active.title}". You can ask questions about this project.`
        }
      ]);
    }
  }, []);

  /* ===============================
     SEND MESSAGE (STREAMING)
  ================================ */
  const sendMessage = async (messageText?: string) => {
    const text = (messageText ?? input).trim();
    if (!text || loading) return;

    // Push user message + placeholder AI message
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "ai", text: "" }
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/ai/mentor/stream`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            context: "general",
            projectData: getActiveProject()
          })
        }
      );

      /* ---------- Handle HTTP errors ---------- */
      if (!response.ok) {
        let errorText = "❌ AI Mentor is currently unavailable. Please try again later.";

        if (response.status === 402) {
          errorText =
            "⚠️ AI credits are exhausted.\n\nYou can continue using CineMentor, but AI responses are temporarily unavailable.";
        } else if (response.status === 429) {
          errorText =
            "⏱️ Too many requests right now. Please wait a moment and try again.";
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = errorText;
          return updated;
        });
        return;
      }

      /* ---------- Stream reading ---------- */
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No stream reader available");
      }

      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        accumulatedText += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = accumulatedText;
          return updated;
        });
      }

    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text =
          "❌ Unable to connect to AI Mentor. Please check your network or server.";
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     AUTO-SCROLL ON NEW MESSAGE
  ================================ */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     RENDER
  ================================ */
  return (
    <div className="max-w-4xl mx-auto p-6 text-white h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">AI Mentor 🤖🎬</h1>

      <div className="flex-1 overflow-y-auto bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <QuickPrompts onSendMessage={sendMessage} />

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            loading
              ? "AI Mentor is thinking..."
              : "Ask your cinema doubt..."
          }
          disabled={loading}
          className="flex-1 p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="px-4 bg-blue-600 hover:bg-blue-700 rounded flex items-center disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
