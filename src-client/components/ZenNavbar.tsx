import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Sun, Moon, User, History, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface ZenNavbarProps {
  onOpenStudio: () => void;
  onOpenAuth: (tab?: 'signin' | 'history') => void;
  activeSection?: string;
}

export const ZenNavbar: React.FC<ZenNavbarProps> = ({ onOpenStudio, onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { user, savedSessions } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* High-End Glassmorphism Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-2xl ${
          isDark
            ? scrolled
              ? 'bg-[#0c0f14]/80 border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3'
              : 'bg-[#0c0f14]/60 border-b border-white/5 py-4 sm:py-5'
            : scrolled
            ? 'bg-white/75 border-b border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] py-3'
            : 'bg-white/60 border-b border-neutral-200/50 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name (Same Logo as the Browser Tab) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex items-center gap-3 group"
          >
            {/* Same Brand Logo as the Tab */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="/favicon.svg"
                alt="ZenMonk Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-extrabold text-lg sm:text-xl tracking-tight font-heading ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  ZenMonk
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 dark:bg-amber-950/80 dark:text-amber-300 px-1.5 py-0.5 rounded-md">
                  AI
                </span>
                <span className="text-amber-500 text-sm" aria-hidden="true">
                  ✳︎
                </span>
              </div>
              <p
                className={`text-[10px] sm:text-[11px] tracking-wide font-medium hidden sm:block ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                AI Interview Prep & Career Mindfulness
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden lg:flex items-center gap-7 text-sm font-medium ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            <button
              onClick={() => scrollTo('studio')}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              Interview Studio
            </button>
            <button
              onClick={() => scrollTo('pacer')}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              Breathing Pacer
            </button>
            <button
              onClick={() => scrollTo('pillars')}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              The 4 Pillars
            </button>
            <button
              onClick={() => scrollTo('traditions')}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              Wisdom Traditions
            </button>
            <button
              onClick={() => scrollTo('bank')}
              className="hover:text-amber-500 transition-colors cursor-pointer"
            >
              Question Bank
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Change Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
              className={`p-2 sm:px-3 sm:py-2 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-neutral-800/80 border-neutral-700/80 text-amber-300 hover:bg-neutral-700/80'
                  : 'bg-white/80 border-neutral-200/80 text-neutral-700 hover:bg-white shadow-2xs'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-neutral-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* User Sign In / Profile Button (Saves Data) */}
            <button
              type="button"
              onClick={() => onOpenAuth(user.isSignedIn ? 'history' : 'signin')}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border transition-all cursor-pointer active:scale-95 ${
                user.isSignedIn
                  ? isDark
                    ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : isDark
                  ? 'bg-neutral-800/80 border-neutral-700 text-neutral-200 hover:bg-neutral-750'
                  : 'bg-white/90 border-neutral-200 text-neutral-700 hover:bg-white'
              }`}
              title={user.isSignedIn ? 'View Account & Saved Answers' : 'Sign in to save practice data'}
            >
              {user.isSignedIn ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                  {savedSessions.length > 0 && (
                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 rounded-full">
                      {savedSessions.length}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenStudio}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Launch Studio</span>
              <span className="sm:hidden">Studio</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((p) => !p)}
              className={`lg:hidden p-2 focus:outline-none ${isDark ? 'text-white' : 'text-neutral-800'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 backdrop-blur-2xl flex flex-col justify-center px-8 py-12 transition-all duration-300 lg:hidden ${
          isDark ? 'bg-neutral-950/98 text-white' : 'bg-white/98 text-neutral-900'
        } ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-bold">
          <button
            onClick={() => scrollTo('studio')}
            className="text-left hover:text-amber-500 transition-colors"
          >
            AI Interview Studio
          </button>
          <button
            onClick={() => scrollTo('pacer')}
            className="text-left hover:text-amber-500 transition-colors"
          >
            4-7-8 Breathing Pacer
          </button>
          <button
            onClick={() => scrollTo('pillars')}
            className="text-left hover:text-amber-500 transition-colors"
          >
            The Four Zen Pillars
          </button>
          <button
            onClick={() => scrollTo('traditions')}
            className="text-left hover:text-amber-500 transition-colors"
          >
            Wisdom Traditions
          </button>
          <button
            onClick={() => scrollTo('bank')}
            className="text-left hover:text-amber-500 transition-colors"
          >
            Curated Question Bank
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAuth('signin');
            }}
            className="w-full py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4 text-amber-500" />
            <span>{user.isSignedIn ? `Account (${user.name})` : 'Sign In to Save Data'}</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenStudio();
            }}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Enter AI Interview Studio</span>
          </button>
        </div>
      </div>
    </>
  );
};
