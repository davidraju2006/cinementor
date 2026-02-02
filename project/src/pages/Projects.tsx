import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setActiveProject } from "../utils/activeProject";


interface Project {
  id: string;
  title: string;
  script: string;
  createdAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("cinementor_projects");
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  const deleteProject = (id: string) => {
    if (!confirm("Delete this project?")) return;

    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("cinementor_projects", JSON.stringify(updated));
  };

  const openProject = (project: Project) => {
  setActiveProject(project);
  navigate("/create");
  };


  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">My Projects 📁</h1>

      {projects.length === 0 ? (
        <p className="text-slate-400">No projects yet. Create one first.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-sm text-slate-400">{project.createdAt}</p>

              <p className="mt-2 text-slate-300 line-clamp-3">
                {project.script}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openProject(project)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Open / Edit
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
