import type { QuizQuestion } from "./quiz-data";

export interface QuizAnswers {
  [questionId: number]: string | string[];
}

// Style code definitions
const ARCH_STYLES: Record<string, string> = {
  WM: "Warm Modern",
  MF: "Modern Farmhouse 2.0",
  TR: "Transitional / New Traditional",
  CC: "Coastal Contemporary",
  MS: "Contemporary Mediterranean",
  OM: "Organic Modern",
  MC: "Modern Cottage",
  MB: "Modern Barn",
  MM: "Mountain Modern",
  MP: "Modern Prairie",
};

const FINISH_STYLES: Record<string, string> = {
  MCL: "Modern Clean",
  WN: "Warm Natural",
  CE: "Classic Elevated",
  CL: "Coastal Light",
  MT: "Mediterranean Textured",
  OS: "Organic Spa",
  CTG: "Cottage Character",
  RI: "Rustic / Industrial",
};

// Strong-weight question IDs
const STRONG_WEIGHT_IDS = [1, 10, 11, 15, 18, 19, 32, 36, 57, 59, 75];
// Medium-weight question IDs
const MEDIUM_WEIGHT_IDS = [2, 3, 4, 5, 6, 7, 9, 12, 13, 14, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 34, 35];

function getWeight(questionId: number): number {
  if (STRONG_WEIGHT_IDS.includes(questionId)) return 3;
  if (MEDIUM_WEIGHT_IDS.includes(questionId)) return 2;
  return 1;
}

export interface ScoringResult {
  primaryArch: { code: string; name: string; score: number };
  secondaryArch: { code: string; name: string; score: number };
  primaryFinish: { code: string; name: string; score: number };
  secondaryFinish: { code: string; name: string; score: number };
  styleBlend: string;
  styleSummary: string;
  archScores: Record<string, number>;
  finishScores: Record<string, number>;
}

export function scoreQuiz(
  answers: QuizAnswers,
  questions: QuizQuestion[]
): ScoringResult {
  const archScores: Record<string, number> = {};
  const finishScores: Record<string, number> = {};

  // Initialize all scores to 0
  Object.keys(ARCH_STYLES).forEach((code) => (archScores[code] = 0));
  Object.keys(FINISH_STYLES).forEach((code) => (finishScores[code] = 0));

  // Tally scores from all answers
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (!answer || !question.options) return;

    const selectedIds = Array.isArray(answer) ? answer : [answer];
    const weight = getWeight(question.id);

    selectedIds.forEach((selectedId) => {
      const option = question.options!.find((o) => o.id === selectedId);
      if (!option) return;

      option.signals.forEach((signal) => {
        if (signal in archScores) {
          archScores[signal] += weight;
        } else if (signal in finishScores) {
          finishScores[signal] += weight;
        }
      });
    });
  });

  // Sort arch styles by score
  const sortedArch = Object.entries(archScores)
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a);

  const sortedFinish = Object.entries(finishScores)
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a);

  const primaryArch = sortedArch[0] || ["WM", 0];
  const secondaryArch = sortedArch[1] || ["TR", 0];
  const primaryFinish = sortedFinish[0] || ["WN", 0];
  const secondaryFinish = sortedFinish[1] || ["MCL", 0];

  const primaryArchName = ARCH_STYLES[primaryArch[0]] || primaryArch[0];
  const secondaryArchName = ARCH_STYLES[secondaryArch[0]] || secondaryArch[0];
  const primaryFinishName = FINISH_STYLES[primaryFinish[0]] || primaryFinish[0];
  const secondaryFinishName = FINISH_STYLES[secondaryFinish[0]] || secondaryFinish[0];

  const styleBlend = `${primaryArchName} exterior with ${secondaryArchName} influences and ${primaryFinishName} interiors`;

  const styleSummary = generateSummary(primaryArch[0], secondaryArch[0], primaryFinish[0]);

  return {
    primaryArch: {
      code: primaryArch[0],
      name: primaryArchName,
      score: primaryArch[1],
    },
    secondaryArch: {
      code: secondaryArch[0],
      name: secondaryArchName,
      score: secondaryArch[1],
    },
    primaryFinish: {
      code: primaryFinish[0],
      name: primaryFinishName,
      score: primaryFinish[1],
    },
    secondaryFinish: {
      code: secondaryFinish[0],
      name: secondaryFinishName,
      score: secondaryFinish[1],
    },
    styleBlend,
    styleSummary,
    archScores,
    finishScores,
  };
}

function generateSummary(
  primaryArch: string,
  secondaryArch: string,
  primaryFinish: string
): string {
  const descriptions: Record<string, string> = {
    WM: "clean modern architecture, warm natural materials, and large windows that feel open and livable",
    MF: "approachable modern design, gabled rooflines, and a home that feels casual, family-friendly, and beautiful",
    TR: "timeless traditional architecture with modern sensibilities, symmetry, and enduring appeal",
    CC: "coastal-inspired design, light open spaces, and a strong connection to outdoor living",
    MS: "warm Mediterranean character, textured materials, arches, and a home that feels distinctly special",
    OM: "organic modern design with natural materials, calm proportions, and a quiet luxury aesthetic",
    MC: "cottage-inspired warmth, layered character, and an intimate, charming home with personality",
    MB: "dramatic volume, strong barn-inspired forms, and a modern take on utilitarian beauty",
    MM: "mountain-inspired massing, rustic modern materials, and a home that feels grounded and dramatic",
    MP: "horizontal massing, low-slung privacy, and an indoor-outdoor connection that feels serene",
  };

  const finishDescriptions: Record<string, string> = {
    MCL: "clean, minimal, and precisely modern interiors",
    WN: "warm natural wood tones, organic textures, and relaxed luxury finishes",
    CE: "elevated classical interiors with refined millwork and timeless finish selections",
    CL: "bright, airy coastal interiors with a relaxed and light-filled palette",
    MT: "textured, handcrafted Mediterranean-inspired interiors with warmth and depth",
    OS: "spa-inspired, wellness-forward interiors that feel calm and elevated",
    CTG: "cottage-character interiors with personality, charm, and layered detail",
    RI: "raw and dramatic rustic-industrial interiors with bold material choices",
  };

  const archDesc = descriptions[primaryArch] || "a distinctive and personalized architectural direction";
  const finishDesc = finishDescriptions[primaryFinish] || "thoughtfully selected interior finishes";

  return `Your selections show a clear preference for ${archDesc}. The finish direction points toward ${finishDesc}. Rather than a single rigid style, your answers point to a layered and intentional direction that feels personal — not copied from a plan book.`;
}
