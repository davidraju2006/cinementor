import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const homeCards = [
    {
      step: 1,
      title: "Learn",
      desc: "Master cinema fundamentals",
      path: "/learn/genre",
      color: "bg-emerald-500",
    },
    {
      step: 2,
      title: "Create",
      desc: "Build your script & scenes",
      path: "/create",
      color: "bg-blue-500",
    },
    {
      step: 3,
      title: "Direct",
      desc: "Plan shots & direction",
      path: "/shots",
      color: "bg-purple-500",
    },
    {
      step: 4,
      title: "Pitch",
      desc: "Present your vision",
      path: "/pitch",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Your Complete Filmmaking Guide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master the Art of
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Filmmaking
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Learn everything from script writing to post-production. Your journey from aspiring filmmaker
            to professional storyteller starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button
              onClick={() => navigate("/learn/genre")}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/tools")}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105"
            >
              Explore Tools
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {homeCards.map((card) => (
              <div
                key={card.step}
                onClick={() => navigate(card.path)}
                className="cursor-pointer bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-6 hover:bg-slate-700 transition-all hover:scale-105"
              >
                <div
                  className={`w-12 h-12 ${card.color} rounded-lg mb-4 flex items-center justify-center text-xl font-bold text-white`}
                >
                  {card.step}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
