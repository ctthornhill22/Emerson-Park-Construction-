/**
 * Emerson Park Design & Construction
 * Quiz Scoring Engine + Cost Estimation
 */

import { ARCH_STYLES, FINISH_STYLES, STAGE_1_QUESTIONS, STAGE_2_QUESTIONS } from "./quiz-data";
import type { StageQuestion } from "./quiz-data";

export type QuizAnswers = Record<string, string | string[]>;

// ─── Style scoring ────────────────────────────────────────────────────────────

export interface StyleResult {
  code: string;
  name: string;
  score: number;
}

export interface ScoringResult {
  primaryArch: StyleResult;
  secondaryArch: StyleResult;
  primaryFinish: StyleResult;
  secondaryFinish: StyleResult;
  archScores: Record<string, number>;
  finishScores: Record<string, number>;
  styleBlend: string;
  styleSummary: string;
}

// Per-question weights for Stage 1 (from strategy session)
const STAGE_1_WEIGHTS: Record<string, number> = {
  q1_primary_style:     3,    // Single select — highest weight
  q2_secondary_style:   2,    // Secondary style — high weight
  q3_lifestyle_feel:    2,    // Lifestyle feel — high weight
  q4_color_palette:     1,
  q5_primary_materials: 1.5,
  q6_secondary_materials: 1,
  q7_window_style:      1,
  q8_front_entry:       1,
  q9_garage_arrival:    0.5,
  q10_pool:             0.5,
  q11_outdoor_living:   0.5,
};

// Per-question weights for Stage 2 (from strategy session)
const STAGE_2_WEIGHTS: Record<string, number> = {
  q1_interior_direction:    3,   // Overall direction — highest weight
  q2_flooring:              1.5,
  q3_cabinet_style:         1.5,
  q4_cabinet_color:         1,
  q5_countertop_backsplash: 2,   // Surface selection — high weight
  q6_primary_bathroom:      3,   // Primary bath — highest weight
  q7_windows_doors:         1,
  q8_ceiling_volume:        1,
  q9_lighting_hardware:     1,
  q10_detail_level:         3,   // Detail level — highest weight (drives cost)
};

export function scoreStage1(answers: QuizAnswers): {
  primaryArch: StyleResult;
  secondaryArch: StyleResult;
  archScores: Record<string, number>;
} {
  const archScores: Record<string, number> = {};
  Object.keys(ARCH_STYLES).forEach((k) => (archScores[k] = 0));

  STAGE_1_QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;

    const selectedIds: string[] = Array.isArray(answer) ? answer : [answer];
    const weight = STAGE_1_WEIGHTS[q.id] ?? 1;

    selectedIds.forEach((sid) => {
      const option = q.options.find((o) => o.id === sid);
      if (!option) return;
      // Stage 1 options use `tags`; only tally known arch style codes
      const signals = option.tags ?? option.signals ?? [];
      signals.forEach((sig) => {
        if (sig in archScores) archScores[sig] += weight;
      });
    });
  });

  const sorted = Object.entries(archScores).sort(([, a], [, b]) => b - a);
  const [p, s] = sorted;
  return {
    primaryArch: {
      code: p?.[0] ?? "WM",
      name: ARCH_STYLES[p?.[0] ?? "WM"],
      score: p?.[1] ?? 0,
    },
    secondaryArch: {
      code: s?.[0] ?? "TR",
      name: ARCH_STYLES[s?.[0] ?? "TR"],
      score: s?.[1] ?? 0,
    },
    archScores,
  };
}

function tallyScores(
  answers: QuizAnswers,
  questions: StageQuestion[],
  archScores: Record<string, number>,
  finishScores: Record<string, number>
) {
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;

    const selectedIds: string[] = Array.isArray(answer) ? answer : [answer];

    // Use Stage 2 per-question weights; fall back to 1 for unknown questions
    const weight = STAGE_2_WEIGHTS[q.id] ?? 1;

    selectedIds.forEach((sid) => {
      const option = q.options.find((o) => o.id === sid);
      if (!option) return;
      const signals = option.tags ?? option.signals ?? [];
      signals.forEach((sig) => {
        if (sig in archScores) archScores[sig] += weight;
        else if (sig in finishScores) finishScores[sig] += weight;
      });
    });
  });
}

export function scoreStage2(answers: QuizAnswers): {
  primaryFinish: StyleResult;
  secondaryFinish: StyleResult;
  finishScores: Record<string, number>;
} {
  const archScores: Record<string, number> = {};
  const finishScores: Record<string, number> = {};
  Object.keys(ARCH_STYLES).forEach((k) => (archScores[k] = 0));
  Object.keys(FINISH_STYLES).forEach((k) => (finishScores[k] = 0));

  tallyScores(answers, STAGE_2_QUESTIONS, archScores, finishScores);

  const sorted = Object.entries(finishScores)
    .sort(([, a], [, b]) => b - a);

  const [p, s] = sorted;
  return {
    primaryFinish: {
      code: p?.[0] ?? "WN",
      name: FINISH_STYLES[p?.[0] ?? "WN"],
      score: p?.[1] ?? 0,
    },
    secondaryFinish: {
      code: s?.[0] ?? "MCL",
      name: FINISH_STYLES[s?.[0] ?? "MCL"],
      score: s?.[1] ?? 0,
    },
    finishScores,
  };
}

export function buildFullResult(
  s1Result: ReturnType<typeof scoreStage1>,
  s2Result: ReturnType<typeof scoreStage2>
): ScoringResult {
  const { primaryArch, secondaryArch, archScores } = s1Result;
  const { primaryFinish, secondaryFinish, finishScores } = s2Result;

  const styleBlend = `${primaryArch.name} exterior with ${secondaryArch.name} influences and ${primaryFinish.name} interiors`;
  const styleSummary = generateSummary(primaryArch.code, secondaryArch.code, primaryFinish.code);

  return {
    primaryArch,
    secondaryArch,
    primaryFinish,
    secondaryFinish,
    archScores,
    finishScores,
    styleBlend,
    styleSummary,
  };
}

// ─── Rendering prompt builder ─────────────────────────────────────────────────

const ARCH_PROMPT_FRAGMENTS: Record<string, string> = {
  WM: "warm modern residential architecture, clean geometric massing, large floor-to-ceiling windows, warm wood cladding, concrete and stone accents, open to outdoor living",
  MF: "modern farmhouse architecture, white board and batten siding, black steel window frames, gabled metal roof, covered front porch, approachable luxury",
  TR: "traditional estate home, red brick or painted brick exterior, classical columns, formal symmetrical facade, painted shutters, lush landscaping",
  CC: "coastal contemporary residence, pale stucco exterior, large folding glass doors, pool visible, tropical landscaping, light airy palette, casual luxury",
  MS: "contemporary Mediterranean revival, terracotta tile roof, arched windows and doorways, warm stucco exterior, wrought iron details, courtyard feel",
  OM: "organic modern home, natural stone cladding, flat or low-slope roof, earth tones, native landscaping, quiet luxury, indoor-outdoor flow",
  MC: "modern cottage, steeply pitched roof, decorative trim, warm painted exterior, charming garden approach, intimate human scale",
  MB: "modern barn residence, vertical board and batten metal siding, large barn-style entry, dramatic roofline, industrial-meets-residential",
  MM: "mountain modern home, stone and timber exterior facade, dramatic pitched metal roof, generous overhangs, rustic yet refined",
  MP: "modern prairie home, pronounced horizontal massing, ribbon windows, low-pitched roof, earth-tone palette, land-hugging profile",
};

export function buildRenderingPrompt(archCodes: string[]): string {
  const primary = ARCH_PROMPT_FRAGMENTS[archCodes[0]] || ARCH_PROMPT_FRAGMENTS.WM;
  const secondary = archCodes[1] ? `, with ${ARCH_PROMPT_FRAGMENTS[archCodes[1]]?.split(",")[0]} influences` : "";

  return [
    `Photorealistic architectural rendering of a luxury custom home in Ocala Florida,`,
    `${primary}${secondary},`,
    `golden hour lighting, lush mature landscaping, resort-quality outdoor living,`,
    `professional architectural photography, ultra-high detail, 8K, award-winning residential design,`,
    `blue sky with light clouds, immaculate condition`,
  ].join(" ");
}

// ─── Cloudinary mood board folder selection ───────────────────────────────────

/** Map finish style codes to Cloudinary room-type folder paths.
 *  Folders follow the moodboards/* naming convention set up in Cloudinary. */
export function getMoodboardFolders(
  primaryFinish: string,
  secondaryFinish: string
): { primary: string; secondary: string } {
  // Each finish style is best represented by a particular room category.
  const folderMap: Record<string, string> = {
    MCL: "moodboards/living-rooms",
    WN:  "moodboards/living-rooms",
    CE:  "moodboards/kitchens",
    CL:  "moodboards/primary-bathrooms",
    MT:  "moodboards/primary-bathrooms",
    OS:  "moodboards/primary-bathrooms",
    CTG: "moodboards/kitchens",
    RI:  "moodboards/living-rooms",
  };

  return {
    primary:   folderMap[primaryFinish]   ?? "moodboards/living-rooms",
    secondary: folderMap[secondaryFinish] ?? "moodboards/kitchens",
  };
}

/** Build specific Cloudinary image paths from Stage 2 selected option images.
 *  Returns the exact images the user chose during the quiz — ideal for assembling
 *  a personalised mood board without any additional Cloudinary listing calls. */
export function buildMoodboardImagePaths(
  s2Answers: QuizAnswers,
  questions: StageQuestion[]
): string[] {
  const paths: string[] = [];
  questions.forEach((q) => {
    const answer = s2Answers[q.id];
    if (!answer) return;
    const selectedIds = Array.isArray(answer) ? answer : [answer];
    selectedIds.forEach((sid) => {
      const option = q.options.find((o) => o.id === sid);
      if (option?.imageFolder && option?.imageName) {
        paths.push(`${option.imageFolder}/${option.imageName}`);
      }
    });
  });
  return paths;
}

// ─── Cost estimation ──────────────────────────────────────────────────────────

export type FinishLevel = "standard" | "elevated" | "luxury" | "ultra";

export interface CostEstimate {
  low: number;
  high: number;
  finishLevel: FinishLevel;
  formatted: {
    low: string;
    high: string;
    range: string;
  };
  assumptions: string[];
}

export interface Stage3Data {
  squareFootage: string;
  stories: string;
  bedrooms: string;
  bathrooms: string;
  garageSpaces: string;
  poolPreference: string;
  outdoorKitchen: boolean;
  budgetRange: string;
  timeline: string;
  lotStatus: string;
  lastName: string;
  phone: string;
  buildLocation: string;
  contactPreference: string;
  meetingType: string;
  notes: string;
}

const SQ_FT_MIDPOINTS: Record<string, number> = {
  "under-2000": 1750,
  "2000-2499":  2250,
  "2500-2999":  2750,
  "3000-3499":  3250,
  "3500-3999":  3750,
  "4000-4999":  4500,
  "5000+":      5500,
  "not-sure":   2750,
};

const COST_PER_SQFT: Record<FinishLevel, [number, number]> = {
  standard: [185, 235],
  elevated: [235, 295],
  luxury:   [295, 365],
  ultra:    [365, 445],
};

function resolveFinishLevel(finishCode: string): FinishLevel {
  const luxuryCodes = new Set(["MCL", "WM", "CE", "OS"]);
  const elevatedCodes = new Set(["WN", "CL", "TR", "MT"]);
  const standardCodes = new Set(["CTG", "MF", "MB"]);

  if (luxuryCodes.has(finishCode)) return "luxury";
  if (elevatedCodes.has(finishCode)) return "elevated";
  if (standardCodes.has(finishCode)) return "standard";
  return "elevated"; // sensible default
}

/** Maps the Q10 detail-level answer ID to a FinishLevel for cost estimation.
 *  Q10 is the strongest cost signal — it directly maps to build complexity. */
export function finishLevelFromDetailAnswer(
  q10Answer: string | string[] | undefined
): FinishLevel {
  const answer = Array.isArray(q10Answer) ? q10Answer[0] : q10Answer;
  switch (answer) {
    case "minimal_clean":             return "standard";
    case "clean_wood_accents":
    case "board_batten_shiplap":      return "elevated";
    case "refined_traditional":
    case "full_wall_paneling":        return "luxury";
    case "custom_statement_millwork": return "ultra";
    default:                          return "elevated"; // sensible default
  }
}

function formatDollar(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(n / 1000).toFixed(0)}K`;
}

export function estimateCost(
  s3: Stage3Data,
  primaryFinishCode: string,
  /** Optional: Q10 answer ID from Stage 2. When provided, overrides finish-code
   *  inference — Q10 is the strongest cost signal in the quiz. */
  q10Answer?: string | string[]
): CostEstimate {
  // Q10 answer takes precedence; fall back to primary finish code derivation.
  const finishLevel = q10Answer
    ? finishLevelFromDetailAnswer(q10Answer)
    : resolveFinishLevel(primaryFinishCode);
  const sqft = SQ_FT_MIDPOINTS[s3.squareFootage] ?? 2750;
  const [cpsfLow, cpsfHigh] = COST_PER_SQFT[finishLevel];

  let baseLow = sqft * cpsfLow;
  let baseHigh = sqft * cpsfHigh;

  const assumptions: string[] = [
    `${sqft.toLocaleString()} sq ft estimate`,
    `${finishLevel.charAt(0).toUpperCase() + finishLevel.slice(1)} finish level`,
  ];

  // Pool
  const poolYes = ["yes", "likely", "probably"].includes(
    (s3.poolPreference ?? "").toLowerCase()
  );
  if (poolYes) {
    baseLow  += 65_000;
    baseHigh += 120_000;
    assumptions.push("Pool included");
  }

  // Outdoor kitchen
  if (s3.outdoorKitchen) {
    baseLow  += 25_000;
    baseHigh += 55_000;
    assumptions.push("Outdoor kitchen included");
  }

  // Round to nearest $5K
  const low  = Math.round(baseLow  / 5000) * 5000;
  const high = Math.round(baseHigh / 5000) * 5000;

  return {
    low,
    high,
    finishLevel,
    formatted: {
      low:   formatDollar(low),
      high:  formatDollar(high),
      range: `${formatDollar(low)} – ${formatDollar(high)}`,
    },
    assumptions,
  };
}

// ─── Prose summary generator ──────────────────────────────────────────────────

function generateSummary(
  primaryArch: string,
  secondaryArch: string,
  primaryFinish: string
): string {
  const archDescriptions: Record<string, string> = {
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
    WN:  "warm natural wood tones, organic textures, and relaxed luxury finishes",
    CE:  "elevated classical interiors with refined millwork and timeless finish selections",
    CL:  "bright, airy coastal interiors with a relaxed and light-filled palette",
    MT:  "textured, handcrafted Mediterranean-inspired interiors with warmth and depth",
    OS:  "spa-inspired, wellness-forward interiors that feel calm and elevated",
    CTG: "cottage-character interiors with personality, charm, and layered detail",
    RI:  "raw and dramatic rustic-industrial interiors with bold material choices",
  };

  const archDesc    = archDescriptions[primaryArch]    ?? "a distinctive architectural direction";
  const finishDesc  = finishDescriptions[primaryFinish] ?? "thoughtfully selected interior finishes";

  return `Your selections show a clear preference for ${archDesc}. The finish direction points toward ${finishDesc}. Rather than a single rigid style, your answers point to a layered and intentional direction that feels personal — not copied from a plan book.`;
}
