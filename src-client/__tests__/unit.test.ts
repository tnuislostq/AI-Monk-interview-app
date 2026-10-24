import { describe, it, expect } from 'vitest';

// Unit logic: Timer formatter
function formatTimer(sec: number): string {
  const mins = Math.floor(sec / 60);
  const rem = sec % 60;
  return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
}

// Unit logic: Diagnostic evaluation logic
function evaluateAnswer(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const lower = text.toLowerCase();
  const flaws: string[] = [];
  const strengths: string[] = [];

  if (words < 45) {
    flaws.push('Answer is too brief (<45 words).');
  } else if (words > 230) {
    flaws.push('Answer is too verbose.');
  } else {
    strengths.push('Ideal response length.');
  }

  if (
    lower.includes('we did') ||
    lower.includes('the team did') ||
    (!lower.includes('i decided') && !lower.includes('i led') && !lower.includes('i proposed') && !lower.includes('i built'))
  ) {
    flaws.push('Heavy reliance on passive "we" language.');
  } else {
    strengths.push('Strong individual agency.');
  }

  const hasMetrics = /[\d,]+%|\$[\d,]+|[\d,]+x|[\d,]+\s*(weeks|days|hours|minutes|patients|users|req|ms)/i.test(text);
  if (!hasMetrics) {
    flaws.push('No measurable outcome or business metrics cited.');
  } else {
    strengths.push('Evidence-based delivery grounded in measurable metrics.');
  }

  const clarityScore = Math.min(98, Math.max(74, 100 - flaws.length * 8));

  return { words, flaws, strengths, clarityScore };
}

describe('Unit Tests: Core Algorithms & Formatter', () => {
  it('should format seconds into mm:ss accurately', () => {
    expect(formatTimer(0)).toBe('00:00');
    expect(formatTimer(45)).toBe('00:45');
    expect(formatTimer(65)).toBe('01:05');
    expect(formatTimer(3599)).toBe('59:59');
  });

  it('should detect passive language and missing metrics in brief answers', () => {
    const rawAnswer = 'We basically worked on a project together as a team and everyone was happy.';
    const result = evaluateAnswer(rawAnswer);

    expect(result.words).toBeLessThan(45);
    expect(result.flaws).toContain('Answer is too brief (<45 words).');
    expect(result.flaws).toContain('Heavy reliance on passive "we" language.');
    expect(result.flaws).toContain('No measurable outcome or business metrics cited.');
    expect(result.clarityScore).toBe(76);
  });

  it('should award high clarity score for metric-backed active answer', () => {
    const strongAnswer =
      'When our production database crashed, I led the incident response protocol. I decided to isolate the unindexed query and executed a rollback in 4 minutes, restoring SLA for over 50,000 active users.';
    const result = evaluateAnswer(strongAnswer);

    expect(result.strengths).toContain('Strong individual agency.');
    expect(result.strengths).toContain('Evidence-based delivery grounded in measurable metrics.');
    expect(result.clarityScore).toBeGreaterThanOrEqual(90);
  });
});
