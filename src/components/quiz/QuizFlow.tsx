"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { STAGE_1_QUESTIONS, STAGE_2_QUESTIONS } from "@/lib/quiz-data";
import type { QuizOption, StageQuestion } from "@/lib/quiz-data";
import type { Stage3Data } from "@/lib/quiz-scoring";

// ─── Types ────────────────────────────────────────────────────────────────────

type QuizView =
  | "stage1"
  | "stage1_gate"
  | "stage2"
  | "stage2_gate"
  | "stage3"
  | "complete";

type QuizAnswers = Record<string, string | string[]>;

interface CompletePayload {
  primaryArch: string;
  primaryFinish: string;
  styleBlend: string;
  costRange: string;
}

const DEFAULT_S3: Stage3Data = {
  squareFootage: "",
  stories: "",
  bedrooms: "",
  bathrooms: "",
  garageSpaces: "",
  poolPreference: "",
  outdoorKitchen: false,
  budgetRange: "",
  timeline: "",
  lotStatus: "",
  lastName: "",
  phone: "",
  buildLocation: "",
  contactPreference: "",
  meetingType: "",
  notes: "",
};

// ─── Main QuizFlow component ──────────────────────────────────────────────────

export default function QuizFlow() {
  const [view, setView]           = useState<QuizView>("stage1");
  const [s1Idx, setS1Idx]         = useState(0);
  const [s2Idx, setS2Idx]         = useState(0);
  const [s1Answers, setS1Answers] = useState<QuizAnswers>({});
  const [s2Answers, setS2Answers] = useState<QuizAnswers>({});
  const [s3Data, setS3Data]       = useState<Stage3Data>(DEFAULT_S3);

  // Stage 1 gate: email capture
  const [gateFirstName, setGateFirstName]   = useState("");
  const [gateEmail, setGateEmail]           = useState("");
  const [gateSent, setGateSent]             = useState(false);
  const [gateLoading, setGateLoading]       = useState(false);
  const [gateError, setGateError]           = useState<string | null>(null);

  // Session ID (returned from /api/render)
  const [sessionId, setSessionId]           = useState<string | null>(null);

  // Stage 2 gate: moodboard loading
  const [moodboardSent, setMoodboardSent]   = useState(false);
  const [moodboardLoading, setMoodboardLoading] = useState(false);

  // Stage 3 submission
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [submitError, setSubmitError]       = useState<string | null>(null);
  const [completePayload, setCompletePayload] = useState<CompletePayload | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever view or question index changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view, s1Idx, s2Idx]);

  // ── Answer toggles ─────────────────────────────────────────────────────────

  const toggleAnswer = useCallback(
    (
      answers: QuizAnswers,
      setAnswers: React.Dispatch<React.SetStateAction<QuizAnswers>>,
      q: StageQuestion,
      optionId: string
    ) => {
      setAnswers((prev) => {
        const current = prev[q.id];
        if (q.type === "single" || q.selectionMode === "single") {
          return { ...prev, [q.id]: optionId };
        }
        const arr = Array.isArray(current) ? current : [];
        if (arr.includes(optionId)) {
          return { ...prev, [q.id]: arr.filter((id) => id !== optionId) };
        }
        // At max — block silently; QuestionView shows the user-facing message
        if (q.maxSelections && arr.length >= q.maxSelections) {
          return prev;
        }
        return { ...prev, [q.id]: [...arr, optionId] };
      });
    },
    []
  );

  const isSelected = (answers: QuizAnswers, qId: string, optId: string) => {
    const a = answers[qId];
    return Array.isArray(a) ? a.includes(optId) : a === optId;
  };

  // ── Navigation ─────────────────────────────────────────────────────────────

  const handleS1Next = () => {
    if (s1Idx < STAGE_1_QUESTIONS.length - 1) {
      setS1Idx((i) => i + 1);
    } else {
      setView("stage1_gate");
    }
  };

  const handleS1Back = () => {
    if (s1Idx > 0) setS1Idx((i) => i - 1);
  };

  const handleS2Next = () => {
    if (s2Idx < STAGE_2_QUESTIONS.length - 1) {
      setS2Idx((i) => i + 1);
    } else {
      triggerMoodboard();
    }
  };

  const handleS2Back = () => {
    if (s2Idx > 0) setS2Idx((i) => i - 1);
    else setView("stage1_gate");
  };

  // ── Stage 1 gate: submit email + trigger rendering ─────────────────────────

  const handleGateSubmit = async () => {
    if (!gateFirstName.trim() || !gateEmail.trim() || !gateEmail.includes("@")) {
      setGateError("Please enter your name and a valid email address.");
      return;
    }
    setGateLoading(true);
    setGateError(null);

    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: gateFirstName.trim(),
          email: gateEmail.trim(),
          s1Answers,
        }),
      });
      const data = await res.json() as { sessionId?: string };
      if (data.sessionId) setSessionId(data.sessionId);
      setGateSent(true);
    } catch {
      // Non-fatal — still show confirmation
      setGateSent(true);
    } finally {
      setGateLoading(false);
    }
  };

  // ── Stage 2 gate: trigger moodboard ───────────────────────────────────────

  const triggerMoodboard = async () => {
    setView("stage2_gate");
    if (!sessionId || moodboardSent) return;
    setMoodboardLoading(true);
    try {
      await fetch("/api/moodboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, s2Answers }),
      });
      setMoodboardSent(true);
    } catch {
      setMoodboardSent(true);
    } finally {
      setMoodboardLoading(false);
    }
  };

  // ── Stage 3: final submission ──────────────────────────────────────────────

  const handleFinalSubmit = async () => {
    if (!s3Data.squareFootage || !s3Data.bedrooms) {
      setSubmitError("Please complete the required project scope fields.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, s3Data }),
      });
      const data = await res.json() as CompletePayload & { status: string };
      if (data.status === "complete") {
        setCompletePayload({
          primaryArch:   data.primaryArch   ?? "",
          primaryFinish: data.primaryFinish ?? "",
          styleBlend:    data.styleBlend    ?? "",
          costRange:     data.costRange     ?? "",
        });
        setView("complete");
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Progress indicator ─────────────────────────────────────────────────────

  const totalQuestions = STAGE_1_QUESTIONS.length + STAGE_2_QUESTIONS.length;
  const answeredCount  = Object.keys(s1Answers).length + Object.keys(s2Answers).length;
  const progressPercent = Math.min(
    100,
    Math.round((answeredCount / totalQuestions) * 100)
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div ref={topRef} className="min-h-screen">
      {/* Global progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#EDE5D4]">
        <div
          className="h-full bg-[#9B6B38] transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── Stage 1 questions ── */}
      {view === "stage1" && (
        <QuestionView
          stage={1}
          totalStages={3}
          questionIndex={s1Idx}
          totalQuestions={STAGE_1_QUESTIONS.length}
          question={STAGE_1_QUESTIONS[s1Idx]}
          answers={s1Answers}
          isSelected={(qId, optId) => isSelected(s1Answers, qId, optId)}
          onToggle={(q, optId) => toggleAnswer(s1Answers, setS1Answers, q, optId)}
          onBack={handleS1Back}
          onNext={handleS1Next}
          isFirstQuestion={s1Idx === 0}
          isLastQuestion={s1Idx === STAGE_1_QUESTIONS.length - 1}
          nextLabel="Continue"
          finalLabel="Complete Exterior Discovery"
        />
      )}

      {/* ── Stage 1 gate ── */}
      {view === "stage1_gate" && (
        <Stage1Gate
          gateSent={gateSent}
          gateLoading={gateLoading}
          gateError={gateError}
          gateFirstName={gateFirstName}
          gateEmail={gateEmail}
          onFirstNameChange={setGateFirstName}
          onEmailChange={setGateEmail}
          onSubmit={handleGateSubmit}
          onContinue={() => setView("stage2")}
          onBack={() => setView("stage1")}
        />
      )}

      {/* ── Stage 2 questions ── */}
      {view === "stage2" && (
        <QuestionView
          stage={2}
          totalStages={3}
          questionIndex={s2Idx}
          totalQuestions={STAGE_2_QUESTIONS.length}
          question={STAGE_2_QUESTIONS[s2Idx]}
          answers={s2Answers}
          isSelected={(qId, optId) => isSelected(s2Answers, qId, optId)}
          onToggle={(q, optId) => toggleAnswer(s2Answers, setS2Answers, q, optId)}
          onBack={handleS2Back}
          onNext={handleS2Next}
          isFirstQuestion={s2Idx === 0}
          isLastQuestion={s2Idx === STAGE_2_QUESTIONS.length - 1}
          nextLabel="Continue"
          finalLabel="Complete Interior Discovery"
        />
      )}

      {/* ── Stage 2 gate ── */}
      {view === "stage2_gate" && (
        <Stage2Gate
          gateEmail={gateEmail}
          moodboardLoading={moodboardLoading}
          onContinue={() => setView("stage3")}
        />
      )}

      {/* ── Stage 3 form ── */}
      {view === "stage3" && (
        <Stage3Form
          data={s3Data}
          firstName={gateFirstName}
          email={gateEmail}
          onChange={setS3Data}
          onSubmit={handleFinalSubmit}
          onBack={() => setView("stage2_gate")}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}

      {/* ── Complete ── */}
      {view === "complete" && (
        <CompleteView
          firstName={gateFirstName}
          email={gateEmail}
          payload={completePayload}
        />
      )}
    </div>
  );
}

// ─── QuestionView ─────────────────────────────────────────────────────────────

function QuestionView({
  stage,
  totalStages,
  questionIndex,
  totalQuestions,
  question,
  answers,
  isSelected,
  onToggle,
  onBack,
  onNext,
  isFirstQuestion,
  isLastQuestion,
  nextLabel,
  finalLabel,
}: {
  stage: number;
  totalStages: number;
  questionIndex: number;
  totalQuestions: number;
  question: StageQuestion;
  answers: QuizAnswers;
  isSelected: (qId: string, optId: string) => boolean;
  onToggle: (q: StageQuestion, optId: string) => void;
  onBack: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  nextLabel: string;
  finalLabel: string;
}) {
  const [maxSelMsg, setMaxSelMsg] = useState<string | null>(null);

  // Clear message whenever the question changes
  useEffect(() => {
    setMaxSelMsg(null);
  }, [question.id]);

  const handleOptionClick = (optId: string) => {
    const current = answers[question.id];
    const arr = Array.isArray(current) ? current : [];
    const alreadySelected = arr.includes(optId);

    // If we're at max and the user taps a NEW option → show message, don't toggle
    if (question.maxSelections && arr.length >= question.maxSelections && !alreadySelected) {
      setMaxSelMsg("You've selected 2. Remove one to choose a different option.");
      return;
    }

    setMaxSelMsg(null);
    onToggle(question, optId);
  };

  const hasAnswer = (() => {
    const a = answers[question.id];
    return Array.isArray(a) ? a.length > 0 : Boolean(a);
  })();

  const cols = question.options.length <= 4
    ? "grid-cols-2"
    : question.options.length === 6
    ? "grid-cols-2 sm:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-4";

  return (
    <div className="min-h-screen bg-[#F5EFE4]">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">

        {/* Stage header */}
        <div className="flex items-center gap-3 mb-8">
          {Array.from({ length: totalStages }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${
                i + 1 === stage ? "text-[#9B6B38]" : i + 1 < stage ? "text-[#9B6B38]/50" : "text-[#78716C]/40"
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                  i + 1 < stage
                    ? "bg-[#9B6B38] border-[#9B6B38] text-white"
                    : i + 1 === stage
                    ? "border-[#9B6B38] text-[#9B6B38]"
                    : "border-[#78716C]/30 text-[#78716C]/40"
                }`}>
                  {i + 1 < stage ? "✓" : i + 1}
                </div>
                <span className="hidden sm:inline">
                  {["Exterior", "Interior", "Details"][i]}
                </span>
              </div>
              {i < totalStages - 1 && (
                <div className={`h-px w-8 sm:w-12 ${i + 1 < stage ? "bg-[#9B6B38]/40" : "bg-[#EDE5D4]"}`} />
              )}
            </div>
          ))}
          <div className="ml-auto text-[#78716C] text-xs">
            {questionIndex + 1} / {totalQuestions}
          </div>
        </div>

        {/* Question */}
        <h2 className="font-display font-bold text-[#1C1A15] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2">
          {question.heading ?? question.prompt}
        </h2>
        <p className="text-[#78716C] text-sm mb-8">
          {question.subheading
            ? question.subheading
            : question.type === "single" || question.selectionMode === "single"
            ? "Choose one"
            : question.type === "multi-limited"
            ? `Select up to ${question.maxSelections}`
            : "Select all that apply"}
        </p>

        {/* Options grid */}
        <div className={`grid gap-3 mb-4 ${cols}`}>
          {question.options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              selected={isSelected(question.id, option.id)}
              onClick={() => handleOptionClick(option.id)}
            />
          ))}
        </div>

        {/* Max-selection nudge */}
        {maxSelMsg ? (
          <p className="text-center text-amber-700 text-sm font-medium mb-6 animate-fade-in">
            {maxSelMsg}
          </p>
        ) : (
          <div className="mb-6" />
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={isFirstQuestion}
            className="flex items-center gap-2 text-[#78716C] hover:text-[#1C1A15] text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-sm px-7 py-3 rounded-lg transition-colors duration-200"
          >
            {isLastQuestion ? finalLabel : nextLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {!hasAnswer && (
          <p className="text-center text-[#78716C]/60 text-xs mt-4">
            You can skip any question — just click Continue to move on.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── OptionCard ───────────────────────────────────────────────────────────────

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: QuizOption;
  selected: boolean;
  onClick: () => void;
}) {
  // Stage 1 options use imageFolder/tags (no gradient/emoji)
  // Stage 2 options use gradient/emoji
  const hasGradient = Boolean(option.gradient);

  return (
    <button
      onClick={onClick}
      className={`relative group text-left rounded-xl overflow-hidden border-2 transition-all duration-200 ${
        selected
          ? "border-[#9B6B38] shadow-lg shadow-[#9B6B38]/20 scale-[1.01]"
          : "border-[#EDE5D4] hover:border-[#9B6B38]/40 hover:scale-[1.01]"
      }`}
    >
      {/* Background: gradient for Stage 2, solid warm for Stage 1 */}
      {hasGradient ? (
        <>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${option.gradient} transition-opacity duration-200 ${
              selected ? "opacity-20" : "opacity-8 group-hover:opacity-12"
            }`}
          />
          <div
            className="absolute inset-0 bg-[#FDFAF5]"
            style={{ opacity: selected ? 0.82 : 0.92 }}
          />
        </>
      ) : (
        <div
          className={`absolute inset-0 transition-colors duration-200 ${
            selected ? "bg-[#9B6B38]/8" : "bg-[#FDFAF5] group-hover:bg-[#F5EFE4]"
          }`}
        />
      )}

      <div className="relative p-4 sm:p-5">
        {option.emoji && (
          <div className="text-2xl mb-2">{option.emoji}</div>
        )}
        <div
          className={`font-display font-semibold text-sm leading-tight mb-1 transition-colors ${
            selected ? "text-[#9B6B38]" : "text-[#1C1A15]"
          }`}
        >
          {option.label}
        </div>
        {option.description && (
          <div className="text-[#78716C] text-xs leading-relaxed">
            {option.description}
          </div>
        )}
        {selected && (
          <div className="absolute top-3 right-3 w-5 h-5 bg-[#9B6B38] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Stage1Gate ───────────────────────────────────────────────────────────────

function Stage1Gate({
  gateSent,
  gateLoading,
  gateError,
  gateFirstName,
  gateEmail,
  onFirstNameChange,
  onEmailChange,
  onSubmit,
  onContinue,
  onBack,
}: {
  gateSent: boolean;
  gateLoading: boolean;
  gateError: string | null;
  gateFirstName: string;
  gateEmail: string;
  onFirstNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onSubmit: () => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#1C1A15] relative flex items-center justify-center px-4 py-20">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9B6B38]" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="g1" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>
      </div>

      <div className="relative max-w-md w-full text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#9B6B38]/20 border border-[#9B6B38]/40 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 bg-[#9B6B38] rounded-full" />
          <span className="text-[#9B6B38] text-sm font-medium">Stage 1 Complete · Exterior Discovery</span>
        </div>

        {!gateSent ? (
          /* Capture form */
          <>
            <h2 className="font-display font-bold text-[#F5EFE4] text-3xl sm:text-4xl leading-tight mb-4">
              Receive Your Exterior Rendering
            </h2>
            <p className="text-[#F5EFE4]/60 text-base leading-relaxed mb-8">
              Based on your selections, we&apos;ll generate a custom AI exterior rendering for your home.
              Enter your name and email — it&apos;ll arrive in your inbox within 5 minutes.
            </p>

            <div className="space-y-3 mb-6 text-left">
              <div>
                <label className="block text-[#F5EFE4]/60 text-xs font-medium uppercase tracking-widest mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  value={gateFirstName}
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  placeholder="Jane"
                  className="w-full bg-[#F5EFE4]/5 border border-[#F5EFE4]/20 rounded-lg px-4 py-3 text-[#F5EFE4] placeholder-[#F5EFE4]/30 text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#F5EFE4]/60 text-xs font-medium uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={gateEmail}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full bg-[#F5EFE4]/5 border border-[#F5EFE4]/20 rounded-lg px-4 py-3 text-[#F5EFE4] placeholder-[#F5EFE4]/30 text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
                />
              </div>
            </div>

            {gateError && (
              <p className="text-red-400 text-sm mb-4">{gateError}</p>
            )}

            <button
              onClick={onSubmit}
              disabled={gateLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] disabled:opacity-50 text-white font-semibold text-base py-4 rounded-lg transition-colors mb-4"
            >
              {gateLoading ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon /> Creating Your Rendering…
                </span>
              ) : (
                <>
                  Send My Rendering
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-[#F5EFE4]/30 text-xs">
              Free · No obligation · Arrives within 5 minutes
            </p>

            <button
              onClick={onBack}
              className="mt-6 text-[#F5EFE4]/40 hover:text-[#F5EFE4]/70 text-sm transition-colors"
            >
              ← Go back to Exterior Discovery
            </button>
          </>
        ) : (
          /* Confirmation */
          <>
            <div className="w-16 h-16 bg-[#9B6B38] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h2 className="font-display font-bold text-[#F5EFE4] text-3xl sm:text-4xl leading-tight mb-3">
              Your rendering is being created.
            </h2>
            <p className="text-[#F5EFE4]/70 text-lg mb-1">
              Watch for your email in the next 5 minutes.
            </p>
            <p className="text-[#F5EFE4]/40 text-sm mb-12">
              Sent to {gateEmail}
            </p>

            <div className="border-t border-[#F5EFE4]/10 pt-10">
              <p className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-3">
                While you wait
              </p>
              <h3 className="font-display font-bold text-[#F5EFE4] text-2xl mb-3">
                Discover Your Interior Style
              </h3>
              <p className="text-[#F5EFE4]/60 text-sm leading-relaxed mb-8">
                Continue to Stage 2 to define your interior finish direction and
                receive a personalized mood board — also delivered to your inbox.
              </p>

              <button
                onClick={onContinue}
                className="flex items-center justify-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors mx-auto"
              >
                Continue to Interior Discovery
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Stage2Gate ───────────────────────────────────────────────────────────────

function Stage2Gate({
  gateEmail,
  moodboardLoading,
  onContinue,
}: {
  gateEmail: string;
  moodboardLoading: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#1C1A15] relative flex items-center justify-center px-4 py-20">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9B6B38]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="g2" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g2)" />
        </svg>
      </div>

      <div className="relative max-w-md w-full text-center">
        <div className="inline-flex items-center gap-2 bg-[#9B6B38]/20 border border-[#9B6B38]/40 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 bg-[#9B6B38] rounded-full" />
          <span className="text-[#9B6B38] text-sm font-medium">Stage 2 Complete · Interior Discovery</span>
        </div>

        <div className="w-16 h-16 bg-[#9B6B38] rounded-full flex items-center justify-center mx-auto mb-6">
          {moodboardLoading ? (
            <SpinnerIcon className="w-7 h-7 text-white" />
          ) : (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        <h2 className="font-display font-bold text-[#F5EFE4] text-3xl sm:text-4xl leading-tight mb-3">
          Your interior mood board is being assembled.
        </h2>
        <p className="text-[#F5EFE4]/70 text-lg mb-1">
          Watch for your email in the next 5 minutes.
        </p>
        {gateEmail && (
          <p className="text-[#F5EFE4]/40 text-sm mb-12">
            Sent to {gateEmail}
          </p>
        )}

        <div className="border-t border-[#F5EFE4]/10 pt-10">
          <p className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-3">
            One more step
          </p>
          <h3 className="font-display font-bold text-[#F5EFE4] text-2xl mb-3">
            Complete Your Project Profile
          </h3>
          <p className="text-[#F5EFE4]/60 text-sm leading-relaxed mb-8">
            Tell us about your project scope and we&apos;ll prepare a personalized
            cost estimate range — included in your final design summary email.
          </p>

          <button
            onClick={onContinue}
            className="flex items-center justify-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors mx-auto"
          >
            Complete My Project Profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stage3Form ───────────────────────────────────────────────────────────────

function Stage3Form({
  data,
  firstName,
  email,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  submitError,
}: {
  data: Stage3Data;
  firstName: string;
  email: string;
  onChange: React.Dispatch<React.SetStateAction<Stage3Data>>;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const set = (field: keyof Stage3Data, value: string | boolean) =>
    onChange((prev) => ({ ...prev, [field]: value }));

  const inputCls =
    "w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors";
  const labelCls =
    "block text-[#78716C] text-xs font-medium uppercase tracking-widest mb-1.5";

  const isValid = Boolean(data.squareFootage && data.bedrooms);

  return (
    <div className="min-h-screen bg-[#F5EFE4]">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#9B6B38]/15 border border-[#9B6B38]/30 rounded-full px-4 py-1.5 mb-4">
            <div className="w-2 h-2 bg-[#9B6B38] rounded-full" />
            <span className="text-[#9B6B38] text-sm font-medium">Stage 3 · Project Details</span>
          </div>
          <h2 className="font-display font-bold text-[#1C1A15] text-3xl sm:text-4xl leading-tight mb-2">
            Tell us about your project.
          </h2>
          <p className="text-[#78716C] text-base leading-relaxed">
            This helps us prepare your personalized cost estimate range and
            discovery meeting presentation.
          </p>
        </div>

        <div className="space-y-10">

          {/* ── Project Scope ── */}
          <div className="bg-[#FDFAF5] border border-[#EDE5D4] rounded-2xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-[#1C1A15] text-xl mb-6">
              Project Scope
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <label className={labelCls}>Target Home Size *</label>
                <select value={data.squareFootage} onChange={(e) => set("squareFootage", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="under-2000">Under 2,000 sq. ft.</option>
                  <option value="2000-2499">2,000 – 2,499 sq. ft.</option>
                  <option value="2500-2999">2,500 – 2,999 sq. ft.</option>
                  <option value="3000-3499">3,000 – 3,499 sq. ft.</option>
                  <option value="3500-3999">3,500 – 3,999 sq. ft.</option>
                  <option value="4000-4999">4,000 – 4,999 sq. ft.</option>
                  <option value="5000+">5,000+ sq. ft.</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Number of Stories</label>
                <select value={data.stories} onChange={(e) => set("stories", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="single">Single-story</option>
                  <option value="two-story">Two-story</option>
                  <option value="primary-down">Primary suite down, guests up</option>
                  <option value="flexible">Open to either</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Bedrooms *</label>
                <select value={data.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="2">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                  <option value="4">4 bedrooms</option>
                  <option value="5">5 bedrooms</option>
                  <option value="6+">6+ bedrooms</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Bathrooms</label>
                <select value={data.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="2">2 bathrooms</option>
                  <option value="2.5">2.5 bathrooms</option>
                  <option value="3">3 bathrooms</option>
                  <option value="3.5">3.5 bathrooms</option>
                  <option value="4">4 bathrooms</option>
                  <option value="4.5+">4.5+ bathrooms</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Garage Spaces</label>
                <select value={data.garageSpaces} onChange={(e) => set("garageSpaces", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="1">1-car garage</option>
                  <option value="2">2-car garage</option>
                  <option value="3">3-car garage</option>
                  <option value="3+">3+ car garage</option>
                  <option value="none">No garage needed</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Pool</label>
                <select value={data.poolPreference} onChange={(e) => set("poolPreference", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="yes">Yes, definitely</option>
                  <option value="likely">Probably yes</option>
                  <option value="maybe">Maybe / keep the option open</option>
                  <option value="future">Plan for future pool</option>
                  <option value="no">No pool needed</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Budget Range</label>
                <select value={data.budgetRange} onChange={(e) => set("budgetRange", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="under-600k">Under $600K</option>
                  <option value="600k-800k">$600K – $800K</option>
                  <option value="800k-1m">$800K – $1M</option>
                  <option value="1m-1.5m">$1M – $1.5M</option>
                  <option value="1.5m+">$1.5M+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className={labelCls}>Timeline</label>
                <select value={data.timeline} onChange={(e) => set("timeline", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="now">Ready to start now</option>
                  <option value="1-3mo">1 – 3 months</option>
                  <option value="3-6mo">3 – 6 months</option>
                  <option value="6-12mo">6 – 12 months</option>
                  <option value="12mo+">12+ months out</option>
                  <option value="exploring">Still exploring</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Lot / Land Status</label>
                <select value={data.lotStatus} onChange={(e) => set("lotStatus", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="owned">I own a lot</option>
                  <option value="contract">Under contract on a lot</option>
                  <option value="prospect">Have a specific lot in mind</option>
                  <option value="searching">Actively searching</option>
                  <option value="guidance">Need help knowing what to look for</option>
                  <option value="none">Haven&apos;t started looking</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.outdoorKitchen}
                    onChange={(e) => set("outdoorKitchen", e.target.checked)}
                    className="w-4 h-4 accent-[#9B6B38] rounded"
                  />
                  <span className="text-[#78716C] text-sm">Include outdoor kitchen in the design</span>
                </label>
              </div>
            </div>
          </div>

          {/* ── Contact Info ── */}
          <div className="bg-[#FDFAF5] border border-[#EDE5D4] rounded-2xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-[#1C1A15] text-xl mb-2">Your Contact Info</h3>
            <p className="text-[#78716C] text-sm mb-6">
              {firstName && email
                ? `Using ${firstName} · ${email} from Stage 1. Fill in the rest below.`
                : "Tell us how to reach you."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  readOnly
                  className={`${inputCls} bg-[#EDE5D4]/50 cursor-default`}
                />
              </div>
              <div>
                <label className={labelCls}>Last Name</label>
                <input type="text" value={data.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Smith" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" value={email} readOnly className={`${inputCls} bg-[#EDE5D4]/50 cursor-default`} />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(352) 000-0000" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Desired Build Location / Area</label>
                <input type="text" value={data.buildLocation} onChange={(e) => set("buildLocation", e.target.value)} placeholder="e.g. Ocala, FL or Marion County" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Best Way to Reach You</label>
                <select value={data.contactPreference} onChange={(e) => set("contactPreference", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Preferred Meeting Type</label>
                <select value={data.meetingType} onChange={(e) => set("meetingType", e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  <option value="phone">Phone Call</option>
                  <option value="video">Video Call</option>
                  <option value="in-person">In Person</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Anything Else You&apos;d Like Us to Know?</label>
                <textarea
                  rows={3}
                  value={data.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Tell us anything that would help us prepare for your discovery conversation…"
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          {submitError && (
            <p className="text-red-600 text-sm text-center">{submitError}</p>
          )}

          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-[#78716C] hover:text-[#1C1A15] text-sm font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <button
              onClick={onSubmit}
              disabled={!isValid || isSubmitting}
              className="flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon /> Submitting…
                </span>
              ) : (
                <>
                  Submit My Project Profile
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {!isValid && (
            <p className="text-center text-[#78716C]/60 text-xs">
              * Target home size and bedrooms are required to generate your cost estimate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CompleteView ─────────────────────────────────────────────────────────────

function CompleteView({
  firstName,
  email,
  payload,
}: {
  firstName: string;
  email: string;
  payload: CompletePayload | null;
}) {
  return (
    <div className="min-h-screen bg-[#1C1A15] relative flex items-center justify-center px-4 py-20">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9B6B38]" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="gc" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gc)" />
        </svg>
      </div>

      <div className="relative max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#9B6B38] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-2 bg-[#9B6B38]/20 border border-[#9B6B38]/40 rounded-full px-4 py-1.5 mb-6">
          <span className="text-[#9B6B38] text-sm font-medium">Design Profile Complete</span>
        </div>

        <h2 className="font-display font-bold text-[#F5EFE4] text-3xl sm:text-4xl leading-tight mb-4">
          {firstName ? `${firstName}, your design profile is complete.` : "Your design profile is complete."}
        </h2>
        <p className="text-[#F5EFE4]/70 text-base leading-relaxed mb-2">
          Your complete design summary — exterior rendering, interior mood board, and cost estimate — has been sent to your inbox.
        </p>
        {email && (
          <p className="text-[#F5EFE4]/40 text-sm mb-10">Sent to {email}</p>
        )}

        {payload && (
          <div className="bg-[#F5EFE4]/5 border border-[#F5EFE4]/10 rounded-2xl p-6 text-left mb-8">
            <p className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-4">Your Design Direction</p>
            <p className="font-display font-bold text-[#F5EFE4] text-2xl leading-tight mb-1">
              {payload.primaryArch}
            </p>
            <p className="text-[#F5EFE4]/60 text-sm mb-4">{payload.primaryFinish} interiors</p>
            {payload.costRange && (
              <>
                <div className="border-t border-[#F5EFE4]/10 pt-4 mt-4">
                  <p className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest mb-1">
                    Estimated Investment
                  </p>
                  <p className="font-display font-bold text-[#F5EFE4] text-2xl">
                    {payload.costRange}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <p className="text-[#F5EFE4]/60 text-sm mb-8">
          Our team will review your profile and reach out within one business day to schedule your personalized discovery meeting.
        </p>

        <a
          href="mailto:info@buildemersonpark.com"
          className="inline-flex items-center justify-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors"
        >
          Schedule Your Discovery Meeting
        </a>

        <div className="mt-8">
          <a href="/" className="text-[#F5EFE4]/40 hover:text-[#F5EFE4]/70 text-sm transition-colors">
            ← Back to BuildEmersonPark.com
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── SpinnerIcon ──────────────────────────────────────────────────────────────

function SpinnerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
