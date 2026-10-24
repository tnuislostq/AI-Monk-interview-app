import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SavedSession {
  id: string;
  role: string;
  field: string;
  question: string;
  candidateAnswer: string;
  clarityScore: number;
  whatWentWrong: string[];
  whatWasStrong: string[];
  theBetterWay: string;
  improvements: string[];
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  targetRole: string;
  targetField: string;
  isSignedIn: boolean;
}

interface AuthContextType {
  user: UserProfile;
  savedSessions: SavedSession[];
  signIn: (name: string, email: string, targetRole?: string, targetField?: string) => void;
  signOut: () => void;
  saveInterviewSession: (session: Omit<SavedSession, 'id' | 'date'>) => void;
  deleteSession: (id: string) => void;
  clearHistory: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Candidate',
  email: '',
  targetRole: 'Senior Full Stack Engineer',
  targetField: 'Technology & Software',
  isSignedIn: false,
};

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USER,
  savedSessions: [],
  signIn: () => {},
  signOut: () => {},
  saveInterviewSession: () => {},
  deleteSession: () => {},
  clearHistory: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('zenmonk_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [savedSessions, setSavedSessions] = useState<SavedSession[]>(() => {
    try {
      const saved = localStorage.getItem('zenmonk_saved_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zenmonk_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zenmonk_saved_sessions', JSON.stringify(savedSessions));
  }, [savedSessions]);

  const signIn = (name: string, email: string, targetRole = 'Senior Candidate', targetField = 'Technology & Software') => {
    setUser({
      name: name.trim() || 'Candidate',
      email: email.trim(),
      targetRole,
      targetField,
      isSignedIn: true,
    });
  };

  const signOut = () => {
    setUser(DEFAULT_USER);
  };

  const saveInterviewSession = (data: Omit<SavedSession, 'id' | 'date'>) => {
    const newSession: SavedSession = {
      ...data,
      id: `session_${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setSavedSessions((prev) => [newSession, ...prev]);
  };

  const deleteSession = (id: string) => {
    setSavedSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const clearHistory = () => {
    setSavedSessions([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        savedSessions,
        signIn,
        signOut,
        saveInterviewSession,
        deleteSession,
        clearHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
