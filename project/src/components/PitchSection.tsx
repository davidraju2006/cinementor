import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, Target } from 'lucide-react';
import { sections } from '../data/pitchSections';

export default function PitchSection() {
  const [active, setActive] = useState<number | null>(0);
  const navigate = useNavigate();

  const budgetCategories = [
    { category: 'Pre-Production', percentage: '10-15%', items: 'Script, casting, location scouting, permits' },
    { category: 'Production', percentage: '40-50%', items: 'Crew, equipment, locations, actors, catering' },
    { category: 'Post-Production', percentage: '25-30%', items: 'Editing, color grading, sound design, music, VFX' },
    { category: 'Marketing', percentage: '10-15%', items: 'Posters, trailers, festival fees, promotions' },
    { category: 'Contingency', percentage: '10%', items: 'Unexpected costs, overruns, emergencies' },
  ];

  const pitchTips = [
    {
      title: 'Know Your Story Inside Out',
      content: 'Be able to pitch your film in 30 seconds, 2 minutes, or 10 minutes. Practice all three versions.',
    },
    {
      title: 'Show, Don\'t Just Tell',
      content: 'Use mood boards, concept art, and reference films. Visual materials make your vision tangible.',
    },
    {
      title: 'Demonstrate Market Understanding',
      content: 'Know your target audience, comparable films, and distribution possibilities. Show it\'s commercially viable.',
    },
    {
      title: 'Highlight Your Team',
      content: 'Showcase the talent and experience of your key crew members. People invest in people.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pitch & Plan Your Project
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Learn how to present your vision, budget your production, and plan a successful shoot.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((s, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`cursor-pointer p-6 rounded-xl border transition
                ${active === i
                  ? "bg-slate-700 border-blue-500 scale-105"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:scale-105"
                }`}
            >
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>

        {active !== null && (
          <div className="mt-10 bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              {sections[active].title}
            </h2>

            <ul className="space-y-2 text-slate-300">
              {sections[active].details.map((d, i) => (
                <li key={i}>• {d}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mt-8 mb-12">
          <p className="text-slate-400 text-sm">
            Used by indie filmmakers worldwide • Industry-standard planning tools
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 md:p-12 mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
            <DollarSign className="w-8 h-8 text-emerald-400" />
            <span>Budget Breakdown Guide</span>
          </h3>
          <div className="space-y-4">
            {budgetCategories.map((category, index) => (
              <div key={index} className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 className="text-xl font-bold text-white">{category.category}</h4>
                  <div className="text-2xl font-bold text-emerald-400">{category.percentage}</div>
                </div>
                <p className="text-slate-400">{category.items}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-emerald-900/20 border border-emerald-800 rounded-xl">
            <p className="text-emerald-400 font-medium">
              <strong>Pro Tip:</strong> Always add a contingency budget of at least 10%. Productions almost always encounter unexpected costs.
            </p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 md:p-12 mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Pitching Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pitchTips.map((tip, index) => (
              <div key={index} className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8">
            <Target className="w-12 h-12 text-white mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Production Schedule Template</h3>
            <p className="text-blue-100 mb-6">
              Download our detailed production schedule template to plan every phase of your shoot.
            </p>
            <button
              onClick={() => window.open('/templates/production-schedule.pdf')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105"
            >
              Get Template
            </button>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-8">
            <TrendingUp className="w-12 h-12 text-white mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Budget Calculator Tool</h3>
            <p className="text-orange-100 mb-6">
              Use our interactive budget calculator to estimate costs for your film production.
            </p>
            <button
              onClick={() => navigate('/pitch/budget')}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all hover:scale-105"
            >
              Calculate Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
