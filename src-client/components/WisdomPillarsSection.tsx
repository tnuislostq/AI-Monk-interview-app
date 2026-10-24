import React, { useState } from 'react';
import { Sparkles, Shield, Compass, Heart, Feather, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface WisdomPillarsSectionProps {
  onPracticePillar: (pillarTitle: string) => void;
}

export const WisdomPillarsSection: React.FC<WisdomPillarsSectionProps> = ({ onPracticePillar }) => {
  const { isDark } = useTheme();
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      num: '01',
      title: 'The 2-Second Breath (Stillness Before Speech)',
      quote: '"Silence is not hesitation; it is the deliberate gathering of clarity."',
      icon: Feather,
      insight:
        'When an interviewer asks a tough question, amateur candidates fill the void instantly with "umms" and unstructured rambling. The Monk takes two slow seconds to breathe. This deliberate pause lowers your heart rate and signals effortless executive command.',
      actionableTip:
        'Say: "That is an insightful challenge. Let me take three seconds to structure the cleanest answer."',
      drillPrompt: 'Help me practice taking deliberate pauses before answering hard technical questions.',
    },
    {
      num: '02',
      title: 'The Story of Becoming (Beyond Chronology)',
      quote: '"A resume is a receipt of past duties. A story is the trajectory of your soul."',
      icon: Compass,
      insight:
        'Never answer "Tell me about yourself" with a chronological reading of your LinkedIn profile. Instead, share your Origin Spark (what ignited your craft), your Defining Crucible (the hardest problem you scaled), and your Present Calling (why this team matters today).',
      actionableTip:
        'Limit the entire opening to 90 seconds. Leave them hungry to double-click into your stories.',
      drillPrompt: 'Guide me step-by-step through crafting a 90-second "Tell me about yourself" story of becoming.',
    },
    {
      num: '03',
      title: 'The Crack in the Cup (Authentic Vulnerability)',
      quote: '"The bowl that knows its crack is mended with gold (Kintsugi)."',
      icon: Shield,
      insight:
        'Claiming "I am a perfectionist who cares too much" marks you as untrustworthy. True leaders have genuine edges. Name a real blind spot, show the operational system you created to mitigate it, and describe how your team benefited.',
      actionableTip:
        'Formula: Real Edge → Insightful Moment → Concrete System Built → Current Progress.',
      drillPrompt: 'Help me choose and articulate an authentic weakness using the Kintsugi framework.',
    },
    {
      num: '04',
      title: 'The Ally Mindset (Healing the Hiring Headache)',
      quote: '"Do not seek approval from a judge; offer guidance to a future teammate."',
      icon: Heart,
      insight:
        'The interviewer has a painful hiring headache: their team is overloaded, projects are late, and hiring the wrong person is costly. You are not begging for a job. You are an expert consultant discovering if your skills can solve their exact pain points.',
      actionableTip:
        'Ask questions that treat them as collaborators: "What is the biggest operational roadblock keeping your engineers awake this quarter?"',
      drillPrompt: 'Teach me high-leverage questions to ask the interviewer that show strategic partnership.',
    },
  ];

  return (
    <section
      id="pillars"
      className={`py-20 relative transition-colors duration-300 ${
        isDark ? 'bg-[#0f141f] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The Zen Interview Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            The Four Pillars of Unshakeable Interview Presence
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Unlike rote script memorization, the Monk's four pillars transform how you regulate your physiology, structure your thoughts, and relate to your interviewers.
          </p>
        </div>

        {/* Pillars Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Pillar Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <div
                  key={pillar.num}
                  onClick={() => setActivePillar(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 border-neutral-900 dark:border-amber-400 shadow-md font-bold'
                      : isDark
                      ? 'bg-neutral-800/40 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
                      : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-black font-mono ${
                          isSelected ? (isDark ? 'text-neutral-950' : 'text-amber-400') : 'text-neutral-400'
                        }`}
                      >
                        {pillar.num}
                      </span>
                      <Icon className="w-5 h-5" />
                      <h4 className="text-sm font-bold">{pillar.title.split(' (')[0]}</h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Deep Dive Card */}
          <div
            className={`lg:col-span-7 border rounded-3xl p-6 sm:p-8 shadow-md ${
              isDark ? 'bg-[#151a26] border-neutral-700' : 'bg-[#fbfaf8] border-neutral-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-black font-mono text-amber-500">
                {pillars[activePillar].num}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading">
                  {pillars[activePillar].title}
                </h3>
                <p className="text-xs italic text-amber-600 dark:text-amber-400 font-serif mt-0.5">
                  {pillars[activePillar].quote}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <p className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                {pillars[activePillar].insight}
              </p>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark
                    ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
                    : 'bg-amber-50/80 border-amber-200/70 text-amber-950'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider block text-amber-600 dark:text-amber-400 mb-1">
                  🥋 Monastic Action Tip:
                </span>
                <p className="text-xs font-medium leading-relaxed">
                  {pillars[activePillar].actionableTip}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Practice this mindset in the Studio</span>
              <button
                type="button"
                onClick={() => onPracticePillar(pillars[activePillar].drillPrompt)}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
              >
                <span>Drill With Master Bodhi</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
