import React, { useState } from 'react';
import { Sparkles, Sun, ShieldCheck, Waves } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TraditionsSectionProps {
  onSelectTradition: (prompt: string) => void;
}

export const TraditionsSection: React.FC<TraditionsSectionProps> = ({ onSelectTradition }) => {
  const { isDark } = useTheme();
  const [selected, setSelected] = useState('zen');

  const traditions = [
    {
      id: 'zen',
      name: 'Zen Buddhism',
      subtitle: 'Simplicity, Presence & Direct Clarity',
      icon: Sun,
      color: 'amber',
      coreTenet: 'Strip away the filler words (umms, likes, defensive apologies). Deliver the core insight directly.',
      exampleQuote: '"Before enlightenment, chop wood, carry water. In the interview, breathe first, state the truth."',
      prompt: 'Adopt the Zen Buddhist interview mentor persona: focus on brevity, directness, and cutting away nervous over-explaining.',
    },
    {
      id: 'stoic',
      name: 'Marcus Aurelius Stoicism',
      subtitle: 'Dichotomy of Control & Outcome Independence',
      icon: ShieldCheck,
      color: 'emerald',
      coreTenet: 'Focus 100% on your preparation and honesty. Detach completely from whether they offer you the role.',
      exampleQuote: '"You have power over your mind—not outside events. Realize this, and you will find great strength."',
      prompt: 'Adopt the Stoic interview mentor persona: help me build unshakeable immunity to fear of rejection and outcome anxiety.',
    },
    {
      id: 'vipassana',
      name: 'Vipassana Somatics',
      subtitle: 'Nervous System Regulation & Embodied Voice',
      icon: Waves,
      color: 'sky',
      coreTenet: 'Observe trembling hands and rapid heartbeat without judgment. Transform anxious energy into resonant voice pitch.',
      exampleQuote: '"Observe sensations as passing weather. The mountain remains unmoved by the wind."',
      prompt: 'Adopt the Vipassana somatic interview coach: guide me to ground my vocal pitch and bodily tremors in real-time.',
    },
  ];

  return (
    <section
      id="traditions"
      className={`py-20 text-white relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#080a0f]' : 'bg-neutral-900'
      }`}
    >
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multiple Ancient Wisdom Schools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
            Choose Your Monk's Wisdom Tradition
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Every candidate experiences interview pressure differently. Customize Master Bodhi's guidance style to match your mental hurdles.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {traditions.map((t) => {
            const Icon = t.icon;
            const isChosen = selected === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isChosen
                    ? 'bg-neutral-800/90 border-amber-400 shadow-2xl scale-[1.02]'
                    : 'bg-neutral-800/40 border-neutral-700/60 hover:border-neutral-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-2xl ${
                        isChosen ? 'bg-amber-400/20 text-amber-300' : 'bg-neutral-700/50 text-neutral-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {isChosen && (
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                        Active Mode
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading">{t.name}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{t.subtitle}</p>

                  <p className="text-xs text-neutral-300 mt-4 leading-relaxed font-light">
                    {t.coreTenet}
                  </p>

                  <div className="mt-4 p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-700/50 text-xs italic text-amber-200/90 font-serif">
                    {t.exampleQuote}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-700/60">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTradition(t.prompt);
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isChosen
                        ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md'
                        : 'bg-neutral-700 hover:bg-neutral-600 text-white'
                    }`}
                  >
                    <span>Train in {t.name.split(' ')[0]} Mode</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
