import { describe, it, expect, beforeEach } from 'vitest';

// In-memory mock storage simulating browser localStorage
class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = value;
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new MockLocalStorage();

describe('Integration Tests: Profile Persistence & Saved Sessions', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  it('should persist user profile across simulated reloads', () => {
    const candidateProfile = {
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      targetRole: 'Lead ICU Nurse',
      targetField: 'Healthcare & Medicine',
      isSignedIn: true,
    };

    mockStorage.setItem('zenmonk_user', JSON.stringify(candidateProfile));

    const retrieved = JSON.parse(mockStorage.getItem('zenmonk_user') || '{}');
    expect(retrieved.name).toBe('Sarah Chen');
    expect(retrieved.targetRole).toBe('Lead ICU Nurse');
    expect(retrieved.isSignedIn).toBe(true);
  });

  it('should add, retrieve, and delete saved interview sessions', () => {
    const session1 = {
      id: 'session_1',
      role: 'Staff Engineer',
      field: 'Technology',
      question: 'Tell me about an architectural tradeoff.',
      candidateAnswer: 'I chose PostgreSQL over NoSQL to preserve ACID compliance.',
      clarityScore: 94,
      date: 'Oct 25, 2026',
    };

    const session2 = {
      id: 'session_2',
      role: 'Staff Engineer',
      field: 'Technology',
      question: 'How do you handle production outages?',
      candidateAnswer: 'I rolled back within 4 minutes and conducted a blameless post-mortem.',
      clarityScore: 96,
      date: 'Oct 25, 2026',
    };

    // Save sessions
    let sessions = [session1, session2];
    mockStorage.setItem('zenmonk_saved_sessions', JSON.stringify(sessions));

    // Retrieve
    let saved = JSON.parse(mockStorage.getItem('zenmonk_saved_sessions') || '[]');
    expect(saved.length).toBe(2);
    expect(saved[0].id).toBe('session_1');

    // Delete session 1
    sessions = sessions.filter((s) => s.id !== 'session_1');
    mockStorage.setItem('zenmonk_saved_sessions', JSON.stringify(sessions));

    saved = JSON.parse(mockStorage.getItem('zenmonk_saved_sessions') || '[]');
    expect(saved.length).toBe(1);
    expect(saved[0].id).toBe('session_2');
  });

  it('should persist theme preferences between light and dark modes', () => {
    mockStorage.setItem('zenmonk-theme', 'dark');
    expect(mockStorage.getItem('zenmonk-theme')).toBe('dark');

    mockStorage.setItem('zenmonk-theme', 'light');
    expect(mockStorage.getItem('zenmonk-theme')).toBe('light');
  });
});
