import { describe, it, expect } from 'vitest';

// Simulating full end-to-end interview simulation flow
interface InterviewCandidate {
  name: string;
  field: string;
  role: string;
  seniority: string;
}

interface QuestionScenario {
  id: string;
  prompt: string;
  round: string;
  focus: string;
  modelAnswer: string;
}

class ZenMonkInterviewE2ERunner {
  candidate: InterviewCandidate | null = null;
  activeQuestion: QuestionScenario | null = null;
  lastEvaluation: Record<string, unknown> | null = null;
  savedTranscripts: Array<Record<string, unknown>> = [];

  // Step 1: Onboard candidate
  setupProfile(candidate: InterviewCandidate) {
    this.candidate = candidate;
    return this;
  }

  // Step 2: Load tailored question for role
  loadScenario(question: QuestionScenario) {
    this.activeQuestion = question;
    return this;
  }

  // Step 3: Candidate submits answer, engine evaluates and creates model polish
  submitAnswer(answerText: string) {
    if (!this.candidate || !this.activeQuestion) {
      throw new Error('Candidate or question missing');
    }

    const words = answerText.split(/\s+/).filter(Boolean).length;
    const lower = answerText.toLowerCase();
    const flaws: string[] = [];
    const strengths: string[] = [];

    if (words < 40) flaws.push('Too brief');
    if (!lower.includes('i led') && !lower.includes('i decided') && !lower.includes('i built')) {
      flaws.push('Lacks active ownership');
    }
    if (!/[\d,]+%|\$[\d,]+|[\d,]+x|[\d,]+\s*(weeks|days|hours|minutes|patients|users)/i.test(answerText)) {
      flaws.push('Missing metrics');
    } else {
      strengths.push('Metric-backed evidence');
    }

    const clarityScore = Math.max(70, 100 - flaws.length * 10);

    const evaluation = {
      score: clarityScore,
      wordCount: words,
      flaws,
      strengths,
      modelAnswer: this.activeQuestion.modelAnswer,
      timestamp: Date.now(),
    };

    this.lastEvaluation = evaluation;

    // Step 4: Auto-save into candidate's history
    this.savedTranscripts.push({
      candidateName: this.candidate.name,
      role: this.candidate.role,
      question: this.activeQuestion.prompt,
      answer: answerText,
      evaluation,
    });

    return evaluation;
  }
}

describe('End-to-End (E2E) Flow: Full Interview Lifecycle', () => {
  it('should complete the entire candidate journey from discovery to saved diagnosis', () => {
    const runner = new ZenMonkInterviewE2ERunner();

    // 1. Candidate Onboarding
    runner.setupProfile({
      name: 'Dr. Marcus Vance',
      field: 'Healthcare & Medicine',
      role: 'Clinical Nurse Specialist',
      seniority: 'Senior (7+ yrs)',
    });
    expect(runner.candidate?.role).toBe('Clinical Nurse Specialist');

    // 2. Scenario Question Loaded
    runner.loadScenario({
      id: 'hosp-1',
      prompt: 'Tell me about a high-stress patient conflict and how you maintained composure.',
      round: 'Crisis Triage',
      focus: 'De-escalation & Safety',
      modelAnswer: 'At the end of a shift, I de-escalated a combative family by validating their fear and prioritizing patient stability.',
    });
    expect(runner.activeQuestion?.focus).toBe('De-escalation & Safety');

    // 3. Candidate Submits Answer
    const evaluation = runner.submitAnswer(
      'When a patient family was shouting, I decided to pull them into a private consultation room. I maintained eye contact, acknowledged their panic, and walked them through our diagnostic safety checklist, stabilizing the situation for 15 minutes.'
    );

    // 4. Verify Diagnosis Results
    expect(evaluation.score).toBeGreaterThanOrEqual(90);
    expect(evaluation.strengths).toContain('Metric-backed evidence');
    expect(evaluation.modelAnswer).toContain('combative family');

    // 5. Verify Saved Transcript
    expect(runner.savedTranscripts.length).toBe(1);
    expect(runner.savedTranscripts[0].candidateName).toBe('Dr. Marcus Vance');
    expect(runner.savedTranscripts[0].role).toBe('Clinical Nurse Specialist');
  });
});
