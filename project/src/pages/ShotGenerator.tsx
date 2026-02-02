import { useState } from "react";

interface Shot {
  title: string;
  camera: string;
  description: string;
  purpose: string;
}

export default function ShotGenerator() {
  const [scene, setScene] = useState("");
  const [shots, setShots] = useState<Shot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateShots = async () => {
    if (scene.trim().length < 10) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/ai/shotlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sceneText: scene })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate shots");
        setLoading(false);
        return;
      }

      setShots(data.shots);
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    const res = await fetch("http://localhost:5000/api/shotlist/export/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shots,
        projectTitle: "CineMentor Shot List"
      })
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Shot_List.pdf";
    a.click();
  };

  const exportCSV = async () => {
    const res = await fetch("http://localhost:5000/api/shotlist/export/csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shots,
        projectTitle: "CineMentor Shot List"
      })
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Shot_List.csv";
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Shot List Generator 🎬</h1>

      <textarea
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        placeholder="Describe your scene..."
        className="w-full h-32 p-4 rounded bg-slate-800 border border-slate-700"
      />

      <button
        onClick={generateShots}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Shots"}
      </button>

      {error && (
        <p className="mt-4 text-red-400">⚠️ {error}</p>
      )}

      {/* SHOT LIST OUTPUT */}
      <div className="mt-6 space-y-4">
        {shots.map((shot, index) => (
          <div
            key={index}
            className="p-4 rounded bg-slate-800 border border-slate-700"
          >
            <h3 className="font-bold text-lg">{index + 1}. {shot.title}</h3>
            <p><b>Camera:</b> {shot.camera}</p>
            <p><b>Description:</b> {shot.description}</p>
            <p className="text-blue-300"><b>Purpose:</b> {shot.purpose}</p>
          </div>
        ))}
      </div>

      {shots.length > 0 && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={exportPDF}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Export PDF
          </button>

          <button
            onClick={exportCSV}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
          >
            Export CSV
          </button>
        </div>
      )}
    </div>
  );
}
