import { FileText, Users, Layout, Clock, MapPin, Palette } from 'lucide-react';

export default function CreateSection() {
  const tools = [
    {
      icon: FileText,
      title: 'Script Writing',
      description: 'Learn proper screenplay format, dialogue writing, and story structure.',
      features: [
        'Industry-standard formatting',
        'Character development templates',
        'Scene heading guidelines',
        'Dialogue best practices',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Character Builder',
      description: 'Develop complex, believable characters with depth and motivation.',
      features: [
        'Character biography templates',
        'Motivation and conflict mapping',
        'Character arc development',
        'Relationship dynamics',
      ],
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Layout,
      title: 'Scene Breakdown',
      description: 'Analyze and structure your scenes for maximum impact.',
      features: [
        'Scene purpose identification',
        'Emotional beats mapping',
        'Conflict progression',
        'Visual storytelling elements',
      ],
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Clock,
      title: 'Story Timeline',
      description: 'Organize your narrative chronology and plot points.',
      features: [
        'Plot point organization',
        'Multiple timeline management',
        'Flashback/forward planning',
        'Pacing analysis',
      ],
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: MapPin,
      title: 'Location Planning',
      description: 'Plan and organize your filming locations effectively.',
      features: [
        'Location scouting checklist',
        'Logistical considerations',
        'Budget estimation per location',
        'Backup location planning',
      ],
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Palette,
      title: 'Visual Style Guide',
      description: 'Define the visual language and aesthetic of your film.',
      features: [
        'Color palette selection',
        'Mood board creation',
        'Reference film analysis',
        'Visual motif planning',
      ],
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  const scriptingTips = [
    {
      title: 'Start with a Strong Concept',
      content: 'Your film should be explainable in one compelling sentence. This is your logline.',
    },
    {
      title: 'Show, Don\'t Tell',
      content: 'Use visual storytelling. Film is a visual medium - let actions and images convey emotion.',
    },
    {
      title: 'Every Scene Has a Purpose',
      content: 'Each scene should advance the plot, reveal character, or build the world. If it doesn\'t, cut it.',
    },
    {
      title: 'Conflict is Essential',
      content: 'Every scene needs conflict or tension. Without obstacles, there\'s no story.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create Your Story
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Tools and resources to help you write, develop, and structure your screenplay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-all hover:scale-105 cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  {tool.description}
                </p>
                <ul className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 text-sm text-slate-300">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Essential Scriptwriting Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scriptingTips.map((tip, index) => (
              <div key={index} className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">{tip.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Script Format Template
          </h3>
          <p className="text-emerald-100 mb-6">
            Download our industry-standard screenplay template to get started immediately.
          </p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all hover:scale-105">
            Download Template
          </button>
        </div>
      </div>
    </div>
  );
}
