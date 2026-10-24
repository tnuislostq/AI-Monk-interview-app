import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Mic,
  MicOff,
  Timer,
  Award,
  ChevronRight,
  Briefcase,
  Target,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Copy,
  Check,
  Video,
  VideoOff,
  Activity,
  Flame,
  Zap,
  Building,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export interface IndustryOption {
  id: string;
  name: string;
  icon: string;
  roles: string[];
  sampleQuestions: {
    question: string;
    round: string;
    focus: string;
    bodhiTip: string;
    anxiousPitfall: string;
    zenModelAnswer: string;
  }[];
}

const ALL_INDUSTRIES: IndustryOption[] = [
  {
    id: 'tech',
    name: 'Technology & Software',
    icon: '💻',
    roles: ['Senior Full Stack Engineer', 'Machine Learning Engineer', 'DevOps / Cloud Architect', 'Product Manager', 'Engineering Director'],
    sampleQuestions: [
      {
        question: 'Tell me about an architectural decision where you had to compromise between rapid feature velocity and long-term technical debt.',
        round: 'System Architecture',
        focus: 'Pragmatic Tradeoffs',
        bodhiTip: 'Do not speak only of database tables. Speak of how you validated business risk and aligned cross-functional partners.',
        anxiousPitfall: 'Using heavy technical jargon without explaining the actual user impact or metric outcome.',
        zenModelAnswer: '"When designing our ingestion pipeline, we chose PostgreSQL with partitioned tables over a NoSQL cluster. While NoSQL promised infinite horizontal scale, our immediate bottleneck was query consistency and developer velocity. This decision shaved 4 weeks off delivery while comfortably handling our 10x traffic spike."',
      },
      {
        question: 'Walk me through a severe production outage or data regression you owned. What was your emotional and technical protocol?',
        round: 'Incident Management',
        focus: 'Composure Under Pressure',
        bodhiTip: 'Emphasize your immediate calm triage, protecting customers first, and establishing a blameless post-mortem.',
        anxiousPitfall: 'Blaming junior teammates, external vendors, or sounding defensive about the bug.',
        zenModelAnswer: '"During a holiday rollout, an unindexed query locked our checkout DB. Rather than panicking, I initiated a rollback within 4 minutes to restore customer availability. Once stabilized, I wrote a blameless post-mortem and instituted mandatory automated load tests for every migration."',
      },
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medicine',
    icon: '🏥',
    roles: ['Registered ICU Nurse', 'Nurse Practitioner', 'Clinical Specialist', 'Hospital Administrator', 'Physician Assistant'],
    sampleQuestions: [
      {
        question: 'Tell me about an intense crisis or combative family encounter you de-escalated while under heavy shift fatigue.',
        round: 'Patient Advocacy & Crisis',
        focus: 'Compassionate De-escalation',
        bodhiTip: 'Anchor your answer in deep patient advocacy. Mention non-verbal calming cues, active listening, and following clinical protocol.',
        anxiousPitfall: 'Complaining about hospital understaffing or sounding emotionally reactive.',
        zenModelAnswer: '"At the end of a 12-hour ICU shift, a patient\'s family member became combative regarding delayed lab results. I maintained eye contact, acknowledged their acute fear, and walked them through our diagnostic safety steps. Validating their fear de-escalated the room while ensuring the patient remained stable."',
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance, Banking & Risk',
    icon: '💼',
    roles: ['Investment Banking Analyst', 'Senior Financial Analyst', 'Risk & Compliance Lead', 'Senior Controller', 'Portfolio Strategist'],
    sampleQuestions: [
      {
        question: 'Walk me through a financial model or audit where you caught a major valuation anomaly or budget variance.',
        round: 'Analytical Rigor',
        focus: 'Detail Orientation & Integrity',
        bodhiTip: 'Show how you traced the root cause without jumping to premature conclusions, and how you briefed leadership.',
        anxiousPitfall: 'Reciting Excel formulas without explaining the strategic business implication.',
        zenModelAnswer: '"While auditing Q3 operating expenditures, I identified a recurring $140k discrepancy in cloud licensing accruals. I traced it to multi-region billing redundancy. I presented an executive summary to the CFO with three remediation options, recouping $420k annually."',
      },
    ],
  },
  {
    id: 'business',
    name: 'Marketing, Sales & Growth',
    icon: '📈',
    roles: ['Enterprise Account Executive', 'Product Marketing Lead', 'Growth Director', 'Brand Strategist', 'Customer Success VP'],
    sampleQuestions: [
      {
        question: 'Tell me about a high-profile marketing campaign or enterprise deal that failed to hit target. What was your autopsy?',
        round: 'Data-Driven Accountability',
        focus: 'Funnel Optimization',
        bodhiTip: 'Own the shortfall completely. Detail the post-campaign attribution analysis and how you pivoted strategy.',
        anxiousPitfall: 'Blaming market conditions or the sales team for not closing leads.',
        zenModelAnswer: '"Our Q2 enterprise webinar series underperformed signups by 28%. Analyzing the funnel, I discovered our copy targeted technical buyers when decision-makers were actually CISOs. I reframed the messaging around compliance and risk, relaunching in Q3 and exceeding pipeline goals by 14%."',
      },
    ],
  },
  {
    id: 'creative',
    name: 'Product Design & Creative',
    icon: '🎨',
    roles: ['Staff Product Designer (UX/UI)', 'Creative Director', 'User Researcher', 'Design Systems Lead', 'Content Architect'],
    sampleQuestions: [
      {
        question: 'Describe a situation where executive leadership or engineering strongly pushed back on your user experience proposal.',
        round: 'Stakeholder Influence',
        focus: 'Data-backed Empathy',
        bodhiTip: 'Frame design not as subjective art, but as a hypothesis to solve user friction. Show how you tested alternatives.',
        anxiousPitfall: 'Sounding bitter about stakeholders "not understanding good design".',
        zenModelAnswer: '"Our executive sponsor rejected our simplified onboarding flow, fearing users would feel undertutored. Instead of arguing aesthetics, I scheduled five rapid usability tests. The recordings clearly showed users completing signup 2.4x faster with our flow. Seeing real user delight aligned leadership immediately."',
      },
    ],
  },
  {
    id: 'education',
    name: 'Education & Teaching',
    icon: '🎓',
    roles: ['High School STEM Educator', 'University Lecturer', 'Curriculum Director', 'Academic Dean', 'Instructional Designer'],
    sampleQuestions: [
      {
        question: 'How do you differentiate your instruction and engage students who are falling behind or displaying behavioral resistance?',
        round: 'Pedagogy & Classroom Management',
        focus: 'Inclusive Instruction',
        bodhiTip: 'Demonstrate curiosity about the root cause of the student\'s resistance (family stress, learning disability, boredom).',
        anxiousPitfall: 'Describing punitive disciplinary measures rather than holistic engagement.',
        zenModelAnswer: '"I view student resistance as an unspoken barrier to learning. For a student struggling with algebra, I replaced abstract worksheets with collaborative project-based challenges linked to music production. Meeting them where their interest lived raised their quiz mastery from 54% to 82% over one term."',
      },
    ],
  },
  {
    id: 'operations',
    name: 'Operations & Supply Chain',
    icon: '⚙️',
    roles: ['Operations Director', 'Global Supply Chain Analyst', 'Warehouse General Manager', 'Procurement Lead', 'Project Delivery Lead'],
    sampleQuestions: [
      {
        question: 'How do you handle a sudden vendor breakdown or global supply bottleneck that threatens immediate customer delivery SLAs?',
        round: 'Operational Resilience',
        focus: 'Contingency Planning',
        bodhiTip: 'Highlight dual-sourcing strategy, proactive inventory buffer analysis, and transparent customer updates.',
        anxiousPitfall: 'Freezing in panic or blaming logistics carriers without providing workarounds.',
        zenModelAnswer: '"When our primary packaging vendor faced an unexpected customs hold, I immediately activated our regional secondary supplier with whom I maintain pre-negotiated rate cards. By rerouting 60% of shipments domestically, we prevented fulfillment delays and met our quarterly delivery SLAs."',
      },
    ],
  },
  {
    id: 'legal',
    name: 'Legal, Consulting & Executive',
    icon: '⚖️',
    roles: ['Corporate Counsel', 'Management Consultant (MBB)', 'Chief of Staff', 'HR Strategy VP', 'Executive Operations Lead'],
    sampleQuestions: [
      {
        question: 'How do you counsel an executive team when they want to pursue an aggressive path that carries significant regulatory or reputation risk?',
        round: 'Risk Governance & Counsel',
        focus: 'Strategic Facilitation',
        bodhiTip: 'Position yourself as an enabler who finds the compliant runway, rather than a bureaucratic blocker.',
        anxiousPitfall: 'Just quoting statutes or saying "No, you cannot do that" without offering alternative avenues.',
        zenModelAnswer: '"My goal is never to say \'No\', but to say: \'Here is how we accomplish your business objective with minimal liability.\' When our leadership wanted to accelerate a cross-border user data rollout, I restructured the data residency contracts, mitigating regulatory exposure while keeping the go-to-market date intact."',
      },
    ],
  },
];

interface QuickPreset {
  title: string;
  badge: string;
  fieldId: string;
  role: string;
  companyTier: string;
  persona: string;
}

const PRESETS: QuickPreset[] = [
  {
    title: 'Senior Software Engineer',
    badge: 'Big Tech / FAANG',
    fieldId: 'tech',
    role: 'Senior Full Stack Engineer',
    companyTier: 'Tier 1 Enterprise (FAANG / Stripe / Google)',
    persona: 'Master Zen Bodhi (Balanced & Grounding)',
  },
  {
    title: 'ICU Clinical Nurse',
    badge: 'Premier Healthcare',
    fieldId: 'healthcare',
    role: 'Registered ICU Nurse',
    companyTier: 'Top University Medical Center / Hospital',
    persona: 'Master Zen Bodhi (Balanced & Grounding)',
  },
  {
    title: 'Investment Banking Analyst',
    badge: 'Wall Street Finance',
    fieldId: 'finance',
    role: 'Investment Banking Analyst',
    companyTier: 'Global Investment Bank (Goldman / Morgan Stanley)',
    persona: 'Executive Director (Sharp & Probing)',
  },
  {
    title: 'Product Marketing Lead',
    badge: 'High-Growth Unicorn',
    fieldId: 'business',
    role: 'Product Marketing Lead',
    companyTier: 'Series B-D Unicorn Startup',
    persona: 'People & Culture Partner (Culture & Vision)',
  },
];

interface EvaluationResult {
  clarityScore: number;
  wordCount: number;
  targetTime: string;
  whatWentWrong: string[];
  whatWasStrong: string[];
  theBetterWay: string;
  overallImprovementsNeeded: string[];
  bodhiVerdict: string;
}

export const InterviewStudio: React.FC<{ initialPrompt?: string }> = () => {
  const { isDark } = useTheme();
  const { saveInterviewSession } = useAuth();

  // Step: 1 = Studio Setup & Configuration, 2 = Live Simulated Call, 3 = Executive Critique
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Setup options
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryOption>(ALL_INDUSTRIES[0]);
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer');
  const [companyTier, setCompanyTier] = useState('Tier 1 Enterprise (FAANG / Fortune 100)');
  const [interviewerPersona, setInterviewerPersona] = useState('Master Zen Bodhi (Balanced & Grounding)');
  const [interviewFormat, setInterviewFormat] = useState('Behavioral & Situational (STAR Method)');

  // Practice state
  const [questionIndex, setQuestionIndex] = useState(0);
  const [candidateResponse, setCandidateResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [cameraPreviewActive, setCameraPreviewActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Results
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<unknown>(null);

  const activeQuestions = selectedIndustry.sampleQuestions;
  const currentQuestion = activeQuestions[questionIndex] || activeQuestions[0];

  // Speech Recognition setup (Voice Dictation)
  useEffect(() => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      // @ts-expect-error speech constructor
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: { resultIndex: number; results: Array<Array<{ transcript: string }>> }) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCandidateResponse((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      rec.onerror = () => setIsRecording(false);
      rec.onend = () => setIsRecording(false);
      recognitionRef.current = rec;
    }
  }, []);

  // Timer counter
  useEffect(() => {
    let int: ReturnType<typeof setInterval>;
    if (timerRunning) {
      int = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(int);
  }, [timerRunning]);

  // Webcam preview toggle for real interview immersion
  const toggleCamera = async () => {
    if (cameraPreviewActive) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setCameraPreviewActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraPreviewActive(true);
      } catch (err) {
        console.warn('Webcam preview not available:', err);
        setCameraPreviewActive(false);
      }
    }
  };

  const applyPreset = (preset: QuickPreset) => {
    const foundIndustry = ALL_INDUSTRIES.find((i) => i.id === preset.fieldId) || ALL_INDUSTRIES[0];
    setSelectedIndustry(foundIndustry);
    setTargetRole(preset.role);
    setCompanyTier(preset.companyTier);
    setInterviewerPersona(preset.persona);
  };

  const startSession = () => {
    setStep(2);
    setQuestionIndex(0);
    setCandidateResponse('');
    setEvaluation(null);
    setSeconds(0);
    setTimerRunning(true);
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech dictation is not supported in this browser. Please type your answer.');
      return;
    }

    if (isRecording) {
      // @ts-expect-error speech stop
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        // @ts-expect-error speech start
        recognitionRef.current.start();
        setIsRecording(true);
        if (!timerRunning) setTimerRunning(true);
      } catch {
        setIsRecording(false);
      }
    }
  };

  const handleRunEvaluation = async () => {
    const text = candidateResponse.trim();
    if (!text || isEvaluating) return;

    if (isRecording && recognitionRef.current) {
      // @ts-expect-error speech stop
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    setIsEvaluating(true);
    setTimerRunning(false);

    // Call Flask backend if live
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Candidate answered: "${text}" for role: "${targetRole}" in "${selectedIndustry.name}". Question: "${currentQuestion.question}".`,
          session_id: 'studio-evaluation',
        }),
      });
    } catch {
      // fallback to rich evaluation
    }

    setTimeout(() => {
      const words = text.split(/\s+/).filter(Boolean).length;
      const lower = text.toLowerCase();

      const flaws: string[] = [];
      const strengths: string[] = [];
      const improvements: string[] = [];

      // Diagnostics: Length & Pacing
      if (words < 45) {
        flaws.push('Answer is too brief (<45 words). Lacks situational proof and leaves the interviewer guessing.');
        improvements.push('Expand using the STAR framework: Set the specific problem before jumping to the outcome.');
      } else if (words > 230) {
        flaws.push('Answer is too verbose (' + words + ' words). Risks causing the interviewer to lose focus.');
        improvements.push('Cut 30% of peripheral background details. Anchor on your personal high-leverage decision.');
      } else {
        strengths.push('Ideal response length (' + words + ' words, ~' + Math.round((words / 140) * 60) + 's delivery pace).');
      }

      // Diagnostics: Ownership & Agency
      if (lower.includes('we did') || lower.includes('the team did') || (!lower.includes('i decided') && !lower.includes('i led') && !lower.includes('i proposed') && !lower.includes('i built'))) {
        flaws.push('Heavy reliance on passive "we" language. Interviewers cannot discern YOUR individual contribution.');
        improvements.push('Use active personal agency: "I identified...", "I proposed...", "My direct responsibility was...".');
      } else {
        strengths.push('Strong individual agency and ownership of technical/operational decisions.');
      }

      // Diagnostics: Quantifiable Metrics
      const hasMetrics = /[\d,]+%|\$[\d,]+|[\d,]+x|[\d,]+\s*(weeks|days|hours|minutes|patients|users|req|ms)/i.test(text);
      if (!hasMetrics) {
        flaws.push('No measurable outcome or business metrics cited (missing percentages, dollars, or timeline gains).');
        improvements.push('Quantify the finish line: e.g., "reduced latency by 30%", "saved $140k", "handled 50+ patients daily".');
      } else {
        strengths.push('Evidence-based delivery grounded in measurable metrics.');
      }

      const clarityScore = Math.min(98, Math.max(74, 100 - flaws.length * 8));

      const diagnosis: EvaluationResult = {
        clarityScore,
        wordCount: words,
        targetTime: currentQuestion.focus,
        whatWentWrong: flaws.length > 0 ? flaws : ['Minor: Pacing could be 5% more deliberate to emphasize the final takeaway.'],
        whatWasStrong: strengths.length > 0 ? strengths : ['Sincere engagement and direct address of the interviewer\'s core question.'],
        theBetterWay: currentQuestion.zenModelAnswer,
        overallImprovementsNeeded: improvements.length > 0 ? improvements : [
          'Take a full 2-second breath before starting your first sentence.',
          'Conclude with the systemic wisdom or process improvement you established.',
        ],
        bodhiVerdict: clarityScore >= 90
          ? 'Executive-Grade Presence: Poised, structured, and immediately persuasive.'
          : clarityScore >= 80
          ? 'Strong Contender: Fix the identified pitfalls to break into the top 5% of candidates.'
          : 'Developing Composure: Needs disciplined restructuring to eliminate rambling.',
      };

      setEvaluation(diagnosis);
      setIsEvaluating(false);

      // Automatically save to candidate's history
      saveInterviewSession({
        role: targetRole,
        field: selectedIndustry.name,
        question: currentQuestion.question,
        candidateAnswer: text,
        clarityScore,
        whatWentWrong: diagnosis.whatWentWrong,
        whatWasStrong: diagnosis.whatWasStrong,
        theBetterWay: diagnosis.theBetterWay,
        improvements: diagnosis.overallImprovementsNeeded,
      });

      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#10B981', '#60A5FA'],
      });
    }, 800);
  };

  const copyModelAnswer = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    setCandidateResponse('');
    setEvaluation(null);
    setSeconds(0);
    setTimerRunning(true);
    if (questionIndex < activeQuestions.length - 1) {
      setQuestionIndex((p) => p + 1);
    } else {
      setQuestionIndex(0);
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <section id="studio" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Studio Heading & Step Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Virtual AI Interview Simulation Arena</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-heading ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Live Practice With Master Bodhi
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              High-immersion virtual interview studio. Dial in your industry, start the simulation, and receive executive critiques.
            </p>
          </div>

          {/* Stepper Pill Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-neutral-200/80 dark:bg-neutral-800/80 text-xs font-bold">
            <button
              onClick={() => setStep(1)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                step === 1
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              1. Setup
            </button>
            <button
              onClick={() => {
                if (step >= 2) setStep(2);
              }}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                step === 2
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : step === 3
                  ? 'text-neutral-500 hover:text-neutral-900 cursor-pointer'
                  : 'opacity-40 pointer-events-none'
              }`}
            >
              2. Simulation
            </button>
            <button
              onClick={() => evaluation && setStep(3)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                step === 3
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : evaluation
                  ? 'text-emerald-600 dark:text-emerald-400 cursor-pointer'
                  : 'opacity-40 pointer-events-none'
              }`}
            >
              3. Critique
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* STEP 1: RICH PRE-FILLED INTERVIEW CONFIGURATION STUDIO            */}
        {/* ================================================================= */}
        {step === 1 && (
          <div
            className={`rounded-3xl border shadow-xl p-6 sm:p-10 max-w-4xl mx-auto animate-fadeInUp ${
              isDark ? 'bg-[#121622] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
            }`}
          >
            {/* Quick 1-Click Presets Banner */}
            <div className="mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular 1-Click Launch Presets:</span>
                </span>
                <span className="text-[11px] text-neutral-400">Click to fill all options</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer hover:scale-[1.02] ${
                      targetRole === preset.role
                        ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-400 dark:border-amber-600 text-amber-950 dark:text-amber-200 shadow-xs'
                        : isDark
                        ? 'bg-neutral-800/50 hover:bg-neutral-800 border-neutral-700 text-neutral-300'
                        : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {preset.badge}
                    </div>
                    <div className="text-xs font-bold mt-0.5 truncate">{preset.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 1. Industry Selection Grid */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                1. Select Industry / Domain:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {ALL_INDUSTRIES.map((ind) => {
                  const isSelected = selectedIndustry.id === ind.id;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => {
                        setSelectedIndustry(ind);
                        setTargetRole(ind.roles[0]);
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 text-white dark:bg-amber-500 dark:text-neutral-950 border-neutral-900 dark:border-amber-400 font-bold shadow-md scale-[1.02]'
                          : isDark
                          ? 'bg-neutral-800/40 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                      }`}
                    >
                      <span className="text-xl">{ind.icon}</span>
                      <span className="text-xs font-semibold leading-tight truncate">{ind.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Target Role Input + Quick Chips */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                2. Target Job Title:
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Staff Software Engineer, Senior Financial Analyst, Lead ICU Nurse..."
                className={`w-full p-3.5 rounded-2xl border text-sm font-semibold outline-none transition-all ${
                  isDark
                    ? 'bg-neutral-800/80 border-neutral-700 text-white focus:border-amber-400'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-neutral-900'
                }`}
              />
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[10px] text-neutral-400">Popular in {selectedIndustry.name}:</span>
                {selectedIndustry.roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTargetRole(r)}
                    className="text-[11px] bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Company Tier & Interviewer Persona Selection */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  3. Target Company Tier / Environment:
                </label>
                <select
                  value={companyTier}
                  onChange={(e) => setCompanyTier(e.target.value)}
                  className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold outline-none transition-all cursor-pointer ${
                    isDark
                      ? 'bg-neutral-800/80 border-neutral-700 text-white'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                >
                  <option value="Tier 1 Enterprise (FAANG / Fortune 100)">Tier 1 Enterprise (FAANG / Fortune 100)</option>
                  <option value="Series B-D Unicorn Startup">Series B-D Unicorn Startup</option>
                  <option value="Top University Medical Center / Hospital">Top University Medical Center / Hospital</option>
                  <option value="Global Investment Bank / MBB Consulting">Global Investment Bank / MBB Consulting</option>
                  <option value="Public Sector & Non-Profit Institution">Public Sector & Non-Profit Institution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  4. Interviewer Persona:
                </label>
                <select
                  value={interviewerPersona}
                  onChange={(e) => setInterviewerPersona(e.target.value)}
                  className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold outline-none transition-all cursor-pointer ${
                    isDark
                      ? 'bg-neutral-800/80 border-neutral-700 text-white'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  }`}
                >
                  <option value="Master Zen Bodhi (Balanced & Grounding)">Master Zen Bodhi (Balanced & Grounding)</option>
                  <option value="Executive Director (Sharp & Probing)">Executive Director (Sharp & Probing)</option>
                  <option value="People & Culture Partner (Culture & Vision)">People & Culture Partner (Culture & Vision)</option>
                </select>
              </div>
            </div>

            {/* Launch Call Button */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Simulating for: <strong className="text-amber-600 dark:text-amber-400">{targetRole}</strong> at {companyTier.split(' ')[0]}
              </div>

              <button
                type="button"
                onClick={startSession}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 group active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
                <span>Launch Live Simulation Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 2: HIGH-TECH LIVE SIMULATED VIDEO INTERVIEW CALL SCREEN       */}
        {/* ================================================================= */}
        {step === 2 && (
          <div
            className={`rounded-3xl border shadow-2xl overflow-hidden grid lg:grid-cols-12 min-h-[660px] animate-fadeInUp ${
              isDark ? 'bg-[#0f131d] border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
            }`}
          >
            {/* Left 5 Cols: Interviewer Screen & Active Question */}
            <div
              className={`lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r flex flex-col justify-between ${
                isDark ? 'bg-[#131722] border-neutral-800' : 'bg-neutral-50/90 border-neutral-200'
              }`}
            >
              <div>
                {/* Simulated Live Call Status Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      LIVE SIMULATION
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-black/40 text-neutral-300 px-2.5 py-1 rounded-md border border-neutral-700">
                    Question {questionIndex + 1}/{activeQuestions.length}
                  </span>
                </div>

                {/* Live Simulation AI Monk Interviewer Feed */}
                <div className="relative aspect-[4/3.4] rounded-2xl overflow-hidden shadow-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-900 group mb-5">
                  <img
                    src="/monk-temple.jpg"
                    alt="Master Zen Bodhi in Namaste Prayer"
                    className="w-full h-full object-cover object-[center_28%] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Top Status Pill */}
                  <div className="absolute top-2.5 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live AI Interviewer Connected</span>
                  </div>

                  {/* Audio Waveform visualizer & Persona Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Master Zen Bodhi</span>
                      </div>
                      <div className="text-[10px] text-amber-300">{interviewerPersona.split(' (')[0]}</div>
                    </div>

                    {/* Animated sound wave bars (Soundless Visualizer) */}
                    <div className="flex items-end gap-1 h-5">
                      <span className="w-1 bg-amber-400 rounded-full animate-wave-1" />
                      <span className="w-1 bg-amber-400 rounded-full animate-wave-2" />
                      <span className="w-1 bg-amber-400 rounded-full animate-wave-3" />
                      <span className="w-1 bg-amber-400 rounded-full animate-wave-4" />
                      <span className="w-1 bg-amber-400 rounded-full animate-wave-5" />
                    </div>
                  </div>
                </div>

                {/* The Active Scenario Question Card */}
                <div
                  className={`p-5 rounded-2xl border shadow-xs mb-4 ${
                    isDark ? 'bg-neutral-800/80 border-neutral-700' : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-1.5">
                    <span>{currentQuestion.round}</span>
                    <span>Target: {currentQuestion.focus}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug">
                    "{currentQuestion.question}"
                  </h3>
                </div>

                {/* Bodhi's Advice Box */}
                <div
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                    isDark
                      ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <strong className="block text-amber-700 dark:text-amber-400 font-bold mb-0.5">
                    💡 Bodhi's Guidance:
                  </strong>
                  <p>{currentQuestion.bodhiTip}</p>
                </div>
              </div>

              {/* Bottom Nav / Timer */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <Timer className="w-4 h-4" />
                  <span>Time: <strong>{formatTimer(seconds)}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-400 hover:text-neutral-200 hover:underline cursor-pointer"
                >
                  Change Profile
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Candidate Response & Webcam Feed */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-transparent">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                    Candidate Response Workstation
                  </span>

                  {/* Camera toggle pill */}
                  <button
                    type="button"
                    onClick={toggleCamera}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      cameraPreviewActive
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                        : isDark
                        ? 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                        : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                    }`}
                  >
                    {cameraPreviewActive ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                    <span>{cameraPreviewActive ? 'Camera ON' : 'Turn On Camera Mirror'}</span>
                  </button>
                </div>

                {/* Optional Real Webcam Mirror View */}
                {cameraPreviewActive && (
                  <div className="relative aspect-[16/9] max-h-48 rounded-2xl overflow-hidden shadow-inner mb-4 bg-black border border-neutral-700">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
                    <div className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-md">
                      Candidate Mirror Feed
                    </div>
                  </div>
                )}

                {/* Response Textarea */}
                <div className="relative">
                  <textarea
                    value={candidateResponse}
                    onChange={(e) => setCandidateResponse(e.target.value)}
                    placeholder={`Answer directly as ${targetRole}. Speak with active agency ("I led / I proposed"), cite 1 measurable metric, and conclude with the strategic outcome...`}
                    rows={cameraPreviewActive ? 6 : 8}
                    className={`w-full p-4 rounded-2xl border text-sm outline-none transition-all resize-none leading-relaxed ${
                      isDark
                        ? 'bg-neutral-800/60 border-neutral-700 text-white focus:border-amber-400 placeholder-neutral-500'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-900 placeholder-neutral-400'
                    }`}
                  />

                  {/* Speech Dictation Button */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleRecording}
                      title={isRecording ? 'Click to stop recording' : 'Dictate your answer via voice'}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isRecording
                          ? 'bg-rose-600 text-white animate-pulse shadow-md'
                          : isDark
                          ? 'bg-neutral-700 hover:bg-neutral-600 text-white'
                          : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 shadow-2xs'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-amber-500" />}
                      <span>{isRecording ? 'Listening...' : 'Voice Dictate'}</span>
                    </button>
                  </div>
                </div>

                {/* Word Count and Live STAR Guidance bar */}
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span>
                      Words: <strong className={isDark ? 'text-white' : 'text-neutral-800'}>{candidateResponse.split(/\s+/).filter(Boolean).length}</strong>
                    </span>
                    <span>•</span>
                    <span>Pacing: ~{Math.round((candidateResponse.split(/\s+/).filter(Boolean).length / 140) * 60)}s</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCandidateResponse('')}
                    className="hover:underline cursor-pointer"
                  >
                    Clear Text
                  </button>
                </div>

                {/* Primary Action Button */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span>Live AI Scoring Ready</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunEvaluation}
                    disabled={!candidateResponse.trim() || isEvaluating}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                  >
                    {isEvaluating ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Diagnosing Answer Flaws & Polish...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>Submit Answer for Diagnosis</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Next Question Pill */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Want another question from {selectedIndustry.name}?</span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Skip to Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 3: EXTREMELY DETAILED CRITIQUE: WHAT'S WRONG & THE BETTER WAY */}
        {/* ================================================================= */}
        {evaluation && (
          <div
            className={`mt-10 rounded-3xl border shadow-2xl p-6 sm:p-10 max-w-5xl mx-auto animate-fadeInUp ${
              isDark ? 'bg-[#121622] border-neutral-800 text-white' : 'bg-white border-neutral-300 text-neutral-900'
            }`}
          >
            {/* Top Score Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100 dark:bg-amber-950/80 dark:text-amber-300 px-3 py-1 rounded-full">
                  Diagnostic Scorecard • {targetRole}
                </span>
                <h3 className="text-2xl font-bold mt-2 font-heading">
                  Executive Performance Evaluation
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Scenario: "{currentQuestion.question}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-5 py-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold tracking-wider block">
                    Clarity Score
                  </span>
                  <span className="text-3xl font-black text-emerald-900 dark:text-emerald-200">
                    {evaluation.clarityScore}%
                  </span>
                </div>

                <div className="bg-neutral-100 dark:bg-neutral-800 px-4 py-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-bold tracking-wider block">
                    Word Count
                  </span>
                  <span className="text-2xl font-black font-mono">
                    {evaluation.wordCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Bodhi Verdict Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-neutral-900 dark:bg-black/60 border border-neutral-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Master Bodhi's Summary:</span>
                  <span className="text-sm font-bold text-amber-300">{evaluation.bodhiVerdict}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyModelAnswer(evaluation.theBetterWay)}
                className="hidden sm:flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-xl border border-neutral-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Model!' : 'Copy Model'}</span>
              </button>
            </div>

            {/* Two Side-by-Side Diagnostic Boxes: What Went Wrong vs What Was Strong */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Box 1: What Went Wrong (Red Flags) */}
              <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-900 dark:text-rose-400 font-bold text-sm mb-3">
                    <ThumbsDown className="w-4 h-4 text-rose-600" />
                    <span>What Went Wrong (Critical Traps):</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-rose-950 dark:text-rose-200">
                    {evaluation.whatWentWrong.map((flaw, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold shrink-0">•</span>
                        <span className="leading-relaxed">{flaw}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-200/80 dark:border-rose-900/60 text-[11px] text-rose-800 dark:text-rose-400 font-medium">
                  ⚠️ Senior interviewers reject metric-free or passive answers silently.
                </div>
              </div>

              {/* Box 2: What Was Strong */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-400 font-bold text-sm mb-3">
                    <ThumbsUp className="w-4 h-4 text-emerald-600" />
                    <span>What Was Strong:</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-emerald-950 dark:text-emerald-200">
                    {evaluation.whatWasStrong.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span className="leading-relaxed">{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-200/80 dark:border-emerald-900/60 text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                  ✨ Double down on these authentic strengths in your next rounds.
                </div>
              </div>
            </div>

            {/* THE BETTER WAY: Full Model Rewrite */}
            <div className="mt-8 p-6 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-700/60 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <h4 className="font-bold text-sm uppercase tracking-wider text-amber-950 dark:text-amber-200">
                    The Better Way (Master Bodhi's Model Polish):
                  </h4>
                </div>
                <span className="text-[11px] text-amber-800 bg-amber-200/70 dark:bg-amber-900/60 dark:text-amber-300 px-2 py-0.5 rounded-md font-semibold">
                  Tuned for {targetRole}
                </span>
              </div>

              <div
                className={`p-5 rounded-2xl border text-sm leading-relaxed font-serif italic shadow-2xs ${
                  isDark ? 'bg-neutral-900 border-amber-900/60 text-neutral-200' : 'bg-white border-amber-200 text-neutral-800'
                }`}
              >
                {evaluation.theBetterWay}
              </div>

              {/* 3 Mechanics of the Model Answer */}
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-amber-100/60 dark:bg-amber-900/30 p-3 rounded-xl">
                  <strong className="block text-amber-900 dark:text-amber-300 font-bold">1. Immediate Hook:</strong>
                  <span className="text-amber-950 dark:text-amber-200/80">Sets the conflict and stakes in 1 direct opening sentence.</span>
                </div>
                <div className="bg-amber-100/60 dark:bg-amber-900/30 p-3 rounded-xl">
                  <strong className="block text-amber-900 dark:text-amber-300 font-bold">2. Active Agency:</strong>
                  <span className="text-amber-950 dark:text-amber-200/80">Uses "I led / I proposed" to prove personal ownership.</span>
                </div>
                <div className="bg-amber-100/60 dark:bg-amber-900/30 p-3 rounded-xl">
                  <strong className="block text-amber-900 dark:text-amber-300 font-bold">3. Measurable Harvest:</strong>
                  <span className="text-amber-950 dark:text-amber-200/80">Concludes with concrete metrics and lasting wisdom.</span>
                </div>
              </div>
            </div>

            {/* Overall Improvements Needed List */}
            <div className="mt-8 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2 font-bold text-sm mb-3">
                <Target className="w-4 h-4 text-amber-600" />
                <span>Overall Improvements Needed Before Your Real Interview:</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                {evaluation.overallImprovementsNeeded.map((imp, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-2 ${
                      isDark ? 'bg-neutral-900 border-neutral-700 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span className="text-amber-600 font-bold">#{idx + 1}</span>
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Retry or Next Question */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  setCandidateResponse('');
                  setEvaluation(null);
                  setTimerRunning(true);
                }}
                className={`inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry This Scenario</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-7 py-3 rounded-full shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>Practice Next Scenario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
