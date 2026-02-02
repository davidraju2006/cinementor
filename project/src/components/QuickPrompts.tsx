interface QuickPromptsProps {
  onSendMessage: (message: string) => void;
}

const prompts = [
  "How to direct actors for emotional scenes?",
  "Best camera angles for action sequences?",
  "Tips for writing a compelling script?",
  "Budgeting for indie films?",
];

export default function QuickPrompts({ onSendMessage }: QuickPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={() => onSendMessage(prompt)}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
