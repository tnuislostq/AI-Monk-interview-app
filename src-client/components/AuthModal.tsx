import React, { useState } from 'react';
import { X, Sparkles, User, Mail, Briefcase, History, Trash2, Award, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'history';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signin',
}) => {
  const { user, savedSessions, signIn, signOut, deleteSession, clearHistory } = useAuth();
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState<'signin' | 'history'>(defaultTab);
  const [name, setName] = useState(user.name !== 'Candidate' ? user.name : '');
  const [email, setEmail] = useState(user.email);
  const [targetRole, setTargetRole] = useState(user.targetRole);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    signIn(name, email, targetRole);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 800);
  };

  const handleDemoSignIn = () => {
    signIn('Sarah Chen', 'sarah@example.com', 'Senior Full Stack Engineer', 'Technology & Software');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeInUp">
      <div
        className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-[#121622] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Header with Tabs */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {user.isSignedIn ? 'Account Profile' : 'Sign In to Save Data'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Saved History ({savedSessions.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TAB 1: SIGN IN / PROFILE */}
        {activeTab === 'signin' && (
          <div className="p-6">
            {user.isSignedIn ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-neutral-900 font-extrabold text-2xl mx-auto mb-3 shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold font-heading">{user.name}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{user.email || 'Free Candidate Account'}</p>

                <div className="mt-6 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-850/50 border border-neutral-200 dark:border-neutral-800 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Target Role:</span>
                    <strong className="text-neutral-800 dark:text-neutral-200">{user.targetRole}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Target Field:</span>
                    <strong className="text-neutral-800 dark:text-neutral-200">{user.targetField}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Practice History:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">{savedSessions.length} answers saved</strong>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('history')}
                    className="bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    View Saved History
                  </button>

                  <button
                    type="button"
                    onClick={signOut}
                    className="border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 font-semibold text-xs px-4 py-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="text-center mb-5">
                  <span className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold font-heading">Save Your Practice & Feedback</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Sign in so your custom answers, Master Bodhi's critiques, and scores persist automatically.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Your Full Name:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold outline-none transition-all ${
                        isDark
                          ? 'bg-neutral-800/80 border-neutral-700 text-white focus:border-amber-400'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Email Address (optional):
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold outline-none transition-all ${
                        isDark
                          ? 'bg-neutral-800/80 border-neutral-700 text-white focus:border-amber-400'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Target Job Title:
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold outline-none transition-all ${
                        isDark
                          ? 'bg-neutral-800/80 border-neutral-700 text-white focus:border-amber-400'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-3 flex flex-col gap-2.5">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm py-3 rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Saved Successfully!</span>
                      </>
                    ) : (
                      <span>Save Profile & Sign In</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDemoSignIn}
                    className="w-full text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 py-2 transition-colors cursor-pointer"
                  >
                    Or 1-Click Quick Demo Sign-In →
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: SAVED INTERVIEW HISTORY */}
        {activeTab === 'history' && (
          <div className="p-6 max-h-[460px] overflow-y-auto">
            {savedSessions.length === 0 ? (
              <div className="text-center py-10 text-neutral-400">
                <History className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-semibold">No saved interview sessions yet.</p>
                <p className="text-[11px] text-neutral-500 mt-1 max-w-xs mx-auto">
                  Practice any question in the Interview Studio and your answers, scores, and model polish will be saved here automatically!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800 text-xs">
                  <span className="font-bold text-neutral-500">Your Practice Transcripts</span>
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-rose-500 hover:underline text-[11px] cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {savedSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-2xl border text-xs space-y-2 transition-all ${
                      isDark ? 'bg-neutral-850/60 border-neutral-700/80' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-md">
                        {session.role}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400">{session.date}</span>
                        <button
                          type="button"
                          onClick={() => deleteSession(session.id)}
                          className="text-neutral-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="font-bold text-neutral-800 dark:text-neutral-200">
                      "{session.question}"
                    </p>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 italic text-[11px]">
                      Your Answer: "{session.candidateAnswer}"
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                        <Award className="w-3.5 h-3.5" /> Clarity Score: {session.clarityScore}%
                      </span>
                      <span className="text-neutral-400 text-[10px]">
                        Saved in Local Profile
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
