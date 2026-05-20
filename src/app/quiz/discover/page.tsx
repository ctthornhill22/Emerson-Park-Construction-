"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuizFlow from "@/components/quiz/QuizFlow";
import { scoreQuiz } from "@/lib/quiz-scoring";
import { QUESTIONS } from "@/lib/quiz-data";
import type { QuizAnswers } from "@/lib/quiz-scoring";
import type { ContactInfo } from "@/components/quiz/QuizFlow";

export default function QuizDiscoverPage() {
  const router = useRouter();

  const handleComplete = (answers: QuizAnswers, contactInfo: ContactInfo) => {
    const results = scoreQuiz(answers, QUESTIONS);

    // Store results in sessionStorage to pass to results page
    sessionStorage.setItem(
      "quizResults",
      JSON.stringify({ results, contactInfo, answers })
    );

    router.push("/quiz/results");
  };

  return <QuizFlow onComplete={handleComplete} />;
}
