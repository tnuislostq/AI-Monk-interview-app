import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ZenNavbar } from './components/ZenNavbar';
import { ZenHero } from './components/ZenHero';
import { InterviewStudio } from './components/InterviewStudio';
import { BreathingPacerSection } from './components/BreathingPacerSection';
import { WisdomPillarsSection } from './components/WisdomPillarsSection';
import { TraditionsSection } from './components/TraditionsSection';
import { InteractiveQuestionBank } from './components/InteractiveQuestionBank';
import { ZenFooter } from './components/ZenFooter';
import { AuthModal } from './components/AuthModal';
import { ScrubVideoBackground } from './components/ScrubVideoBackground';
import { Film, Image as ImageIcon } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { isDark } = useTheme();
  const [studioPrompt, setStudioPrompt] = useState<string>('');
  const [backgroundMode, setBackgroundMode] = useState<'serene' | 'video'>('serene');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'history'>('signin');

  const scrollToStudio = () => {
    const studioEl = document.getElementById('studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPacer = () => {
    const pacerEl = document.getElementById('pacer');
    if (pacerEl) {
      pacerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (tab: 'signin' | 'history' = 'signin') => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? 'bg-[#0c0f14] text-neutral-100' : 'bg-[#fdfbf7] text-neutral-900'
      } selection:bg-amber-400 selection:text-neutral-950`}
    >
      {/* Optional Mouse-Scrubbed Video Canvas */}
      {backgroundMode === 'video' && (
        <div className="fixed inset-0 z-0 pointer-events-auto">
          <ScrubVideoBackground />
          <div
            className={`fixed inset-0 backdrop-blur-xs pointer-events-none ${
              isDark ? 'bg-black/75' : 'bg-white/70'
            }`}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Fixed Top Glassmorphic Navbar with Theme & Sign In */}
        <ZenNavbar
          onOpenStudio={() => scrollToStudio()}
          onOpenAuth={handleOpenAuth}
        />

        {/* Pure Modern Hero Section */}
        <ZenHero
          onStartPractice={() => scrollToStudio()}
          onOpenPacer={scrollToPacer}
        />

        {/* Dynamic Multi-Field Virtual AI Interview Studio */}
        <InterviewStudio initialPrompt={studioPrompt} />

        {/* 4-7-8 Breathing Anxiety Reset Pacer */}
        <BreathingPacerSection />

        {/* The Four Zen Pillars of Interview Presence */}
        <WisdomPillarsSection
          onPracticePillar={(prompt) => {
            setStudioPrompt(prompt);
            scrollToStudio();
          }}
        />

        {/* Ancient Wisdom Schools (Zen, Stoic, Vipassana) */}
        <TraditionsSection
          onSelectTradition={(prompt) => {
            setStudioPrompt(prompt);
            scrollToStudio();
          }}
        />

        {/* Curated Question Bank (Before & After Comparisons) */}
        <InteractiveQuestionBank
          onPracticeQuestion={(question) => {
            setStudioPrompt(question);
            scrollToStudio();
          }}
        />

        {/* Serene Footer */}
        <ZenFooter />
      </div>

      {/* Sign In & Saved History Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authTab}
      />

      {/* Visual Canvas Switcher (Serene Sky vs Mouse-Scrubbed Video) */}
      <aside aria-label="Visual ambiance switcher" className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() =>
            setBackgroundMode((prev) => (prev === 'serene' ? 'video' : 'serene'))
          }
          className={`text-xs font-semibold px-3 py-2 rounded-full border shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
            isDark
              ? 'bg-neutral-800/90 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
              : 'bg-white/90 hover:bg-white text-neutral-800 border-neutral-300'
          }`}
          title="Toggle between Serene Mountain Sky and Mouse-Scrubbed Video"
        >
          {backgroundMode === 'serene' ? (
            <>
              <Film className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Atmospheric Video</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Mountain Sky</span>
            </>
          )}
        </button>
      </aside>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
