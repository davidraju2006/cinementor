import { Video, Camera, Eye, Layers, Grid, Move } from 'lucide-react';

export default function DirectSection() {
  const directorTools = [
    {
      icon: Camera,
      title: 'Shot List Generator',
      description: 'Create comprehensive shot lists for every scene in your film.',
      tips: [
        'Establish the space with wide shots',
        'Use medium shots for dialogue',
        'Close-ups for emotional moments',
        'Plan coverage for editing flexibility',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Eye,
      title: 'Camera Angles Guide',
      description: 'Master the language of camera placement and movement.',
      tips: [
        'Eye level: neutral, objective view',
        'Low angle: power, dominance',
        'High angle: vulnerability, weakness',
        'Dutch angle: unease, tension',
      ],
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Grid,
      title: 'Blocking & Composition',
      description: 'Plan actor movement and frame composition.',
      tips: [
        'Rule of thirds for balanced frames',
        'Leading lines guide viewer\'s eye',
        'Depth through foreground/background',
        'Negative space creates mood',
      ],
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const shotTypes = [
    { name: 'Establishing Shot (ELS)', purpose: 'Sets the scene, shows location and context', example: 'Wide view of city skyline' },
    { name: 'Wide Shot (WS)', purpose: 'Shows full subject and surroundings', example: 'Actor head to toe in room' },
    { name: 'Medium Shot (MS)', purpose: 'Waist up, balances subject and environment', example: 'Conversational framing' },
    { name: 'Close-Up (CU)', purpose: 'Face or object detail, emotional intimacy', example: 'Actor\'s face fills frame' },
    { name: 'Extreme Close-Up (ECU)', purpose: 'Intense detail, dramatic emphasis', example: 'Eyes, hands, objects' },
    { name: 'Over-the-Shoulder (OTS)', purpose: 'Dialogue, establishes spatial relationship', example: 'Two people talking' },
  ];

  const cameraMovements = [
    { name: 'Pan', description: 'Horizontal rotation on fixed axis', use: 'Reveal space, follow action' },
    { name: 'Tilt', description: 'Vertical rotation on fixed axis', use: 'Show height, dramatic reveals' },
    { name: 'Dolly', description: 'Camera moves toward/away from subject', use: 'Intensify emotion, reveal information' },
    { name: 'Track', description: 'Camera follows alongside subject', use: 'Follow action smoothly' },
    { name: 'Crane', description: 'Camera rises or descends', use: 'Grand establishing shots, transitions' },
    { name: 'Handheld', description: 'Operator holds camera', use: 'Documentary feel, intimacy, chaos' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Direct Your Vision
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Master the visual language of cinema through shot composition, camera movement, and directing techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {directorTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-all hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed">{tool.description}</p>
                <ul className="space-y-2">
                  {tool.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm text-slate-300">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Essential Shot Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shotTypes.map((shot, index) => (
              <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-white">{shot.name}</h4>
                </div>
                <p className="text-slate-300 mb-2 text-sm font-medium">{shot.purpose}</p>
                <p className="text-slate-500 text-sm italic">{shot.example}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Camera Movements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cameraMovements.map((movement, index) => (
              <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-all group">
                <div className="flex items-center space-x-3 mb-3">
                  <Move className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-bold text-white">{movement.name}</h4>
                </div>
                <p className="text-slate-300 mb-2 text-sm">{movement.description}</p>
                <p className="text-slate-500 text-sm"><span className="text-violet-400 font-medium">Use:</span> {movement.use}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 md:p-12">
          <div className="flex items-start space-x-6">
            <Video className="w-12 h-12 text-white flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Director's Notes: Communicating Your Vision
              </h3>
              <div className="space-y-3 text-violet-100">
                <p className="leading-relaxed">
                  <strong className="text-white">Be Specific:</strong> Don't just say "make it emotional" - explain what emotion and how to achieve it through performance and framing.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Shot List Discipline:</strong> Always have a shot list, but be flexible enough to capture unexpected magic.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Coverage Strategy:</strong> Get your master shot first, then coverage. This ensures you have a complete scene even if time runs out.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Collaboration:</strong> Work closely with your cinematographer. They're your partner in creating the visual story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
