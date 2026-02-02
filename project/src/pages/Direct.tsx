import { useNavigate } from "react-router-dom";
import { Camera, Eye, Grid } from "lucide-react";

export default function Direct() {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Shot List Generator",
      desc: "Create comprehensive shot lists for every scene.",
      icon: Camera,
      path: "/shots",
      bullets: [
        "Establish space with wide shots",
        "Use medium shots for dialogue",
        "Close-ups for emotion",
        "Plan coverage for editing",
      ],
    },
    {
      title: "Camera Angles Guide",
      desc: "Master camera placement and movement.",
      icon: Eye,
      path: "/direct/angles",
      bullets: [
        "Eye level – neutral",
        "Low angle – power",
        "High angle – weakness",
        "Dutch angle – tension",
      ],
    },
    {
      title: "Blocking & Composition",
      desc: "Plan actor movement and framing.",
      icon: Grid,
      path: "/direct/blocking",
      bullets: [
        "Rule of thirds",
        "Leading lines",
        "Depth layers",
        "Negative space",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-4">
        Direct Your Vision
      </h1>
      <p className="text-center text-slate-400 mb-10">
        Master visual language through shot design and composition.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <div
              key={i}
              onClick={() => navigate(tool.path)}
              className="cursor-pointer bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-700 transition hover:scale-105"
            >
              <Icon className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
              <p className="text-slate-400 mb-4">{tool.desc}</p>

              <ul className="text-sm text-slate-300 space-y-1">
                {tool.bullets.map((b, idx) => (
                  <li key={idx}>• {b}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
