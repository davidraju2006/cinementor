import { useState } from 'react';

export default function CameraAngles() {
  const angles = [
    {
      name: "Eye Level",
      icon: "👁️",
      short: "Neutral, objective view.",
      details: {
        meaning: "Shows characters as equals. No emotional bias.",
        use: "Dialogue scenes, realism, documentary feel.",
        avoid: "Power imbalance or intimidation scenes.",
        examples: "Conversations in 'The Godfather', news interviews, everyday interactions.",
        tips: "Keep the horizon level for maximum neutrality."
      }
    },
    {
      name: "Low Angle",
      icon: "📈",
      short: "Power, dominance.",
      details: {
        meaning: "Makes subject appear strong or threatening.",
        use: "Villains, heroes, moments of control.",
        avoid: "Sensitive or vulnerable moments.",
        examples: "Superman flying in action movies, dictators in historical films.",
        tips: "Shoot from ground level, exaggerate the upward tilt."
      }
    },
    {
      name: "High Angle",
      icon: "📉",
      short: "Weakness, vulnerability.",
      details: {
        meaning: "Subject feels small or powerless.",
        use: "Fear, loss, emotional breakdowns.",
        avoid: "Heroic or confident moments.",
        examples: "Victims in horror films, defeated characters in dramas.",
        tips: "Position camera high above, look down on the subject."
      }
    },
    {
      name: "Dutch Angle",
      icon: "🔄",
      short: "Tension, unease.",
      details: {
        meaning: "Creates psychological discomfort.",
        use: "Chaos, madness, danger.",
        avoid: "Calm or romantic scenes.",
        examples: "Fight scenes in 'The Dark Knight', psychological thrillers.",
        tips: "Tilt the camera slightly (10-30 degrees) for subtle effect."
      }
    },
    {
      name: "Over-the-Shoulder",
      icon: "🫴",
      short: "Intimacy, conversation.",
      details: {
        meaning: "Builds connection between characters.",
        use: "Dialogues, intimate moments, reveals.",
        avoid: "Action sequences or wide establishing shots.",
        examples: "Conversations in 'Pulp Fiction', romantic scenes.",
        tips: "Frame the back of one character's head and the face of the other."
      }
    },
    {
      name: "Point of View (POV)",
      icon: "👀",
      short: "Subjective perspective.",
      details: {
        meaning: "Puts viewer in the character's shoes.",
        use: "Suspense, horror, first-person narratives.",
        avoid: "Objective storytelling or multiple perspectives.",
        examples: "Horror films like 'The Blair Witch Project', action sequences.",
        tips: "Shoot from the character's eye level and movement."
      }
    },
    {
      name: "Bird's Eye View",
      icon: "🐦",
      short: "Overview, detachment.",
      details: {
        meaning: "Shows the bigger picture, isolation.",
        use: "Establishing shots, symbolism of insignificance.",
        avoid: "Intimate or personal moments.",
        examples: "Opening shots in 'The Shawshank Redemption', aerial views.",
        tips: "Position camera directly above the subject."
      }
    },
    {
      name: "Worm's Eye View",
      icon: "🪱",
      short: "Extreme low angle.",
      details: {
        meaning: "Exaggerates power and scale.",
        use: "Giants, monuments, heroic figures.",
        avoid: "Subtle emotions or everyday scenes.",
        examples: "Skyscrapers in city shots, superheroes in comics.",
        tips: "Shoot from ground level looking up dramatically."
      }
    }
  ];

  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">Camera Angles Guide</h1>
      <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
        Master the art of camera angles to convey emotion, power dynamics, and atmosphere in your shots. Click on each angle to explore detailed insights.
      </p>

      {angles.map((a, i) => (
        <div
          key={i}
          onClick={() => setActive(active === i ? null : i)}
          className="cursor-pointer bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 p-6 rounded-lg mb-6 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 transition-all duration-300 overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{a.icon}</span>
              <h3 className="font-bold text-xl">{a.name}</h3>
            </div>
            <span className={`text-slate-400 transition-transform duration-300 ${active === i ? 'rotate-90' : ''}`}>▶</span>
          </div>
          <p className="text-slate-300 mt-2">{a.short}</p>

          <div className={`mt-4 text-sm space-y-3 text-slate-200 ${active === i ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} transition-all duration-500 overflow-hidden`}>
            <p><span className="text-blue-400 font-semibold">Meaning:</span> {a.details.meaning}</p>
            <p><span className="text-green-400 font-semibold">Use when:</span> {a.details.use}</p>
            <p><span className="text-red-400 font-semibold">Avoid when:</span> {a.details.avoid}</p>
            <p><span className="text-purple-400 font-semibold">Examples:</span> {a.details.examples}</p>
            <p><span className="text-yellow-400 font-semibold">Tips:</span> {a.details.tips}</p>
          </div>
        </div>
      ))}

      <div className="mt-12 p-6 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-600 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Pro Tips for Mastering Camera Angles</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start space-x-2">
            <span className="text-green-400 font-bold">•</span>
            <span>Experiment with angles during pre-production to find the perfect fit for your story.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-400 font-bold">•</span>
            <span>Combine angles with lighting and composition for enhanced emotional impact.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-400 font-bold">•</span>
            <span>Use subtle variations in angle to avoid clichés and keep your visuals fresh.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-400 font-bold">•</span>
            <span>Practice with your camera to understand how angles affect perspective and depth.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-400 font-bold">•</span>
            <span>Remember: the best angle is the one that serves your narrative and evokes the desired emotion.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
