import { BookOpen, Camera, Lightbulb, Users, Film, Scissors, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LearnSection() {
  const navigate = useNavigate();
  const genre = localStorage.getItem("cinementor_genre");

  const learningPaths = [
    {
      level: 'Beginner',
      color: 'from-green-500 to-emerald-500',
      topics: [
        { id: 'story', icon: BookOpen, title: 'Story & Script Basics', description: 'Learn the fundamentals of storytelling, story structure, character development, and basic screenplay formatting.' },
        { id: 'camera', icon: Camera, title: 'Camera Fundamentals', description: 'Understand camera types, basic shot compositions, framing, and the rule of thirds.' },
        { id: 'lighting', icon: Lightbulb, title: 'Lighting Basics', description: 'Master three-point lighting, natural vs artificial light, and basic lighting setups.' },
        { id: 'actors', icon: Users, title: 'Working with Actors', description: 'Learn how to communicate with actors, basic direction techniques, and getting natural performances.' },
      ],
    },
    {
      level: 'Intermediate',
      color: 'from-blue-500 to-cyan-500',
      topics: [
        { id: 'adv-cinematography', icon: Film, title: 'Advanced Cinematography', description: 'Master camera movement, lens selection, depth of field, color theory, and visual storytelling.' },
        { id: 'screenplay-development', icon: BookOpen, title: 'Screenplay Development', description: 'Write compelling dialogue, develop complex characters, master scene structure and pacing.' },
        { id: 'adv-lighting', icon: Lightbulb, title: 'Advanced Lighting', description: 'Create mood through lighting, practical vs studio lighting, lighting for different genres.' },
        { id: 'editing-fundamentals', icon: Scissors, title: 'Editing Fundamentals', description: 'Learn editing software, continuity editing, pacing, rhythm, and basic color grading.' },
      ],
    },
    {
      level: 'Advanced',
      color: 'from-violet-500 to-purple-500',
      topics: [
        { id: 'directing-vision', icon: Award, title: 'Directing Vision', description: 'Develop your unique visual style, shot design, blocking actors, and managing complex scenes.' },
        { id: 'production-management', icon: Film, title: 'Production Management', description: 'Budget management, scheduling, crew management, location scouting, and permits.' },
        { id: 'post-production-mastery', icon: Scissors, title: 'Post-Production Mastery', description: 'Advanced editing techniques, color grading workflows, sound design, and VFX integration.' },
        { id: 'distribution-strategy', icon: Award, title: 'Distribution & Festival Strategy', description: 'Film festival submission, marketing your film, building an audience, and distribution channels.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Cinema Learning Roadmap
          </h2>
          <p className="text-slate-400 mb-4">
            Learning path for <span className="text-green-400">{genre}</span> cinema
          </p>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A structured path from beginner to professional filmmaker. Master each level before moving to the next.
          </p>
        </div>

        <div className="space-y-16">
          {learningPaths.map((path, pathIndex) => (
            <div key={pathIndex} className="relative">
              <div className="flex items-center mb-8">
                <div className={`inline-flex items-center space-x-3 bg-gradient-to-r ${path.color} rounded-full px-6 py-3`}>
                  <span className="text-2xl font-bold text-white">{pathIndex + 1}</span>
                  <span className="text-xl font-bold text-white">{path.level}</span>
                </div>
                {pathIndex < learningPaths.length - 1 && (
                  <div className="flex-1 h-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {path.topics.map((topic, topicIndex) => {
                  const Icon = topic.icon;
                  return (
                    <div
                      key={topicIndex}
                      onClick={(pathIndex === 0 || pathIndex === 1 || pathIndex === 2) && topic.id ? () => navigate("/learn/" + topic.id) : undefined}
                      className="group bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-all hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${path.color} flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {topic.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Each topic includes detailed lessons, practical exercises, and real-world examples from acclaimed films.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105">
            Explore Full Curriculum
          </button>
        </div>
      </div>
    </div>
  );
}
