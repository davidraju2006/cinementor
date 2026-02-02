import { useEffect, useState } from "react";
import {
  getActiveProject,
  setActiveProject,
  Project,
} from "../utils/activeProject";

export default function Create() {
  const [title, setTitle] = useState("");
  const [script, setScript] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProjectState] = useState<Project | null>(null);

  /* ================================
     LOAD PROJECTS + ACTIVE PROJECT
  ================================ */
  useEffect(() => {
    const stored = localStorage.getItem("cinementor_projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    }

    const active = getActiveProject();
    if (active) {
      setActiveProjectState(active);
      setTitle(active.title);
      setScript(active.script);
    }
  }, []);

  /* ================================
     SAVE / UPDATE PROJECT
  ================================ */
  const saveProject = () => {
    if (!title.trim() || !script.trim()) {
      alert("Please enter title and script");
      return;
    }

    let updatedProjects: Project[];
    let projectToSave: Project;

    if (activeProject) {
      // 🔄 UPDATE EXISTING PROJECT
      projectToSave = {
        ...activeProject,
        title,
        script,
      };

      updatedProjects = projects.map((p) =>
        p.id === activeProject.id ? projectToSave : p
      );
    } else {
      // ➕ CREATE NEW PROJECT
      projectToSave = {
        id: Date.now().toString(),
        title,
        script,
        createdAt: new Date().toLocaleString(),
      };

      updatedProjects = [projectToSave, ...projects];
    }

    // Save to localStorage
    setProjects(updatedProjects);
    localStorage.setItem(
      "cinementor_projects",
      JSON.stringify(updatedProjects)
    );

    // Set as active project (GLOBAL)
    setActiveProject(projectToSave);
    setActiveProjectState(projectToSave);

    alert("Project saved successfully 🎬");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Create Script ✍️</h1>

      {/* Project Title */}
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Script Editor */}
      <textarea
        placeholder="Write your script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
        rows={12}
        className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Save Button */}
      <button
        onClick={saveProject}
        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
      >
        {activeProject ? "Update Script" : "Save Script"}
      </button>

      {/* Saved Projects Preview */}
      {projects.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Saved Projects 📁</h2>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-4 rounded border ${
                  activeProject?.id === project.id
                    ? "bg-slate-700 border-blue-500"
                    : "bg-slate-800 border-slate-700"
                }`}
              >
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm text-slate-400">
                  {project.createdAt}
                </p>
                <p className="mt-2 text-slate-300 line-clamp-2">
                  {project.script}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
