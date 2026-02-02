export interface Project {
  id: string;
  title: string;
  script: string;
  createdAt: string;
}

const KEY = "cinementor_active_project";

export function getActiveProject(): Project | null {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function setActiveProject(project: Project) {
  localStorage.setItem(KEY, JSON.stringify(project));
}

export function clearActiveProject() {
  localStorage.removeItem(KEY);
}
