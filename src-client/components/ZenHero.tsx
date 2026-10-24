import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Wind,
  CheckCircle2,
  ShieldCheck,
  Star,
  Check,
  TrendingUp,
  Brain,
  Zap,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ZenHeroProps {
  onStartPractice: () => void;
  onOpenPacer: () => void;
}

export const ZenHero: React.FC<ZenHeroProps> = ({ onStartPractice, onOpenPacer }) => {
  const { isDark } = useTheme();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className={`relative min-h-[92vh] pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden flex items-center transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-b from-[#0a0d13] via-[#0f141f] to-[#0c0f14]'
          : 'bg-gradient-to-b from-sky-200/40 via-sky-100/20 to-[#fdfbf7]'
      }`}
    >
      {/* Background Atmosphere & Floating Drifting Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Radial Sun Glow */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[550px] rounded-full blur-3xl ${
            isDark ? 'bg-amber-500/10' : 'bg-amber-200/35'
          }`}
        />

        {/* Animated 3D Floating Mountain Leaves */}
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-0 animate-leaf"
            style={{
              top: `${10 + i * 12}%`,
              right: `${-4 + i * 6}%`,
              animationDuration: `${12 + i * 2.2}s`,
              animationDelay: `${i * 1.6}s`,
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600/75 drop-shadow-xs transform rotate-45"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Modern Hero Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Elegant Innovation Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-100/90 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-fadeInUp">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>The Mindful AI Interview Simulator</span>
              <span className="hidden sm:inline text-amber-400">•</span>
              <span className="hidden sm:inline font-mono text-[11px] text-amber-700 dark:text-amber-300/80">Every Industry & Role</span>
            </div>

            {/* High-Impact Hero Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.10] mb-6 font-heading ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Turn Interview Anxiety Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 underline decoration-amber-400/80 decoration-wavy decoration-2">
                Unshakeable Composure.
              </span>
            </h1>

            {/* Deep Impression Subtitle */}
            <p
              className={`text-base sm:text-lg mb-8 max-w-xl leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              You know your craft. Master the executive poise to prove it. Practice high-stakes
              behavioral, technical, and leadership scenarios with an AI mentor that dismantles
              panic, eliminates nervous rambling, and structures your thoughts with quiet authority.
            </p>

            {/* Modern CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={onStartPractice}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-95 w-full sm:w-auto"
              >
                <Zap className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
                <span>Launch Interview Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenPacer}
                className={`font-semibold text-sm sm:text-base px-7 py-4 rounded-full border transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto ${
                  isDark
                    ? 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 shadow-2xs'
                }`}
              >
                <Wind className="w-4 h-4 text-emerald-500" />
                <span>60-Sec Anxiety Reset</span>
              </button>
            </div>

            {/* Sleek Trust & Social Proof Strip */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 w-full flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span><strong className={isDark ? 'text-white' : 'text-neutral-900'}>14,200+</strong> Candidates Guided</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span><strong className={isDark ? 'text-white' : 'text-neutral-900'}>4.9/5</strong> Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Works for All 10+ Career Fields</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern 3D Floating Showcase with Glassmorphism Cards */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Ambient Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/25 via-sky-400/20 to-emerald-400/25 rounded-3xl blur-2xl animate-pulse" />

              {/* 3D Tilt Character Card */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={onStartPractice}
                className={`relative rounded-3xl p-4 sm:p-5 shadow-2xl border cursor-pointer select-none transition-transform duration-200 ease-out group ${
                  isDark
                    ? 'bg-[#151a26] border-neutral-700'
                    : 'bg-white border-neutral-200/90'
                }`}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                }}
              >
                {/* Character Photo Container */}
                <div className="relative aspect-[3/3.8] rounded-2xl overflow-hidden shadow-inner bg-sky-100 animate-float">
                  <img
                    src="/zen-monk.jpg"
                    alt="Cute Zen Monk meditating on mountain peak"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Cinematic Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top Status Pill */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Master Bodhi Active</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-black/50 px-2 py-0.5 rounded-md border border-amber-300/30">
                      AI Mentor
                    </span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase font-bold tracking-widest text-amber-300">
                      Master Zen Bodhi
                    </p>
                    <h3 className="text-lg font-bold">The Mindful Interviewer</h3>
                    <p className="text-xs text-neutral-200 mt-1 italic">
                      "Speak simply. Breathe once. Answer clearly."
                    </p>
                  </div>
                </div>

                {/* Live Transformation Preview Pill Card */}
                <div
                  className={`mt-4 p-3.5 rounded-2xl border text-xs ${
                    isDark
                      ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Real-Time Refinement
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      98% Clarity
                    </span>
                  </div>
                  <p className="text-[11px] line-clamp-2 italic text-neutral-600 dark:text-neutral-400">
                    "Transformed 180 words of nervous rambling into a crisp, metric-backed 3-sentence leadership answer."
                  </p>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[11px] text-neutral-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Click to launch practice studio
                  </span>
                </div>
              </div>

              {/* Floating Glassmorphic Badge 1: Top Right */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 p-2.5 rounded-2xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-lg text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className={isDark ? 'text-white' : 'text-neutral-900'}>Instant Diagnosis</span>
              </div>

              {/* Floating Glassmorphic Badge 2: Bottom Left */}
              <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 p-2.5 rounded-2xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-lg text-xs font-semibold">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span className={isDark ? 'text-white' : 'text-neutral-900'}>STAR Framework</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
