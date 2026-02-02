import { useNavigate } from "react-router-dom";

const genres = [
  { id: "horror", title: "Horror", desc: "Fear, suspense, darkness", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "comedy", title: "Comedy", desc: "Humor, timing, fun", image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "action", title: "Action", desc: "Stunts, fights, energy", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "love", title: "Love", desc: "Emotions & relationships", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "romance", title: "Romance", desc: "Feelings & connection", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "adventure", title: "Adventure", desc: "Journey & exploration", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: "animation", title: "Animation", desc: "Lion King, Moana style", image: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
];

export default function GenreSelect() {
  const navigate = useNavigate();

  const selectGenre = (genreId: string) => {
    localStorage.setItem("cinementor_genre", genreId);
    navigate("/learn");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Choose Your Cinema Style 🎬
      </h1>
      <p className="text-slate-400 text-center mb-10">
        Learning will be customized based on the cinema type you choose
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((g) => (
          <div
            key={g.id}
            onClick={() => selectGenre(g.id)}
            className="cursor-pointer bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-700 transition hover:scale-105"
          >
            <img src={g.image} alt={g.title} className="w-16 h-16 mb-3 rounded" />
            <h3 className="text-xl font-bold mb-1">{g.title}</h3>
            <p className="text-slate-400 text-sm">{g.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
