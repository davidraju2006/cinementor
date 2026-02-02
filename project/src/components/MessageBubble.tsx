interface Message {
  role: "user" | "ai";
  text: string;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`max-w-[80%] p-3 rounded-lg ${
        message.role === "user"
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-slate-700 text-slate-200"
      }`}
      style={{ whiteSpace: 'pre-line' }}
    >
      {message.text}
    </div>
  );
}
