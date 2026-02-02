import { useNavigate } from "react-router-dom";
import { FileText, Video, Presentation, Folder, Bot } from "lucide-react";

export default function ToolsHub() {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Script Writer",
      desc: "Write and edit your movie scripts",
      icon: FileText,
      path: "/create",
    },
    {
      title: "Shot Planner",
      desc: "Plan camera shots and scenes",
      icon: Video,
      path: "/shots",
    },
    {
      title: "Pitch Builder",
      desc: "Create a powerful movie pitch",
      icon: Presentation,
      path: "/pitch",
    },
    {
      title: "Project Manager",
      desc: "Manage all your film projects",
      icon: Folder,
      path: "/projects",
    },
    {
      title: "AI Mentor",
      desc: "Ask filmmaking questions",
      icon: Bot,
      path: "/ai",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Explore Filmmaking Tools 🧰
      </h1>
      <p className="text-slate-400 text-center mb-10">
        Choose a tool and start creating cinema
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div
              key={index}
              onClick={() => navigate(tool.path)}
              className="cursor-pointer bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-700 transition hover:scale-105"
            >
              <Icon className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="text-xl font-bold mb-1">
                {tool.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {tool.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
