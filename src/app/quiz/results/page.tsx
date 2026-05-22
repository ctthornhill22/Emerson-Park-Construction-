"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * /quiz/results — Legacy redirect.
 * Results are now shown inline inside the quiz flow at /quiz/discover.
 * Anyone who bookmarked this URL gets sent back to the quiz start.
 */
export default function QuizResultsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/quiz/discover");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5EFE4] flex items-center justify-center">
      <p className="text-[#78716C] text-sm">Redirecting…</p>
    </div>
  );
}
