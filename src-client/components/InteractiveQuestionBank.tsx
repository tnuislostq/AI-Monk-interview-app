import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface InteractiveQuestionBankProps {
  onPracticeQuestion: (question: string) => void;
}

export const InteractiveQuestionBank: React.FC<InteractiveQuestionBankProps> = ({
  onPracticeQuestion,
}) => {
  const { isDark } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const questions = [
    {
      id: 0,
      category: 'behavioral',
      title: 'Why should we hire you over other qualified candidates?',
      anxiousAnswer:
        '"Well, um, I work really hard and I don\'t stop until the job is done. I have good grades and I am very passionate about coding. I really need this job and I promise I will not let you down."',
      zenAnswer:
        '"Most engineers bring technical proficiency; my distinct value is marrying technical precision with low team friction. In my last tenure, I reduced deployment incidents by 34% by establishing clear asynchronous RFC reviews. I bring calm execution, not just code, to your sprint cycles."',
      breakdown: 'Replaced emotional pleading with concrete operational leverage.',
    },
    {
      id: 1,
      category: 'technical',
      title: 'How do you handle a production outage when under severe pressure?',
      anxiousAnswer:
        '"I start panicking a bit inside, but I try to look at logs. Sometimes managers are yelling on Slack, so I just try to push a quick patch as fast as possible to make the alert turn green."',
      zenAnswer:
        '"In an active outage, speed without stillness creates secondary bugs. My first step is triage isolation: roll back the last release to restore customer SLA immediately. Step two is silent log analysis with a dedicated incident lead. Step three is a blameless post-mortem so the system heals permanently."',
      breakdown: 'Exhibits high executive composure, systematic containment, and systemic learning.',
    },
    {
      id: 2,
      category: 'leadership',
      title: 'Tell me about a time you strongly disagreed with a senior leader.',
      anxiousAnswer:
        '"My manager wanted to use a database that was terrible. I told him in a meeting that it wouldn\'t scale, but he did it anyway and it failed just like I predicted."',
      zenAnswer:
        '"I disagreed with our VP regarding an in-house caching layer versus managed Redis. Rather than debating opinions, I built a 2-day benchmark testing 10,000 req/sec latency. The data demonstrated a 40ms bottleneck in the custom build. He appreciated having empirical evidence, and we chose Redis together."',
      breakdown: 'Demonstrates egoless advocacy through empirical evidence rather than personal conflict.',
    },
    {
      id: 3,
      category: 'negotiation',
      title: 'What are your salary expectations for this role?',
      anxiousAnswer:
        '"I was making 95k at my last job, so maybe like 105k? But honestly whatever is fair for your budget is fine with me, I just really love your mission."',
      zenAnswer:
        '"Based on the strategic impact expected for this Principal role and current market benchmarks for someone with my distributed systems background, I am targeting the $145k-$160k band. However, I view compensation holistically—equity alignment and team autonomy are equally paramount."',
      breakdown: 'Grounds number in market value and impact, eliminating timid self-discounting.',
    },
  ];

  const filtered =
    selectedFilter === 'all'
      ? questions
      : questions.filter((q) => q.category === selectedFilter);

  return (
    <section
      id="bank"
      className={`py-20 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#0b0e14] border-neutral-800 text-white'
          : 'bg-[#faf8f5] border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Before & After Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            See How the Monk Refines Nervous Answers
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Compare anxious, hurried candidate responses with Master Bodhi's calm, high-impact phrasing.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'behavioral', label: 'Behavioral' },
              { id: 'technical', label: 'System & Pressure' },
              { id: 'leadership', label: 'Team Conflict' },
              { id: 'negotiation', label: 'Salary Strategy' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === f.id
                    ? 'bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 shadow-xs'
                    : isDark
                    ? 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 border border-neutral-700'
                    : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-3xl border shadow-xs overflow-hidden transition-all ${
                  isDark
                    ? 'bg-[#131722] border-neutral-800'
                    : 'bg-white border-neutral-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:opacity-90"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h3 className="font-bold text-sm sm:text-base">
                      {item.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400" />
                  )}
                </button>

                {isExpanded && (
                  <div
                    className={`p-5 sm:p-6 pt-0 border-t ${
                      isDark
                        ? 'bg-[#0f121b] border-neutral-800'
                        : 'bg-[#fbfaf8] border-neutral-100'
                    }`}
                  >
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      {/* Anxious Rambling version */}
                      <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
                        <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-400 text-xs font-bold mb-2">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Typical Anxious Response</span>
                        </div>
                        <p className="text-xs text-rose-950/80 dark:text-rose-200/90 italic leading-relaxed">
                          {item.anxiousAnswer}
                        </p>
                      </div>

                      {/* Zen Monk Refined version */}
                      <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/60">
                        <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 text-xs font-bold mb-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Master Bodhi Zen Refinement</span>
                        </div>
                        <p className="text-xs text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                          {item.zenAnswer}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <p className="text-xs text-neutral-400">
                        <strong>Key Insight:</strong> {item.breakdown}
                      </p>
                      <button
                        type="button"
                        onClick={() => onPracticeQuestion(`Help me master this question: "${item.title}"`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 hover:bg-neutral-800 px-4 py-2 rounded-full transition-all cursor-pointer active:scale-95 shadow-xs"
                      >
                        <span>Practice in Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
