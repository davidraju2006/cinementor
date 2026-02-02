import { NavLink } from "react-router-dom";
import { Film, GraduationCap, Pencil, Video, Presentation, Folder } from "lucide-react";
import { Bot } from "lucide-react";


export default function Navigation() {
  const navItems = [
    { path: "/", label: "Home", icon: Film },
    { path: "/learn", label: "Learn", icon: GraduationCap },
    { path: "/create", label: "Create", icon: Pencil },
    { path: "/direct", label: "Direct", icon: Video },
    { path: "/pitch", label: "Pitch", icon: Presentation },
    { path: "/projects", label: "Projects", icon: Folder },
    { path: "/ai", label: "AI Mentor", icon: Bot },
    { path: "/shots", label: "Shot List", icon: Video }

  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">CineMentor</span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
