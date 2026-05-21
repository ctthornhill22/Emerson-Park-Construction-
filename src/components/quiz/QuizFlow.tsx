"use client";

import { useState, useRef, useEffect } from "react";
import { QUESTIONS, SECTIONS, QUESTIONS_BY_SECTION } from "@/lib/quiz-data";
import type { QuizAnswers } from "@/lib/quiz-scoring";

interface QuizFlowProps {
  onComplete: (answers: QuizAnswers, contactInfo: ContactInfo) => void;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buildLocation: string;
  hasLand: string;
  bestContact: string;
  meetingType: string;
  anythingElse: string;
}

export default function QuizFlow({ onComplete }: QuizFlowProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [textAnswer, setTextAnswer] = useState("");
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    buildLocation: "",
    hasLand: "",
    bestContact: "",
    meetingType: "",
    anythingElse: "",
  });
  const topRef = useRef<HTMLDivElement>(null);

  const sectionsWithQuestions = QUESTIONS_BY_SECTION.filter(
    (s) => s.questions.length > 0
  );

  // Add contact section
  const allSections = [
    ...sectionsWithQuestions,
    {
      number: 7,
      title: "Your Information",
      subtitle: "Almost done — tell us where to send your results",
      questions: [],
    },
  ];

  const isContactSection = currentSection === allSections.length - 1;
  const currentSectionData = allSections[currentSection];
  const sectionQuestions = isContactSection ? [] : currentSectionData.questions;
  const currentQuestion = isContactSection
    ? null
    : sectionQuestions[currentQuestionIndex];

  const totalQuestions = QUESTIONS.length + 1; // +1 for contact
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSection, currentQuestionIndex]);

  const handleOptionToggle = (questionId: number, optionId: string, type: string) => {
    setAnswers((prev) => {
      const current = prev[questionId];
      if (type === "single-select") {
        return { ...prev, [questionId]: optionId };
      }
      // multi-select
      const currentArr = Array.isArray(current) ? current : [];
      const question = QUESTIONS.find((q) => q.id === questionId);
      const maxSel = question?.maxSelections;

      if (currentArr.includes(optionId)) {
        return { ...prev, [questionId]: currentArr.filter((id) => id !== optionId) };
      }
      if (maxSel && currentArr.length >= maxSel) {
        return { ...prev, [questionId]: [...currentArr.slice(1), optionId] };
      }
      return { ...prev, [questionId]: [...currentArr, optionId] };
    });
  };

  const isOptionSelected = (questionId: number, optionId: string): boolean => {
    const answer = answers[questionId];
    if (Array.isArray(answer)) return answer.includes(optionId);
    return answer === optionId;
  };

  const canAdvance = (): boolean => {
    if (!currentQuestion) return true;
    if (currentQuestion.answerType === "text") return textAnswer.trim().length > 0;
    const answer = answers[currentQuestion.id];
    if (!answer) return true; // allow skipping
    return true;
  };

  const handleNext = () => {
    // Save text answer
    if (currentQuestion?.answerType === "text" && textAnswer.trim()) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: textAnswer.trim() }));
    }

    if (!isContactSection && currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else if (currentSection < allSections.length - 1) {
      setCurrentSection((s) => s + 1);
      setCurrentQuestionIndex(0);
      setTextAnswer("");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    } else if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      const prevSection = allSections[currentSection - 1];
      setCurrentQuestionIndex(Math.max(0, prevSection.questions.length - 1));
    }
  };

  const handleSubmit = () => {
    onComplete(answers, contactInfo);
  };

  const isFirstQuestion = currentSection === 0 && currentQuestionIndex === 0;

  return (
    <div ref={topRef} className="min-h-screen bg-[#F5EFE4]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#EDE5D4]">
        <div
          className="h-full bg-[#9B6B38] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        {/* Section indicator */}
        <div className="flex items-center gap-2 mb-6">
          {allSections.map((section, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                idx < currentSection
                  ? "bg-[#9B6B38]"
                  : idx === currentSection
                  ? "bg-[#9B6B38]/60"
                  : "bg-[#EDE5D4]"
              }`}
            />
          ))}
        </div>

        {/* Section label */}
        <div className="mb-8">
          <span className="text-[#9B6B38] text-xs font-semibold uppercase tracking-widest">
            Section {currentSection + 1} of {allSections.length} —{" "}
            {currentSectionData.title}
          </span>
          {!isContactSection && currentQuestion && (
            <div className="text-[#78716C] text-xs mt-1">
              Question {currentQuestionIndex + 1} of {sectionQuestions.length}
            </div>
          )}
        </div>

        {/* Contact Section */}
        {isContactSection ? (
          <ContactSection
            contactInfo={contactInfo}
            onChange={setContactInfo}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        ) : currentQuestion ? (
          <div>
            {/* Question */}
            <h2 className="font-display font-bold text-[#1C1A15] text-2xl sm:text-3xl leading-tight mb-2">
              {currentQuestion.clientPrompt}
            </h2>
            {currentQuestion.answerType === "multi-select" && (
              <p className="text-[#78716C] text-sm mb-8">
                Select all that apply
              </p>
            )}
            {currentQuestion.answerType === "multi-select-limited" && (
              <p className="text-[#78716C] text-sm mb-8">
                Select up to {currentQuestion.maxSelections}
              </p>
            )}
            {currentQuestion.answerType === "single-select" && (
              <p className="text-[#78716C] text-sm mb-8">Choose one</p>
            )}
            {(currentQuestion.answerType === "text") && (
              <p className="text-[#78716C] text-sm mb-8">
                Your own words — this helps us personalize your results
              </p>
            )}

            {/* Text answer */}
            {currentQuestion.answerType === "text" ? (
              <textarea
                rows={5}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder={currentQuestion.placeholder || "Type your answer here…"}
                className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-xl px-5 py-4 text-[#1C1A15] placeholder-[#78716C] text-base focus:outline-none focus:border-[#9B6B38] transition-colors resize-none mb-8"
              />
            ) : (
              /* Option grid */
              <div
                className={`grid gap-3 mb-8 ${
                  currentQuestion.options && currentQuestion.options.length <= 6
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                } ${currentQuestion.options && currentQuestion.options.length === 8 ? "sm:grid-cols-2" : ""}`}
              >
                {currentQuestion.options?.map((option) => {
                  const selected = isOptionSelected(currentQuestion.id, option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        handleOptionToggle(
                          currentQuestion.id,
                          option.id,
                          currentQuestion.answerType
                        )
                      }
                      className={`relative group text-left rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        selected
                          ? "border-[#9B6B38] shadow-lg shadow-[#9B6B38]/20"
                          : "border-[#EDE5D4] hover:border-[#9B6B38]/40"
                      }`}
                    >
                      {/* Gradient bg */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-${selected ? "20" : "10"} transition-opacity group-hover:opacity-15`}
                      />
                      <div className="absolute inset-0 bg-[#FDFAF5]" style={{ opacity: selected ? 0.85 : 0.9 }} />

                      <div className="relative p-4 sm:p-5">
                        <div className="text-2xl mb-2">{option.emoji}</div>
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
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={isFirstQuestion}
                className="flex items-center gap-2 text-[#78716C] hover:text-[#1C1A15] text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
                Back
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] text-[#FDFAF5] font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200"
              >
                {currentSection === allSections.length - 2 &&
                currentQuestionIndex === sectionQuestions.length - 1
                  ? "Almost done →"
                  : "Continue →"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ContactSection({
  contactInfo,
  onChange,
  onSubmit,
  onBack,
}: {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const update = (field: keyof ContactInfo, value: string) =>
    onChange({ ...contactInfo, [field]: value });

  const isValid =
    contactInfo.firstName.trim() &&
    contactInfo.email.trim() &&
    contactInfo.email.includes("@");

  return (
    <div>
      <h2 className="font-display font-bold text-[#1C1A15] text-2xl sm:text-3xl leading-tight mb-2">
        Where should we send your personalized home style summary?
      </h2>
      <p className="text-[#78716C] text-sm mb-8">
        Complete your profile and we'll prepare a personalized design direction
        and have someone reach out to schedule your discovery meeting.
      </p>

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">First Name *</label>
            <input
              type="text"
              value={contactInfo.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="Jane"
              className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">Last Name</label>
            <input
              type="text"
              value={contactInfo.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Smith"
              className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">Email Address *</label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@example.com"
            className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">Phone Number</label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(555) 000-0000"
            className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">Desired Build Location or Area</label>
          <input
            type="text"
            value={contactInfo.buildLocation}
            onChange={(e) => update("buildLocation", e.target.value)}
            placeholder="e.g. Ocala, FL or Marion County"
            className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">Best Way to Contact You</label>
            <select
              value={contactInfo.bestContact}
              onChange={(e) => update("bestContact", e.target.value)}
              className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
            >
              <option value="" style={{ background: "#F5EFE4" }}>Select…</option>
              <option value="email" style={{ background: "#F5EFE4" }}>Email</option>
              <option value="phone" style={{ background: "#F5EFE4" }}>Phone Call</option>
              <option value="text" style={{ background: "#F5EFE4" }}>Text Message</option>
            </select>
          </div>
          <div>
            <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">Preferred Meeting Type</label>
            <select
              value={contactInfo.meetingType}
              onChange={(e) => update("meetingType", e.target.value)}
              className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors"
            >
              <option value="" style={{ background: "#F5EFE4" }}>Select…</option>
              <option value="phone" style={{ background: "#F5EFE4" }}>Phone Call</option>
              <option value="video" style={{ background: "#F5EFE4" }}>Video Call</option>
              <option value="in-person" style={{ background: "#F5EFE4" }}>In Person</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[#78716C] text-xs mb-1.5 font-medium uppercase tracking-wide">Anything Else You&apos;d Like Us to Know?</label>
          <textarea
            rows={3}
            value={contactInfo.anythingElse}
            onChange={(e) => update("anythingElse", e.target.value)}
            placeholder="Tell us anything that would help us prepare for your discovery conversation…"
            className="w-full bg-[#FDFAF5] border border-[#EDE5D4] rounded-lg px-4 py-3 text-[#1C1A15] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#9B6B38] transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#78716C] hover:text-[#1C1A15] text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        <button
          onClick={onSubmit}
          disabled={!isValid}
          className="flex items-center gap-2 bg-[#9B6B38] hover:bg-[#B57E4A] disabled:opacity-40 disabled:cursor-not-allowed text-[#FDFAF5] font-semibold text-sm px-8 py-3 rounded-lg transition-colors duration-200"
        >
          Get My Style Results →
        </button>
      </div>
    </div>
  );
}
