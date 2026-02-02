import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

interface Actor {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];

export default function Blocking() {
  const [actors, setActors] = useState<Actor[]>([
    {
      id: crypto.randomUUID(),
      name: "A",
      x: 50,
      y: 50,
      color: COLORS[0],
    },
  ]);
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [showGuides, setShowGuides] = useState(false);
  const camera = { x: 50, y: 80 };
  const [balanceHint, setBalanceHint] = useState("");
  const canvasRef = useRef<HTMLDivElement>(null);

  const addActor = () => {
    const newActor: Actor = {
      id: crypto.randomUUID(),
      name: String.fromCharCode(65 + actors.length), // A, B, C...
      x: 200 + actors.length * 20,
      y: 150,
      color: COLORS[actors.length % COLORS.length],
    };
    setActors((prev) => [...prev, newActor]);
  };

  const startDrag = (id: string, e: React.MouseEvent) => {
    const actor = actors.find((a) => a.id === id);
    if (!actor) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - rect.left - (actor.x / 400 * rect.width);
    const offsetY = e.clientY - rect.top - (actor.y / 300 * rect.height);
    setDragging({ id, offsetX, offsetY });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left - dragging.offsetX) / rect.width) * 400;
    const y = ((e.clientY - rect.top - dragging.offsetY) / rect.height) * 300;
    setActors((prev) =>
      prev.map((a) =>
        a.id === dragging.id ? { ...a, x: Math.max(0, Math.min(400, x)), y: Math.max(0, Math.min(300, y)) } : a
      )
    );
  };

  const onMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    // Calculate balance
    if (actors.length < 2) {
      setBalanceHint("");
      return;
    }
    const leftCount = actors.filter((a) => a.x < 200).length;
    const rightCount = actors.filter((a) => a.x > 200).length;
    if (leftCount > rightCount + 1) {
      setBalanceHint("⚠ Composition feels left-heavy. 💡 Consider moving an actor to the right.");
    } else if (rightCount > leftCount + 1) {
      setBalanceHint("⚠ Composition feels right-heavy. 💡 Consider moving an actor to the left.");
    } else {
      setBalanceHint("");
    }
  }, [actors]);

  const askAI = async () => {
    const payload = {
      actors: actors.map((a) => ({ name: a.name, x: a.x, y: a.y })),
      camera: "eye-level",
      intent: "general blocking",
    };
    const message = `Analyze this blocking setup: ${JSON.stringify(payload)}`;
    try {
      const response = await fetch("http://localhost:5000/api/ai-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      alert(data.reply || "AI feedback received!");
    } catch (error) {
      console.error("AI request failed", error);
    }
  };

  const exportDiagram = async () => {
    if (!canvasRef.current) return;
    const canvas = await html2canvas(canvasRef.current);
    const link = document.createElement("a");
    link.download = "blocking-diagram.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Blocking & Composition 🧩</h1>

      <div className="flex gap-4 mb-4">
        <button onClick={addActor} className="bg-green-600 px-4 py-2 rounded">
          Add Actor
        </button>
        <button onClick={() => setShowGuides(!showGuides)} className="bg-blue-600 px-4 py-2 rounded">
          {showGuides ? "Hide" : "Show"} Composition Guides
        </button>
        <button onClick={askAI} className="bg-purple-600 px-4 py-2 rounded">
          Ask AI about this blocking
        </button>
        <button onClick={exportDiagram} className="bg-orange-600 px-4 py-2 rounded">
          Export Diagram
        </button>
      </div>

      {balanceHint && <p className="mb-4 text-yellow-400">{balanceHint}</p>}

      <div
        ref={canvasRef}
        className="relative w-full h-96 bg-slate-800 border border-slate-700 rounded cursor-move"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {showGuides && (
          <>
            {/* Rule of Thirds */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-0 w-full h-px bg-white opacity-30"></div>
              <div className="absolute top-2/3 left-0 w-full h-px bg-white opacity-30"></div>
              <div className="absolute left-1/3 top-0 w-px h-full bg-white opacity-30"></div>
              <div className="absolute left-2/3 top-0 w-px h-full bg-white opacity-30"></div>
            </div>
          </>
        )}

        {/* Camera POV */}
        <div
          className="absolute text-2xl"
          style={{ left: `${camera.x}%`, bottom: "10px", transform: "translateX(-50%)" }}
        >
          📹
        </div>

        {actors.map((actor) => (
          <div
            key={actor.id}
            onMouseDown={(e) => startDrag(actor.id, e)}
            className="absolute w-5 h-5 rounded-full cursor-move flex items-center justify-center text-xs font-bold"
            style={{
              left: `${(actor.x / 400) * 100}%`,
              top: `${(actor.y / 300) * 100}%`,
              backgroundColor: actor.color,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="absolute -top-6 text-white text-xs">{actor.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
