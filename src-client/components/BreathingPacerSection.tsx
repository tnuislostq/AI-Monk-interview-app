import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const BreathingPacerSection: React.FC = () => {
  const { isDark } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [count, setCount] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let timer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      // 1. Inhale (4s)
      setPhase('Inhale');
      setCount(4);
      let c = 4;
      const inhaleInt = setInterval(() => {
        c--;
        if (c >= 1) setCount(c);
      }, 1000);

      timer = setTimeout(() => {
        clearInterval(inhaleInt);
        // 2. Hold (7s)
        setPhase('Hold');
        setCount(7);
        let h = 7;
        const holdInt = setInterval(() => {
          h--;
          if (h >= 1) setCount(h);
        }, 1000);

        timer = setTimeout(() => {
          clearInterval(holdInt);
          // 3. Exhale (8s)
          setPhase('Exhale');
          setCount(8);
          let e = 8;
          const exhaleInt = setInterval(() => {
            e--;
            if (e >= 1) setCount(e);
          }, 1000);

          timer = setTimeout(() => {
            clearInterval(exhaleInt);
            setCyclesCompleted((prev) => prev + 1);
            cycle();
          }, 8000);
        }, 7000);
      }, 4000);
    };

    cycle();
    return () => clearTimeout(timer);
  }, [isActive]);

  const togglePacer = () => {
    setIsActive((prev) => !prev);
  };

  const resetPacer = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCount(4);
    setCyclesCompleted(0);
  };

  return (
    <section
      id="pacer"
      className={`py-20 relative transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-b from-[#0c0f14] via-[#10141d] to-[#0c0f14]'
          : 'bg-gradient-to-b from-[#fdfbf7] via-sky-50/50 to-[#fdfbf7]'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Wind className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Emergency 60-Second Anxiety Neutralizer</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-heading ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            4-7-8 Breath Pacer For Pre-Interview Jitters
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            When adrenaline surges, your vocal pitch rises and words tumble out too fast. Inhale for 4, hold for 7, exhale for 8 to reset your parasympathetic nervous system in 2 minutes.
          </p>
        </div>

        {/* Breathing Orb Card */}
        <div
          className={`rounded-3xl border shadow-xl p-6 sm:p-10 max-w-xl mx-auto text-center relative overflow-hidden ${
            isDark ? 'bg-[#131722] border-neutral-800 text-white' : 'bg-white border-neutral-200/90 text-neutral-900'
          }`}
        >
          {/* Pulsing Visual Orb */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center my-6">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                !isActive
                  ? isDark
                    ? 'scale-90 bg-neutral-800/40 border-2 border-dashed border-neutral-700'
                    : 'scale-90 bg-neutral-100 border-2 border-dashed border-neutral-300'
                  : phase === 'Inhale'
                  ? 'scale-110 bg-emerald-100/70 dark:bg-emerald-950/40 border-4 border-emerald-400 shadow-xl shadow-emerald-400/20'
                  : phase === 'Hold'
                  ? 'scale-110 bg-amber-100/70 dark:bg-amber-950/40 border-4 border-amber-400 shadow-xl shadow-amber-400/20'
                  : 'scale-75 bg-sky-100/70 dark:bg-sky-950/40 border-4 border-sky-400 shadow-lg shadow-sky-400/20'
              }`}
            />

            {/* Inner Content Display */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                {isActive ? 'Current Phase' : 'Ready'}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold mt-1">
                {isActive ? phase : 'Begin Cycle'}
              </span>
              <span className="text-5xl sm:text-6xl font-black font-mono mt-2">
                {isActive ? `${count}s` : '4-7-8'}
              </span>
              <span className={`text-xs mt-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {phase === 'Inhale' && 'Slow nasal breath into belly'}
                {phase === 'Hold' && 'Oxygen absorbing calmly'}
                {phase === 'Exhale' && 'Gentle open-mouth release'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={togglePacer}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Pacer</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start 4-7-8 Breathing</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetPacer}
              className={`p-3 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
              title="Reset cycle count"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Cycle Counter */}
          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cycles Completed: <strong>{cyclesCompleted}</strong></span>
            </div>
            <div className="flex items-center gap-1 text-rose-500 font-medium">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Cortisol Dropping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
