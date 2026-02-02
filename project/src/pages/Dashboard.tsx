import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Folder, Video, Bot, Plus } from "lucide-react";

interface Project {
  id: string;
  title: string;
  script: string;
  createdAt: string;
}

export default function Dashboard() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const active = localStorage.getItem("cinementor_active_project");
    if (active) {
      setActiveProject(JSON.parse(active));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard 🎬</h1>

      {/* Active Project */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Active Project</h2>

        {activeProject ? (
          <>
            <h3 className="text-lg font-bold">{activeProject.title}</h3>
            <p className="text-slate-400 text-sm">
              Created: {activeProject.createdAt}
            </p>

            <div className="flex gap-3 mt-4">
              <Link
                to="/create"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
              >
                <FileText size={18} /> Continue Writing
              </Link>

              <Link
                to="/shots"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded flex items-center gap-2"
              >
                <Video size={18} /> Generate Shots
              </Link>
            </div>
          </>
        ) : (
          <p className="text-slate-400">
            No active project. Create or open one.
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/create"
          className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-700 transition"
        >
          <Plus className="mb-2" />
          <h3 className="font-bold">Create Script</h3>
          <p className="text-sm text-slate-400">Start a new story</p>
        </Link>

        <Link
          to="/projects"
          className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-700 transition"
        >
          <Folder className="mb-2" />
          <h3 className="font-bold">My Projects</h3>
          <p className="text-sm text-slate-400">View saved scripts</p>
        </Link>

        <Link
          to="/shots"
          className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-700 transition"
        >
          <Video className="mb-2" />
          <h3 className="font-bold">Shot List</h3>
          <p className="text-sm text-slate-400">Plan camera shots</p>
        </Link>

        <Link
          to="/ai"
          className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-700 transition"
        >
          <Bot className="mb-2" />
          <h3 className="font-bold">AI Mentor</h3>
          <p className="text-sm text-slate-400">Ask cinema questions</p>
        </Link>
      </div>
    </div>
  );
}
