import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ZenFooter: React.FC = () => {
  const { isDark } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className={`pt-16 pb-12 border-t transition-colors duration-300 ${
        isDark ? 'bg-[#080a0f] text-white border-neutral-800' : 'bg-neutral-950 text-white border-neutral-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote banner */}
        <div className="text-center max-w-2xl mx-auto mb-12 pb-12 border-b border-neutral-800/80">
          <p className="text-amber-300 font-serif italic text-lg sm:text-xl">
            "Speak simply. Breathe once. Answer clearly. In this moment, you are whole."
          </p>
          <span className="text-xs text-neutral-500 uppercase tracking-widest mt-2 block">
            — Master Zen Bodhi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 bg-amber-100">
                <img src="/zen-monk.jpg" alt="Zen Monk" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight font-heading">ZenMonk AI</span>
                <p className="text-xs text-neutral-400">AI Interview Preparation & Career Mindfulness</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-4">
              Empowering engineers, leaders, clinicians, and creators to dismantle interview panic and communicate with grounded presence, clear structure, and unshakeable poise.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Private & Confidential Practice</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-300 mb-4">
              Studio & Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('hero')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Overview & Composure
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('studio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  AI Interview Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('pacer')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  4-7-8 Breathing Pacer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('pillars')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  The Four Zen Pillars
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('traditions')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Wisdom Traditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('bank')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Curated Question Bank
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-300 mb-4">
              Core Principles
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>The 2-Second Stillness Rule</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>The Story of Becoming</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>The Ally Mindset</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-neutral-800 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ZenMonk AI®. All rights reserved. Cultivating career calm worldwide.</p>
          <div className="flex items-center gap-1 text-neutral-400">
            <span>Built with mindfulness and</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for job seekers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
