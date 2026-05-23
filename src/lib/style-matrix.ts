/**
 * Emerson Park Design & Construction
 * Style Combination Matrix — Weighted Image Selection System
 *
 * Defines how the quiz assembles mood board images and blend descriptions
 * based on the prospect's primary + secondary style combination.
 *
 * Weighting:
 *   Primary   → 60% of mood board images
 *   Secondary → 30% of mood board images
 *   Tertiary  → 10% (outdoor-living as neutral anchor)
 */

// ─── Cloudinary folder slug maps ─────────────────────────────────────────────

/** Maps arch style codes → Cloudinary exterior folder slug names. */
export const ARCH_FOLDER_MAP: Record<string, string> = {
  WM: "warm-modern",
  MF: "modern-farmhouse",
  TR: "transitional",
  CC: "coastal-contemporary",
  MS: "mediterranean",
  OM: "organic-modern",
  MC: "modern-cottage",
  MB: "barndominium",
  MM: "mountain-modern",
  MP: "modern-prairie",
};

/**
 * Maps finish style codes → image slug used in moodboard folder filenames.
 * MT falls back to warm-natural (no dedicated MT images in Cloudinary).
 */
export const FINISH_SLUG_MAP: Record<string, string> = {
  MCL: "modern-clean",
  WN:  "warm-natural",
  CE:  "classic-elevated",
  CL:  "coastal-light",
  MT:  "warm-natural",     // No dedicated MT images — warm-natural is closest
  OS:  "organic-spa",
  CTG: "cottage-character",
  RI:  "rustic-industrial",
};

/**
 * Maps finish style codes → preferred Cloudinary moodboard room folders,
 * in priority order. Used by buildWeightedMoodboardPaths().
 */
const FINISH_ROOM_FOLDERS: Record<string, string[]> = {
  MCL: ["moodboards/kitchens",           "moodboards/primary-bedrooms",  "moodboards/details-finishes"],
  WN:  ["moodboards/kitchens",           "moodboards/primary-bedrooms",  "moodboards/details-finishes"],
  CE:  ["moodboards/kitchens",           "moodboards/primary-bathrooms", "moodboards/primary-bedrooms"],
  CL:  ["moodboards/primary-bathrooms",  "moodboards/kitchens",          "moodboards/primary-bedrooms"],
  MT:  ["moodboards/primary-bathrooms",  "moodboards/kitchens",          "moodboards/primary-bedrooms"],
  OS:  ["moodboards/primary-bathrooms",  "moodboards/primary-bedrooms",  "moodboards/kitchens"],
  CTG: ["moodboards/kitchens",           "moodboards/primary-bedrooms",  "moodboards/details-finishes"],
  RI:  ["moodboards/kitchens",           "moodboards/primary-bedrooms",  "moodboards/details-finishes"],
};

// ─── Combination data types ───────────────────────────────────────────────────

export interface CombinationImageSet {
  exteriorFolders: { path: string; weight: number }[];
  interiorFolders: { path: string; weight: number }[];
  keyImageNames:   string[];
  blendDescription: string;
}

// ─── Exterior combination matrix ──────────────────────────────────────────────
// Format: PRIMARY_SECONDARY

export const exteriorCombinations: Record<string, CombinationImageSet> = {

  // ── Warm Modern as primary ─────────────────────────────────────────────────

  WM_MF: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",       weight: 0.6 },
      { path: "styles/modern-farmhouse/exterior",  weight: 0.3 },
      { path: "combinations/exterior/wm-mf",       weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "mat-stucco-stone", "detail-soffit"],
    blendDescription: "Warm Modern with Modern Farmhouse warmth — clean lines softened by natural wood and organic materials",
  },

  WM_TR: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",    weight: 0.6 },
      { path: "styles/transitional/exterior",   weight: 0.3 },
      { path: "combinations/exterior/wm-tr",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-formal", "window-black-frame"],
    blendDescription: "Warm Modern with Transitional balance — architectural confidence with timeless proportion",
  },

  WM_CC: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",            weight: 0.6 },
      { path: "styles/coastal-contemporary/exterior",   weight: 0.3 },
      { path: "combinations/exterior/wm-cc",            weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-lanai", "window-floor-ceiling"],
    blendDescription: "Warm Modern with Coastal Contemporary living — indoor-outdoor connection driven by warm natural materials",
  },

  WM_MS: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",    weight: 0.6 },
      { path: "styles/mediterranean/exterior",  weight: 0.3 },
      { path: "combinations/exterior/wm-ms",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-courtyard", "detail-limestone"],
    blendDescription: "Warm Modern with Mediterranean soul — clean massing with warm plaster, stone, and courtyard living",
  },

  WM_OM: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",    weight: 0.6 },
      { path: "styles/organic-modern/exterior", weight: 0.3 },
      { path: "combinations/exterior/wm-om",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",            weight: 0.5 },
      { path: "moodboards/primary-bathrooms",   weight: 0.5 },
    ],
    keyImageNames: ["hero", "mat-stucco-stone", "outdoor-spa"],
    blendDescription: "Warm Modern with Organic softness — the most livable version of modern design with natural material depth",
  },

  WM_MC: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",    weight: 0.6 },
      { path: "styles/modern-cottage/exterior", weight: 0.3 },
      { path: "combinations/exterior/wm-mc",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-cottage", "detail-soffit"],
    blendDescription: "Warm Modern with Cottage character — clean architecture with intimate warmth and handcrafted details",
  },

  WM_MB: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",    weight: 0.6 },
      { path: "styles/barndominium/exterior",   weight: 0.3 },
      { path: "combinations/exterior/wm-mb",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "garage-oversized", "detail-metal-roof"],
    blendDescription: "Warm Modern with Barn volume — dramatic ceiling height and flexible living wrapped in warm modern materials",
  },

  WM_MM: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",      weight: 0.6 },
      { path: "styles/mountain-modern/exterior",  weight: 0.3 },
      { path: "combinations/exterior/wm-mm",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "mat-stone-timber", "detail-reclaimed"],
    blendDescription: "Warm Modern with Mountain grounding — clean lines anchored by heavy stone, timber, and dark metal",
  },

  WM_MP: {
    exteriorFolders: [
      { path: "styles/warm-modern/exterior",    weight: 0.6 },
      { path: "styles/modern-prairie/exterior", weight: 0.3 },
      { path: "combinations/exterior/wm-mp",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.6 },
      { path: "moodboards/outdoor-living",  weight: 0.4 },
    ],
    keyImageNames: ["hero", "window-clerestory", "garage-hidden"],
    blendDescription: "Warm Modern with Prairie horizontality — low-slung, private, and refined with strong indoor-outdoor connection",
  },

  // ── Organic Modern as primary ──────────────────────────────────────────────

  OM_WM: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",    weight: 0.3 },
      { path: "combinations/exterior/om-wm",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",          weight: 0.5 },
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-spa", "mat-stucco-stone"],
    blendDescription: "Organic Modern with Warm Modern clarity — natural materials with architectural precision and clean massing",
  },

  OM_MF: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior",    weight: 0.6 },
      { path: "styles/modern-farmhouse/exterior",  weight: 0.3 },
      { path: "combinations/exterior/om-mf",       weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",  weight: 0.5 },
      { path: "moodboards/kitchens",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "detail-soffit", "outdoor-porch"],
    blendDescription: "Organic Modern with Farmhouse approachability — biophilic design made livable and family-friendly",
  },

  OM_TR: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior", weight: 0.6 },
      { path: "styles/transitional/exterior",   weight: 0.3 },
      { path: "combinations/exterior/om-tr",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-formal", "mat-mixed"],
    blendDescription: "Organic Modern with Transitional structure — natural materials within a classically proportioned framework",
  },

  OM_CC: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior",         weight: 0.6 },
      { path: "styles/coastal-contemporary/exterior",   weight: 0.3 },
      { path: "combinations/exterior/om-cc",            weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.4 },
      { path: "moodboards/outdoor-living",  weight: 0.6 },
    ],
    keyImageNames: ["hero", "outdoor-lanai", "window-floor-ceiling"],
    blendDescription: "Organic Modern with Coastal openness — wellness-driven design with resort outdoor living and abundant natural light",
  },

  OM_MS: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior", weight: 0.6 },
      { path: "styles/mediterranean/exterior",  weight: 0.3 },
      { path: "combinations/exterior/om-ms",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
      { path: "moodboards/kitchens",          weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-courtyard", "pool-organic"],
    blendDescription: "Organic Modern with Mediterranean romance — plaster, stone, and courtyard living with a spa-like wellness focus",
  },

  OM_MC: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior", weight: 0.6 },
      { path: "styles/modern-cottage/exterior", weight: 0.3 },
      { path: "combinations/exterior/om-mc",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.5 },
      { path: "moodboards/details-finishes", weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-cottage", "detail-reclaimed"],
    blendDescription: "Organic Modern with Cottage intimacy — natural wellness design at a cozy human scale with handcrafted detail",
  },

  OM_MB: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior", weight: 0.6 },
      { path: "styles/barndominium/exterior",   weight: 0.3 },
      { path: "combinations/exterior/om-mb",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-land"],
    blendDescription: "Organic Modern with Barn volume — natural materials at dramatic scale with flexible open living",
  },

  OM_MM: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior",   weight: 0.6 },
      { path: "styles/mountain-modern/exterior",  weight: 0.3 },
      { path: "combinations/exterior/om-mm",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",          weight: 0.5 },
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
    ],
    keyImageNames: ["hero", "mat-stone-timber"],
    blendDescription: "Organic Modern with Mountain grounding — the most natural and grounded luxury direction possible",
  },

  OM_RI: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior",   weight: 0.6 },
      { path: "styles/mountain-modern/exterior",  weight: 0.3 },
      { path: "combinations/exterior/om-ri",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",  weight: 0.5 },
      { path: "moodboards/kitchens",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "detail-iron"],
    blendDescription: "Organic Modern exterior with Rustic Industrial interior — raw material warmth inside a serene natural exterior",
  },

  OM_CTG: {
    exteriorFolders: [
      { path: "styles/organic-modern/exterior", weight: 0.6 },
      { path: "styles/modern-cottage/exterior", weight: 0.3 },
      { path: "combinations/exterior/om-ctg",   weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.5 },
      { path: "moodboards/details-finishes", weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-cottage"],
    blendDescription: "Organic Modern exterior with Cottage Character interior — wellness design with personality, charm, and handcrafted warmth inside",
  },

  // ── Coastal Contemporary as primary ───────────────────────────────────────

  CC_WM: {
    exteriorFolders: [
      { path: "styles/coastal-contemporary/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",          weight: 0.3 },
      { path: "combinations/exterior/cc-wm",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/outdoor-living", weight: 0.5 },
      { path: "moodboards/kitchens",       weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-lanai", "window-sliding"],
    blendDescription: "Coastal Contemporary with Warm Modern refinement — resort outdoor living with warm natural interior depth",
  },

  CC_TR: {
    exteriorFolders: [
      { path: "styles/coastal-contemporary/exterior", weight: 0.6 },
      { path: "styles/transitional/exterior",         weight: 0.3 },
      { path: "combinations/exterior/cc-tr",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-formal", "outdoor-pavilion"],
    blendDescription: "Coastal Contemporary with Transitional elegance — timeless proportions with a Florida resort outdoor lifestyle",
  },

  CC_MS: {
    exteriorFolders: [
      { path: "styles/coastal-contemporary/exterior", weight: 0.6 },
      { path: "styles/mediterranean/exterior",        weight: 0.3 },
      { path: "combinations/exterior/cc-ms",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/outdoor-living",    weight: 0.6 },
      { path: "moodboards/primary-bathrooms", weight: 0.4 },
    ],
    keyImageNames: ["hero", "pool-resort", "entry-courtyard"],
    blendDescription: "Coastal Contemporary with Mediterranean warmth — light stucco and glass with courtyard romance and resort pool living",
  },

  CC_OM: {
    exteriorFolders: [
      { path: "styles/coastal-contemporary/exterior", weight: 0.6 },
      { path: "styles/organic-modern/exterior",       weight: 0.3 },
      { path: "combinations/exterior/cc-om",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/outdoor-living",    weight: 0.5 },
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-spa", "pool-organic"],
    blendDescription: "Coastal Contemporary with Organic wellness — a spa-like resort experience with biophilic design and natural materials",
  },

  CC_MF: {
    exteriorFolders: [
      { path: "styles/coastal-contemporary/exterior", weight: 0.6 },
      { path: "styles/modern-farmhouse/exterior",     weight: 0.3 },
      { path: "combinations/exterior/cc-mf",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-porch", "detail-soffit"],
    blendDescription: "Coastal Contemporary with Farmhouse approachability — casual Florida living with family-friendly warmth",
  },

  // ── Mediterranean as primary ───────────────────────────────────────────────

  MS_WM: {
    exteriorFolders: [
      { path: "styles/mediterranean/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",   weight: 0.3 },
      { path: "combinations/exterior/ms-wm",   weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
      { path: "moodboards/kitchens",          weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-courtyard", "window-arched"],
    blendDescription: "Mediterranean with Warm Modern simplification — Old World romance with clean contemporary massing",
  },

  MS_OM: {
    exteriorFolders: [
      { path: "styles/mediterranean/exterior",  weight: 0.6 },
      { path: "styles/organic-modern/exterior", weight: 0.3 },
      { path: "combinations/exterior/ms-om",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/primary-bathrooms", weight: 0.6 },
      { path: "moodboards/kitchens",          weight: 0.4 },
    ],
    keyImageNames: ["hero", "pool-courtyard", "outdoor-spa"],
    blendDescription: "Mediterranean with Organic wellness — warm plaster and stone courtyard living with spa-like calm inside",
  },

  MS_TR: {
    exteriorFolders: [
      { path: "styles/mediterranean/exterior", weight: 0.6 },
      { path: "styles/transitional/exterior",  weight: 0.3 },
      { path: "combinations/exterior/ms-tr",   weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-formal", "detail-limestone"],
    blendDescription: "Mediterranean with Transitional refinement — romantic Old World character within classic proportions and timeless detail",
  },

  MS_CC: {
    exteriorFolders: [
      { path: "styles/mediterranean/exterior",        weight: 0.6 },
      { path: "styles/coastal-contemporary/exterior", weight: 0.3 },
      { path: "combinations/exterior/ms-cc",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/outdoor-living",    weight: 0.6 },
      { path: "moodboards/primary-bathrooms", weight: 0.4 },
    ],
    keyImageNames: ["hero", "pool-courtyard", "outdoor-pavilion"],
    blendDescription: "Mediterranean with Coastal resort living — courtyard pool, arched openings, and Florida outdoor lifestyle",
  },

  // ── Modern Farmhouse as primary ────────────────────────────────────────────

  MF_WM: {
    exteriorFolders: [
      { path: "styles/modern-farmhouse/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",      weight: 0.3 },
      { path: "combinations/exterior/mf-wm",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",  weight: 0.5 },
      { path: "moodboards/kitchens",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "mat-siding", "detail-soffit"],
    blendDescription: "Modern Farmhouse with Warm Modern refinement — the evolved farmhouse with cleaner lines and warmer natural materials",
  },

  MF_TR: {
    exteriorFolders: [
      { path: "styles/modern-farmhouse/exterior", weight: 0.6 },
      { path: "styles/transitional/exterior",     weight: 0.3 },
      { path: "combinations/exterior/mf-tr",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",  weight: 0.5 },
      { path: "moodboards/kitchens",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-formal", "window-divided"],
    blendDescription: "Modern Farmhouse with Transitional polish — casual warmth elevated by classic proportion and timeless detail",
  },

  MF_OM: {
    exteriorFolders: [
      { path: "styles/modern-farmhouse/exterior", weight: 0.6 },
      { path: "styles/organic-modern/exterior",   weight: 0.3 },
      { path: "combinations/exterior/mf-om",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",  weight: 0.5 },
      { path: "moodboards/kitchens",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "detail-soffit", "outdoor-porch"],
    blendDescription: "Modern Farmhouse with Organic wellness — approachable family living with natural material depth and spa-like calm",
  },

  MF_MB: {
    exteriorFolders: [
      { path: "styles/modern-farmhouse/exterior", weight: 0.6 },
      { path: "styles/barndominium/exterior",     weight: 0.3 },
      { path: "combinations/exterior/mf-mb",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "garage-oversized"],
    blendDescription: "Modern Farmhouse with Barn scale — familiar farmhouse warmth at dramatic volume with functional acreage living",
  },

  MF_MC: {
    exteriorFolders: [
      { path: "styles/modern-farmhouse/exterior", weight: 0.6 },
      { path: "styles/modern-cottage/exterior",   weight: 0.3 },
      { path: "combinations/exterior/mf-mc",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",  weight: 0.5 },
      { path: "moodboards/kitchens",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-cottage"],
    blendDescription: "Modern Farmhouse with Cottage charm — the warmest and most character-driven family home direction",
  },

  // ── Transitional as primary ────────────────────────────────────────────────

  TR_WM: {
    exteriorFolders: [
      { path: "styles/transitional/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",  weight: 0.3 },
      { path: "combinations/exterior/tr-wm",  weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-formal", "window-black-frame"],
    blendDescription: "Transitional with Warm Modern edge — classic proportions updated with clean lines and warm contemporary materials",
  },

  TR_CC: {
    exteriorFolders: [
      { path: "styles/transitional/exterior",         weight: 0.6 },
      { path: "styles/coastal-contemporary/exterior", weight: 0.3 },
      { path: "combinations/exterior/tr-cc",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-pavilion", "window-sliding"],
    blendDescription: "Transitional with Coastal outdoor lifestyle — timeless architecture with resort-quality outdoor living and pool planning",
  },

  TR_CE: {
    exteriorFolders: [
      { path: "styles/transitional/exterior", weight: 0.6 },
      { path: "styles/transitional/exterior", weight: 0.3 },
      { path: "combinations/exterior/tr-ce",  weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-formal"],
    blendDescription: "Transitional with Classic Elevated finish — the most resale-confident and polished direction in the portfolio",
  },

  TR_MS: {
    exteriorFolders: [
      { path: "styles/transitional/exterior", weight: 0.6 },
      { path: "styles/mediterranean/exterior", weight: 0.3 },
      { path: "combinations/exterior/tr-ms",  weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",          weight: 0.5 },
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
    ],
    keyImageNames: ["hero", "window-arched", "detail-limestone"],
    blendDescription: "Transitional with Mediterranean character — classic symmetry with warm plaster, stone, and arched detail",
  },

  // ── Modern Cottage as primary ──────────────────────────────────────────────

  MC_WM: {
    exteriorFolders: [
      { path: "styles/modern-cottage/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",    weight: 0.3 },
      { path: "combinations/exterior/mc-wm",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.5 },
      { path: "moodboards/details-finishes", weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-cottage"],
    blendDescription: "Modern Cottage with Warm Modern clarity — intimate cottage scale with clean warm materials and architectural precision",
  },

  MC_TR: {
    exteriorFolders: [
      { path: "styles/modern-cottage/exterior", weight: 0.6 },
      { path: "styles/transitional/exterior",   weight: 0.3 },
      { path: "combinations/exterior/mc-tr",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.6 },
      { path: "moodboards/details-finishes", weight: 0.4 },
    ],
    keyImageNames: ["hero", "entry-formal"],
    blendDescription: "Modern Cottage with Transitional refinement — cottage charm elevated by classic proportions and polished detail",
  },

  MC_OM: {
    exteriorFolders: [
      { path: "styles/modern-cottage/exterior", weight: 0.6 },
      { path: "styles/organic-modern/exterior", weight: 0.3 },
      { path: "combinations/exterior/mc-om",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",          weight: 0.5 },
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
    ],
    keyImageNames: ["hero", "entry-cottage", "outdoor-spa"],
    blendDescription: "Modern Cottage with Organic wellness — handcrafted intimate design with natural spa-like interior calm",
  },

  MC_MF: {
    exteriorFolders: [
      { path: "styles/modern-cottage/exterior",   weight: 0.6 },
      { path: "styles/modern-farmhouse/exterior", weight: 0.3 },
      { path: "combinations/exterior/mc-mf",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",  weight: 0.5 },
      { path: "moodboards/kitchens",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-porch"],
    blendDescription: "Modern Cottage with Farmhouse warmth — the most character-rich and family-centered direction in the portfolio",
  },

  // ── Barndominium as primary ────────────────────────────────────────────────

  MB_WM: {
    exteriorFolders: [
      { path: "styles/barndominium/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",  weight: 0.3 },
      { path: "combinations/exterior/mb-wm",  weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "detail-metal-roof"],
    blendDescription: "Barndominium with Warm Modern finish — dramatic barn structure elevated by warm clean interiors and refined materials",
  },

  MB_MF: {
    exteriorFolders: [
      { path: "styles/barndominium/exterior",     weight: 0.6 },
      { path: "styles/modern-farmhouse/exterior", weight: 0.3 },
      { path: "combinations/exterior/mb-mf",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-land"],
    blendDescription: "Barndominium with Farmhouse soul — rural luxury built for land, lifestyle, and generous family living",
  },

  MB_MM: {
    exteriorFolders: [
      { path: "styles/barndominium/exterior",     weight: 0.6 },
      { path: "styles/mountain-modern/exterior",  weight: 0.3 },
      { path: "combinations/exterior/mb-mm",      weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "mat-stone-timber"],
    blendDescription: "Barndominium with Mountain drama — the boldest and most dramatic rural luxury direction with heavy natural materials",
  },

  MB_OM: {
    exteriorFolders: [
      { path: "styles/barndominium/exterior",   weight: 0.6 },
      { path: "styles/organic-modern/exterior", weight: 0.3 },
      { path: "combinations/exterior/mb-om",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",          weight: 0.5 },
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-land"],
    blendDescription: "Barndominium with Organic wellness — dramatic rural scale with natural material warmth and spa-like interior calm",
  },

  // ── Mountain Modern as primary ─────────────────────────────────────────────

  MM_WM: {
    exteriorFolders: [
      { path: "styles/mountain-modern/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",     weight: 0.3 },
      { path: "combinations/exterior/mm-wm",     weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",         weight: 0.5 },
      { path: "moodboards/details-finishes", weight: 0.5 },
    ],
    keyImageNames: ["hero", "mat-stone-timber"],
    blendDescription: "Mountain Modern with Warm Modern refinement — grounded stone and timber elevated by clean lines and warm modern detail",
  },

  MM_OM: {
    exteriorFolders: [
      { path: "styles/mountain-modern/exterior", weight: 0.6 },
      { path: "styles/organic-modern/exterior",  weight: 0.3 },
      { path: "combinations/exterior/mm-om",     weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
      { path: "moodboards/kitchens",          weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-spa"],
    blendDescription: "Mountain Modern with Organic spa — the most grounded and wellness-driven luxury direction in the portfolio",
  },

  MM_MB: {
    exteriorFolders: [
      { path: "styles/mountain-modern/exterior", weight: 0.6 },
      { path: "styles/barndominium/exterior",    weight: 0.3 },
      { path: "combinations/exterior/mm-mb",     weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.5 },
      { path: "moodboards/outdoor-living",  weight: 0.5 },
    ],
    keyImageNames: ["hero", "mat-stone-timber"],
    blendDescription: "Mountain Modern with Barn volume — the most dramatic and masculine luxury direction with maximum structural presence",
  },

  // ── Modern Prairie as primary ──────────────────────────────────────────────

  MP_WM: {
    exteriorFolders: [
      { path: "styles/modern-prairie/exterior", weight: 0.6 },
      { path: "styles/warm-modern/exterior",    weight: 0.3 },
      { path: "combinations/exterior/mp-wm",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",        weight: 0.6 },
      { path: "moodboards/outdoor-living",  weight: 0.4 },
    ],
    keyImageNames: ["hero", "window-clerestory", "garage-hidden"],
    blendDescription: "Modern Prairie with Warm Modern materials — low-slung horizontal privacy with warm natural material depth",
  },

  MP_OM: {
    exteriorFolders: [
      { path: "styles/modern-prairie/exterior", weight: 0.6 },
      { path: "styles/organic-modern/exterior", weight: 0.3 },
      { path: "combinations/exterior/mp-om",    weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/kitchens",          weight: 0.5 },
      { path: "moodboards/primary-bathrooms", weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-spa", "window-clerestory"],
    blendDescription: "Modern Prairie with Organic calm — the quietest and most private luxury direction with strong wellness focus",
  },

  MP_CC: {
    exteriorFolders: [
      { path: "styles/modern-prairie/exterior",       weight: 0.6 },
      { path: "styles/coastal-contemporary/exterior", weight: 0.3 },
      { path: "combinations/exterior/mp-cc",          weight: 0.1 },
    ],
    interiorFolders: [
      { path: "moodboards/outdoor-living", weight: 0.5 },
      { path: "moodboards/kitchens",       weight: 0.5 },
    ],
    keyImageNames: ["hero", "outdoor-lanai", "window-floor-ceiling"],
    blendDescription: "Modern Prairie with Coastal outdoor living — horizontal privacy with resort-quality outdoor connection",
  },
};

// ─── Interior finish combination matrix ───────────────────────────────────────

export const interiorCombinations: Record<string, {
  primaryFolder: string;
  secondaryFolder: string;
  blendRatio: { primary: number; secondary: number };
  blendDescription: string;
}> = {

  // Organic Spa combinations
  OS_RI:  { primaryFolder: "organic-spa",      secondaryFolder: "rustic-industrial",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Organic Spa with Rustic Industrial edge — natural wellness calm with raw material drama in the kitchen and bar" },
  OS_CTG: { primaryFolder: "organic-spa",      secondaryFolder: "cottage-character",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Organic Spa with Cottage warmth — wellness calm with handcrafted personality and intimate character details" },
  OS_WN:  { primaryFolder: "organic-spa",      secondaryFolder: "warm-natural",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Organic Spa with Warm Natural depth — the most layered and natural finish direction in the portfolio" },
  OS_CE:  { primaryFolder: "organic-spa",      secondaryFolder: "classic-elevated",     blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Organic Spa with Classic Elevated polish — natural calm with refined millwork and timeless material choices" },
  OS_MCL: { primaryFolder: "organic-spa",      secondaryFolder: "modern-clean",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Organic Spa with Modern Clean precision — wellness warmth within a crisp minimal architectural framework" },
  OS_MT:  { primaryFolder: "organic-spa",      secondaryFolder: "warm-natural",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Organic Spa with Mediterranean texture — natural calm with zellige, plaster, and handcrafted warmth" },
  OS_CL:  { primaryFolder: "organic-spa",      secondaryFolder: "coastal-light",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Organic Spa with Coastal Light — wellness calm with airy brightness and relaxed resort energy" },

  // Warm Natural combinations
  WN_RI:  { primaryFolder: "warm-natural",     secondaryFolder: "rustic-industrial",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Warm Natural with Rustic Industrial — wood and stone warmth with raw metal drama and masculine edge" },
  WN_CE:  { primaryFolder: "warm-natural",     secondaryFolder: "classic-elevated",     blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Warm Natural with Classic Elevated — organic warmth refined by timeless millwork and polished detail" },
  WN_CTG: { primaryFolder: "warm-natural",     secondaryFolder: "cottage-character",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Warm Natural with Cottage Character — the warmest and most personally expressive interior direction" },
  WN_MCL: { primaryFolder: "warm-natural",     secondaryFolder: "modern-clean",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Warm Natural with Modern Clean — natural material warmth within a precise minimal framework" },
  WN_OS:  { primaryFolder: "warm-natural",     secondaryFolder: "organic-spa",          blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Warm Natural with Organic Spa calm — rich natural materials with a wellness-driven quiet finish direction" },
  WN_CL:  { primaryFolder: "warm-natural",     secondaryFolder: "coastal-light",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Warm Natural with Coastal Light — wood and stone warmth brightened with airy coastal energy" },
  WN_MT:  { primaryFolder: "warm-natural",     secondaryFolder: "warm-natural",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Warm Natural with Mediterranean texture — rich natural warmth with handcrafted Old World detail" },

  // Modern Clean combinations
  MCL_WN: { primaryFolder: "modern-clean",     secondaryFolder: "warm-natural",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Modern Clean with Warm Natural — crisp minimal architecture warmed by natural wood and organic material" },
  MCL_CE: { primaryFolder: "modern-clean",     secondaryFolder: "classic-elevated",     blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Modern Clean with Classic Elevated — minimal precision with refined millwork and timeless material choices" },
  MCL_OS: { primaryFolder: "modern-clean",     secondaryFolder: "organic-spa",          blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Modern Clean with Organic Spa — the cleanest wellness direction — white precision with natural calm" },
  MCL_CL: { primaryFolder: "modern-clean",     secondaryFolder: "coastal-light",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Modern Clean with Coastal Light — the most airy and bright direction — clean lines with relaxed resort energy" },
  MCL_RI: { primaryFolder: "modern-clean",     secondaryFolder: "rustic-industrial",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Modern Clean with Rustic Industrial — white minimal backdrop with raw material drama as the statement" },

  // Classic Elevated combinations
  CE_WN:  { primaryFolder: "classic-elevated", secondaryFolder: "warm-natural",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Classic Elevated with Warm Natural — timeless polish softened by organic material warmth" },
  CE_MT:  { primaryFolder: "classic-elevated", secondaryFolder: "warm-natural",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Classic Elevated with Mediterranean texture — refined millwork with zellige, plaster, and Old World detail" },
  CE_CTG: { primaryFolder: "classic-elevated", secondaryFolder: "cottage-character",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Classic Elevated with Cottage Character — polished timeless finish with personal charm and character detail" },
  CE_OS:  { primaryFolder: "classic-elevated", secondaryFolder: "organic-spa",          blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Classic Elevated with Organic Spa — the most refined wellness direction — polished classic with natural calm" },
  CE_RI:  { primaryFolder: "classic-elevated", secondaryFolder: "rustic-industrial",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Classic Elevated with Rustic Industrial contrast — polished millwork with raw material drama as counterpoint" },

  // Rustic Industrial combinations
  RI_WN:  { primaryFolder: "rustic-industrial", secondaryFolder: "warm-natural",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Rustic Industrial with Warm Natural — raw metal and dark wood drama softened by organic natural warmth" },
  RI_MCL: { primaryFolder: "rustic-industrial", secondaryFolder: "modern-clean",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Rustic Industrial with Modern Clean — bold dark drama within a precise minimal framework" },
  RI_CE:  { primaryFolder: "rustic-industrial", secondaryFolder: "classic-elevated",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Rustic Industrial with Classic Elevated — raw masculine drama elevated by refined millwork and timeless detail" },
  RI_CTG: { primaryFolder: "rustic-industrial", secondaryFolder: "cottage-character",   blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Rustic Industrial with Cottage Character — bold raw drama with personal warmth and handcrafted detail" },
  RI_OS:  { primaryFolder: "rustic-industrial", secondaryFolder: "organic-spa",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Rustic Industrial with Organic Spa calm — dark dramatic materials softened by natural wellness finish" },

  // Cottage Character combinations
  CTG_WN: { primaryFolder: "cottage-character", secondaryFolder: "warm-natural",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Cottage Character with Warm Natural — personal charm layered with rich natural organic material depth" },
  CTG_CE: { primaryFolder: "cottage-character", secondaryFolder: "classic-elevated",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Cottage Character with Classic Elevated — charming personality elevated by timeless polish and refined detail" },
  CTG_OS: { primaryFolder: "cottage-character", secondaryFolder: "organic-spa",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Cottage Character with Organic Spa — handcrafted warmth with a natural wellness calm in the primary suite" },
  CTG_RI: { primaryFolder: "cottage-character", secondaryFolder: "rustic-industrial",   blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Cottage Character with Rustic Industrial — cottage charm with raw material drama as a bold counterpoint" },
  CTG_MT: { primaryFolder: "cottage-character", secondaryFolder: "warm-natural",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Cottage Character with Mediterranean texture — charming warmth layered with zellige, plaster, and handcrafted Old World detail" },

  // Mediterranean Textured combinations
  MT_OS:  { primaryFolder: "warm-natural",      secondaryFolder: "organic-spa",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Mediterranean Textured with Organic Spa — zellige and plaster warmth with natural wellness calm" },
  MT_WN:  { primaryFolder: "warm-natural",      secondaryFolder: "warm-natural",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Mediterranean Textured with Warm Natural — Old World handcrafted detail with organic material richness" },
  MT_CE:  { primaryFolder: "warm-natural",      secondaryFolder: "classic-elevated",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Mediterranean Textured with Classic Elevated — romantic handcrafted texture within a refined timeless framework" },
  MT_CTG: { primaryFolder: "warm-natural",      secondaryFolder: "cottage-character",   blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Mediterranean Textured with Cottage Character — the most characterful and personally expressive finish direction" },

  // Coastal Light combinations
  CL_WN:  { primaryFolder: "coastal-light",     secondaryFolder: "warm-natural",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Coastal Light with Warm Natural — bright airy resort finish grounded by natural organic material warmth" },
  CL_OS:  { primaryFolder: "coastal-light",     secondaryFolder: "organic-spa",         blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Coastal Light with Organic Spa — the most relaxed wellness direction — bright coastal energy with natural calm" },
  CL_MCL: { primaryFolder: "coastal-light",     secondaryFolder: "modern-clean",        blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Coastal Light with Modern Clean — the brightest and most minimal direction — airy resort precision" },
  CL_CE:  { primaryFolder: "coastal-light",     secondaryFolder: "classic-elevated",    blendRatio: { primary: 0.6, secondary: 0.4 }, blendDescription: "Coastal Light with Classic Elevated — relaxed coastal energy with timeless polish and refined detail" },
};

// ─── Mood board image builder ─────────────────────────────────────────────────

/**
 * Builds a weighted set of Cloudinary mood board image URLs for the email.
 *
 * Uses the prospect's primary and secondary finish codes to pull style-
 * representative room photos across multiple room types. Each room folder
 * (kitchens, primary-bathrooms, etc.) contains images named by style slug
 * (e.g., warm-natural-01, warm-natural-02).
 *
 * Distribution: 60% primary style · 30% secondary style · 10% outdoor anchor
 */
export function buildWeightedMoodboardPaths(
  primaryFinish: string,
  secondaryFinish: string,
  cloudName: string,
  count = 8,
): string[] {
  const primarySlug    = FINISH_SLUG_MAP[primaryFinish]  ?? "warm-natural";
  const secondarySlug  = FINISH_SLUG_MAP[secondaryFinish] ?? "modern-clean";
  const primaryFolders = FINISH_ROOM_FOLDERS[primaryFinish]  ?? ["moodboards/kitchens"];
  const secondaryFolders = FINISH_ROOM_FOLDERS[secondaryFinish] ?? ["moodboards/primary-bathrooms"];

  const primaryCount   = Math.round(count * 0.6);
  const secondaryCount = Math.round(count * 0.3);
  const tertiaryCount  = count - primaryCount - secondaryCount;

  const paths: string[] = [];

  // ── Primary style images (60%) ───────────────────────────────────────────
  let added = 0;
  outer1: for (const folder of primaryFolders) {
    for (let i = 1; i <= 2; i++) {
      if (added >= primaryCount) break outer1;
      paths.push(`${folder}/${primarySlug}-0${i}`);
      added++;
    }
  }

  // ── Secondary style images (30%) ─────────────────────────────────────────
  added = 0;
  outer2: for (const folder of secondaryFolders) {
    for (let i = 1; i <= 2; i++) {
      if (added >= secondaryCount) break outer2;
      paths.push(`${folder}/${secondarySlug}-0${i}`);
      added++;
    }
  }

  // ── Outdoor living anchor (10%) ───────────────────────────────────────────
  for (let i = 0; i < tertiaryCount; i++) {
    paths.push(`moodboards/outdoor-living/${primarySlug}-01`);
  }

  const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
  return paths.map((p) => `${base}/${p}`);
}

// ─── Blend description generator ─────────────────────────────────────────────

/**
 * Returns a human-readable description of the prospect's style blend,
 * used in the concept email and on-screen completion screen.
 */
export function getBlendDescription(
  primaryArch:    string,
  secondaryArch:  string,
  primaryFinish:  string,
  secondaryFinish: string,
): {
  architecturalBlend: string;
  interiorBlend: string;
  fullStatement: string;
} {
  const archKey   = `${primaryArch}_${secondaryArch}`;
  const finishKey = `${primaryFinish}_${secondaryFinish}`;

  const archCombo   = exteriorCombinations[archKey];
  const finishCombo = interiorCombinations[finishKey];

  const architecturalBlend = archCombo?.blendDescription
    ?? `${ARCH_FOLDER_MAP[primaryArch] ?? primaryArch} with ${ARCH_FOLDER_MAP[secondaryArch] ?? secondaryArch} influences`;

  const interiorBlend = finishCombo?.blendDescription
    ?? `${FINISH_SLUG_MAP[primaryFinish] ?? primaryFinish} with ${FINISH_SLUG_MAP[secondaryFinish] ?? secondaryFinish} accents`;

  const fullStatement = `${architecturalBlend}. Inside, the finish direction is ${interiorBlend.charAt(0).toLowerCase()}${interiorBlend.slice(1)}.`;

  return { architecturalBlend, interiorBlend, fullStatement };
}
