import { useNavigate } from "react-router-dom";

export default function LearnCTA() {
  const navigate = useNavigate();

  return (
    <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 p-10 text-center text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Create Your First Film?
      </h2>

      <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
        Turn your ideas into scenes, scripts, and shots.  
        Start building your story step-by-step with CineMentor tools.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/create")}
          className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:scale-105 transition"
        >
          Start My First Project 🎬
        </button>

        <button
          onClick={() => navigate("/tools")}
          className="bg-black/20 border border-white/40 px-8 py-3 rounded-lg hover:bg-black/30 transition"
        >
          Explore Tools 🧰
        </button>
      </div>
    </div>
  );
}
