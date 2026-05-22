/**
 * Emerson Park Design & Construction
 * Three-Stage Visual Style Quiz — Question Bank
 *
 * STAGE 1 — Exterior Discovery  (11 questions)
 * STAGE 2 — Interior Discovery  (10 questions)
 * STAGE 3 — Project Details     (form, not questions — defined in QuizFlow)
 *
 * Architectural style codes (exterior):
 *   WM  Warm Modern        MF  Modern Farmhouse     TR  New Traditional
 *   CC  Coastal Contemporary  MS  Contemporary Mediterranean  OM  Organic Modern
 *   MC  Modern Cottage     MB  Modern Barn          MM  Mountain Modern
 *   MP  Modern Prairie
 *
 * Interior finish codes:
 *   MCL  Modern Clean      WN  Warm Natural         CE  Classic Elevated
 *   CL   Coastal Light     MT  Mediterranean Textured  OS  Organic Spa
 *   CTG  Cottage Character  RI  Rustic / Industrial
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  // Stage 1: Cloudinary image-based cards
  imageFolder?: string;
  imageName?: string;
  tags?: string[];
  // Stage 2: gradient color cards (kept for backwards compat)
  gradient?: string;
  emoji?: string;
  signals?: string[];
}

export interface StageQuestion {
  id: string;
  // Stage 1 format
  heading?: string;
  subheading?: string;
  selectionMode?: "single" | "multi";
  // Stage 2 format (backwards compatible)
  prompt?: string;
  type?: "single" | "multi" | "multi-limited";
  maxSelections?: number;
  options: QuizOption[];
}

// ─── Style code name maps ─────────────────────────────────────────────────────

export const ARCH_STYLES: Record<string, string> = {
  WM: "Warm Modern",
  MF: "Modern Farmhouse",
  TR: "New Traditional",
  CC: "Coastal Contemporary",
  MS: "Contemporary Mediterranean",
  OM: "Organic Modern",
  MC: "Modern Cottage",
  MB: "Modern Barn",
  MM: "Mountain Modern",
  MP: "Modern Prairie",
};

export const FINISH_STYLES: Record<string, string> = {
  MCL: "Modern Clean",
  WN:  "Warm Natural",
  CE:  "Classic Elevated",
  CL:  "Coastal Light",
  MT:  "Mediterranean Textured",
  OS:  "Organic Spa",
  CTG: "Cottage Character",
  RI:  "Rustic / Industrial",
};

// ─── STAGE 1 — Exterior Discovery (11 questions) ──────────────────────────────

export const STAGE_1_QUESTIONS: StageQuestion[] = [
  // ── Q1: Architectural Style (Primary) — single select, highest weight ──────
  {
    id: "q1_primary_style",
    heading: "Which of these home styles feels closest to your vision?",
    subheading: "Select one",
    selectionMode: "single",
    options: [
      {
        id: "warm_modern",
        label: "Warm Modern",
        description: "Clean lines, warm materials, livable luxury",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "hero",
        tags: ["WM", "modern", "warm", "clean", "luxury"],
      },
      {
        id: "modern_farmhouse",
        label: "Modern Farmhouse 2.0",
        description: "Refined, regional, built to last",
        imageFolder: "styles/modern-farmhouse/exterior",
        imageName: "hero",
        tags: ["MF", "farmhouse", "casual", "approachable", "family"],
      },
      {
        id: "transitional",
        label: "Transitional / New Traditional",
        description: "Classic proportions, modern sensibility",
        imageFolder: "styles/transitional/exterior",
        imageName: "hero",
        tags: ["TR", "transitional", "timeless", "classic", "resale"],
      },
      {
        id: "coastal_contemporary",
        label: "Coastal Contemporary",
        description: "Architectural coastal living done right",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "hero",
        tags: ["CC", "coastal", "light", "outdoor", "florida"],
      },
      {
        id: "mediterranean",
        label: "Contemporary Mediterranean",
        description: "Resort-inspired with Old World soul",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "hero",
        tags: ["MS", "mediterranean", "romantic", "textured", "resort"],
      },
      {
        id: "organic_modern",
        label: "Organic Modern",
        description: "Natural materials, spa-like calm",
        imageFolder: "styles/organic-modern/exterior",
        imageName: "hero",
        tags: ["OM", "organic", "natural", "wellness", "spa", "calm"],
      },
    ],
  },

  // ── Q2: Architectural Style (Secondary) — multi select ───────────────────
  {
    id: "q2_secondary_style",
    heading: "Any of these also speak to you?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "modern_cottage",
        label: "Modern Cottage",
        description: "Warmth and character for modern life",
        imageFolder: "styles/modern-cottage/exterior",
        imageName: "hero",
        tags: ["MC", "cottage", "charm", "character", "warm", "detail"],
      },
      {
        id: "barndominium",
        label: "Barndominium / Modern Barn",
        description: "Rural luxury with room for everything",
        imageFolder: "styles/barndominium/exterior",
        imageName: "hero",
        tags: ["MB", "barn", "rural", "volume", "flexible", "land"],
      },
      {
        id: "mountain_modern",
        label: "Mountain Modern",
        description: "Grounded, durable, high-end without trying",
        imageFolder: "styles/mountain-modern/exterior",
        imageName: "hero",
        tags: ["MM", "mountain", "rustic", "dramatic", "stone", "timber"],
      },
      {
        id: "modern_prairie",
        label: "Modern Prairie",
        description: "Horizontal luxury for wide open lots",
        imageFolder: "styles/modern-prairie/exterior",
        imageName: "hero",
        tags: ["MP", "prairie", "horizontal", "low", "calm", "estate"],
      },
      {
        id: "warm_modern_alt",
        label: "Warm Modern",
        description: "Clean lines, warm materials, livable luxury",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "alt",
        tags: ["WM", "modern", "warm", "clean", "luxury"],
      },
      {
        id: "transitional_alt",
        label: "Transitional",
        description: "Classic proportions, modern sensibility",
        imageFolder: "styles/transitional/exterior",
        imageName: "alt",
        tags: ["TR", "transitional", "timeless", "classic", "resale"],
      },
    ],
  },

  // ── Q3: Lifestyle / Feeling — multi select ───────────────────────────────
  {
    id: "q3_lifestyle_feel",
    heading: "Which of these homes most closely matches the feeling you want to build?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "the_entertainer",
        label: "The Entertainer",
        description: "Open, expansive, built for gathering",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "entertainer",
        tags: ["WM", "CC", "entertaining", "open", "social", "indoor-outdoor", "hosting"],
      },
      {
        id: "the_private_retreat",
        label: "The Private Retreat",
        description: "Calm, secluded, resort-like serenity",
        imageFolder: "styles/organic-modern/exterior",
        imageName: "retreat",
        tags: ["OM", "MS", "privacy", "calm", "resort", "wellness", "secluded"],
      },
      {
        id: "the_family_estate",
        label: "The Family Estate",
        description: "Timeless, generous, built for generations",
        imageFolder: "styles/transitional/exterior",
        imageName: "estate",
        tags: ["TR", "MF", "family", "timeless", "generous", "legacy", "resale"],
      },
      {
        id: "the_modern_statement",
        label: "The Modern Statement",
        description: "Bold, architectural, unmistakably custom",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "statement",
        tags: ["WM", "MP", "bold", "custom", "architectural", "statement", "unique"],
      },
      {
        id: "the_warm_sanctuary",
        label: "The Warm Sanctuary",
        description: "Natural materials, soft light, deeply livable",
        imageFolder: "styles/organic-modern/exterior",
        imageName: "sanctuary",
        tags: ["OM", "WM", "warm", "natural", "livable", "soft", "organic", "comfort"],
      },
      {
        id: "the_grand_arrival",
        label: "The Grand Arrival",
        description: "Impressive from the moment you turn in the driveway",
        imageFolder: "styles/transitional/exterior",
        imageName: "grand",
        tags: ["TR", "MS", "grand", "impressive", "arrival", "curb-appeal", "presence"],
      },
    ],
  },

  // ── Q4: Exterior Color Palette — multi select ────────────────────────────
  {
    id: "q4_color_palette",
    heading: "Which exterior color palette feels right for your home?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "warm_white_natural",
        label: "Warm White and Natural",
        description: "Warm white, natural wood, soft stone",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "palette-warm-white",
        tags: ["WM", "OM", "CC", "warm-white", "natural", "wood", "stone", "soft"],
      },
      {
        id: "crisp_contrast",
        label: "Crisp Contrast",
        description: "Crisp white, black accents, sharp contrast",
        imageFolder: "styles/modern-farmhouse/exterior",
        imageName: "palette-contrast",
        tags: ["MF", "TR", "white", "black", "contrast", "crisp"],
      },
      {
        id: "warm_greige",
        label: "Warm Greige",
        description: "Soft greige, taupe, warm bronze",
        imageFolder: "styles/transitional/exterior",
        imageName: "palette-greige",
        tags: ["WM", "MS", "OM", "greige", "taupe", "bronze", "understated"],
      },
      {
        id: "dark_dramatic",
        label: "Dark and Dramatic",
        description: "Charcoal, wood, dark stone",
        imageFolder: "styles/mountain-modern/exterior",
        imageName: "palette-dark",
        tags: ["MB", "MM", "charcoal", "dark", "dramatic", "bold"],
      },
      {
        id: "coastal_sand",
        label: "Coastal Sand",
        description: "Pale whites, sand tones, driftwood",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "palette-coastal",
        tags: ["CC", "coastal", "pale", "sand", "light", "airy"],
      },
      {
        id: "mediterranean_earth",
        label: "Mediterranean Earth",
        description: "Warm plaster, terracotta, aged wood",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "palette-med",
        tags: ["MS", "terracotta", "plaster", "earthy", "warm", "regional"],
      },
    ],
  },

  // ── Q5: Primary Exterior Materials — multi select ────────────────────────
  {
    id: "q5_primary_materials",
    heading: "Which primary exterior material combination draws you in?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "stucco_stone_wood",
        label: "Stucco and Stone",
        description: "Smooth stucco, natural stone, warm wood accents",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "mat-stucco-stone",
        tags: ["WM", "OM", "MS", "stucco", "stone", "wood", "warm"],
      },
      {
        id: "siding_steel",
        label: "Siding and Steel",
        description: "Light siding, black windows, metal details",
        imageFolder: "styles/modern-farmhouse/exterior",
        imageName: "mat-siding",
        tags: ["MF", "TR", "siding", "black-windows", "metal", "contrast"],
      },
      {
        id: "brick_trim",
        label: "Brick and Trim",
        description: "Brick, painted trim, classic architectural detail",
        imageFolder: "styles/transitional/exterior",
        imageName: "mat-brick",
        tags: ["TR", "MC", "brick", "trim", "classic", "timeless"],
      },
      {
        id: "stucco_glass",
        label: "Stucco and Glass",
        description: "Smooth stucco, expansive glass, minimal ornamentation",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "mat-stucco-glass",
        tags: ["CC", "WM", "MP", "stucco", "glass", "minimal", "modern"],
      },
      {
        id: "stone_timber",
        label: "Stone and Timber",
        description: "Heavy stone, timber, dark metal windows",
        imageFolder: "styles/mountain-modern/exterior",
        imageName: "mat-stone-timber",
        tags: ["MM", "MB", "stone", "timber", "dark-metal", "dramatic"],
      },
      {
        id: "mixed_natural",
        label: "Mixed Natural",
        description: "Mixed stone, soft brick, layered natural texture",
        imageFolder: "styles/modern-cottage/exterior",
        imageName: "mat-mixed",
        tags: ["MC", "TR", "mixed", "stone", "brick", "layered", "character"],
      },
    ],
  },

  // ── Q6: Secondary Material Details — multi select ────────────────────────
  {
    id: "q6_secondary_materials",
    heading: "Which secondary material details catch your eye?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "wood_soffit",
        label: "Wood Soffit Detail",
        description: "Warm wood ceiling and soffit accents",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "detail-soffit",
        tags: ["WM", "OM", "wood", "soffit", "warm", "natural"],
      },
      {
        id: "board_batten",
        label: "Board and Batten",
        description: "Vertical board and batten accent panels",
        imageFolder: "styles/modern-farmhouse/exterior",
        imageName: "detail-batten",
        tags: ["MF", "MC", "board-batten", "vertical", "farmhouse", "casual"],
      },
      {
        id: "metal_accent_roof",
        label: "Metal Accent Roof",
        description: "Standing seam metal roof or canopy detail",
        imageFolder: "styles/barndominium/exterior",
        imageName: "detail-metal-roof",
        tags: ["MB", "MM", "MF", "metal-roof", "standing-seam", "modern", "durable"],
      },
      {
        id: "limestone_detail",
        label: "Limestone Detail",
        description: "Limestone or travertine architectural detail",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "detail-limestone",
        tags: ["MS", "TR", "limestone", "travertine", "stone", "luxury"],
      },
      {
        id: "iron_steel",
        label: "Iron and Steel",
        description: "Iron or steel decorative elements and railings",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "detail-iron",
        tags: ["MS", "MM", "iron", "steel", "decorative", "character"],
      },
      {
        id: "reclaimed_timber",
        label: "Reclaimed Timber",
        description: "Weathered or reclaimed wood accents",
        imageFolder: "styles/mountain-modern/exterior",
        imageName: "detail-reclaimed",
        tags: ["MM", "MB", "MC", "reclaimed", "timber", "weathered", "character"],
      },
    ],
  },

  // ── Q7: Window Style — multi select ─────────────────────────────────────
  {
    id: "q7_window_style",
    heading: "Which window style speaks to you?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "large_black_frames",
        label: "Large Modern Black Frames",
        description: "Bold, graphic, commanding street presence",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "window-black-frame",
        tags: ["WM", "MP", "black-windows", "large-format", "modern", "bold"],
      },
      {
        id: "floor_to_ceiling",
        label: "Floor to Ceiling Glass",
        description: "Dramatic indoor-outdoor connection",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "window-floor-ceiling",
        tags: ["WM", "CC", "OM", "floor-ceiling", "glass", "indoor-outdoor", "dramatic"],
      },
      {
        id: "classic_divided",
        label: "Classic Divided Light",
        description: "Traditional, warm, timeless character",
        imageFolder: "styles/transitional/exterior",
        imageName: "window-divided",
        tags: ["TR", "MC", "divided-light", "traditional", "classic", "warm"],
      },
      {
        id: "arched_windows",
        label: "Arched Windows",
        description: "Mediterranean, romantic, architectural detail",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "window-arched",
        tags: ["MS", "MC", "arched", "mediterranean", "romantic", "detail"],
      },
      {
        id: "sliding_folding",
        label: "Sliding and Folding Glass",
        description: "Outdoor priority, built for entertaining",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "window-sliding",
        tags: ["CC", "WM", "OM", "sliding", "folding", "outdoor", "entertaining"],
      },
      {
        id: "clerestory",
        label: "Clerestory Windows",
        description: "Modern, private, design-forward",
        imageFolder: "styles/modern-prairie/exterior",
        imageName: "window-clerestory",
        tags: ["MP", "OM", "WM", "clerestory", "privacy", "modern", "design-forward"],
      },
    ],
  },

  // ── Q8: Front Entry Experience — multi select ────────────────────────────
  {
    id: "q8_front_entry",
    heading: "How do you want guests to feel when they arrive?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "modern_glass_entry",
        label: "Modern Glass Entry",
        description: "Tall, dramatic, bold custom welcome",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "entry-glass",
        tags: ["WM", "OM", "glass-entry", "dramatic", "custom", "modern"],
      },
      {
        id: "farmhouse_porch",
        label: "Farmhouse Porch",
        description: "Covered, casual, warm and welcoming",
        imageFolder: "styles/modern-farmhouse/exterior",
        imageName: "entry-porch",
        tags: ["MF", "MC", "porch", "covered", "casual", "welcoming"],
      },
      {
        id: "formal_symmetrical",
        label: "Formal Symmetrical Entry",
        description: "Timeless, confident, classic presence",
        imageFolder: "styles/transitional/exterior",
        imageName: "entry-formal",
        tags: ["TR", "formal", "symmetrical", "timeless", "classic"],
      },
      {
        id: "arched_med_entry",
        label: "Arched Mediterranean Entry",
        description: "Romantic, textured, resort-like arrival",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "entry-arched",
        tags: ["MS", "arched", "mediterranean", "romantic", "resort"],
      },
      {
        id: "private_courtyard",
        label: "Private Courtyard Entry",
        description: "Exclusive, intimate, high-end sanctuary",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "entry-courtyard",
        tags: ["MS", "OM", "CC", "courtyard", "private", "exclusive", "resort"],
      },
      {
        id: "cottage_garden",
        label: "Cottage Garden Entry",
        description: "Charming, layered, full of character",
        imageFolder: "styles/modern-cottage/exterior",
        imageName: "entry-cottage",
        tags: ["MC", "TR", "cottage", "garden", "charm", "character"],
      },
    ],
  },

  // ── Q9: Garage and Arrival — multi select ───────────────────────────────
  {
    id: "q9_garage_arrival",
    heading: "Which garage and arrival layout fits your lifestyle?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "side_entry_garage",
        label: "Side Entry Garage",
        description: "Upscale curb appeal, garage hidden from street",
        imageFolder: "styles/transitional/exterior",
        imageName: "garage-side",
        tags: ["TR", "WM", "side-entry", "upscale", "curb-appeal", "hidden"],
      },
      {
        id: "front_load_upgraded",
        label: "Front Load with Upgraded Doors",
        description: "Practical, design-integrated, elevated",
        imageFolder: "styles/modern-farmhouse/exterior",
        imageName: "garage-front",
        tags: ["MF", "TR", "front-load", "upgraded-doors", "practical", "integrated"],
      },
      {
        id: "motor_court",
        label: "Motor Court Arrival",
        description: "Formal, luxury, custom estate feel",
        imageFolder: "styles/transitional/exterior",
        imageName: "garage-motor-court",
        tags: ["TR", "MS", "motor-court", "formal", "luxury", "estate"],
      },
      {
        id: "detached_carriage",
        label: "Detached Carriage House",
        description: "Estate character, flexible and independent",
        imageFolder: "styles/modern-cottage/exterior",
        imageName: "garage-carriage",
        tags: ["MC", "MF", "MB", "detached", "carriage", "estate", "flexible"],
      },
      {
        id: "hidden_recessed",
        label: "Hidden or Recessed Garage",
        description: "Design-forward, curb appeal priority",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "garage-hidden",
        tags: ["WM", "MP", "OM", "hidden", "recessed", "design-forward", "curb-appeal"],
      },
      {
        id: "oversized_rv",
        label: "Oversized or RV Garage",
        description: "Function-first, built for your lifestyle",
        imageFolder: "styles/barndominium/exterior",
        imageName: "garage-oversized",
        tags: ["MB", "MM", "oversized", "rv", "workshop", "function"],
      },
    ],
  },

  // ── Q10: Pool Direction — multi select ──────────────────────────────────
  {
    id: "q10_pool",
    heading: "Which pool direction excites you?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "modern_geometric_spa",
        label: "Modern Geometric with Spa",
        description: "Clean, architectural, statement luxury",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "pool-geometric",
        tags: ["WM", "CC", "pool", "geometric", "spa", "modern", "statement"],
      },
      {
        id: "resort_sun_shelf",
        label: "Resort Style with Sun Shelf",
        description: "Social, lifestyle-driven, vacation every day",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "pool-resort",
        tags: ["CC", "pool", "resort", "sun-shelf", "social", "lifestyle"],
      },
      {
        id: "infinity_edge",
        label: "Infinity Edge",
        description: "Dramatic, view-oriented, showstopping",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "pool-infinity",
        tags: ["WM", "OM", "pool", "infinity", "dramatic", "view", "luxury"],
      },
      {
        id: "mediterranean_courtyard_pool",
        label: "Mediterranean Courtyard Pool",
        description: "Private, intimate, romantic",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "pool-courtyard",
        tags: ["MS", "pool", "courtyard", "private", "intimate", "romantic"],
      },
      {
        id: "organic_stone_pool",
        label: "Organic Stone Surround",
        description: "Wellness, calm, natural spa-like",
        imageFolder: "styles/organic-modern/exterior",
        imageName: "pool-organic",
        tags: ["OM", "pool", "stone", "organic", "wellness", "calm", "spa"],
      },
      {
        id: "no_pool",
        label: "No Pool at This Time",
        description: "Not a priority for this project",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "no-pool",
        tags: ["no-pool", "future"],
      },
    ],
  },

  // ── Q11: Outdoor Living — multi select ──────────────────────────────────
  {
    id: "q11_outdoor_living",
    heading: "Which outdoor living and kitchen area feels right?",
    subheading: "Select all that apply",
    selectionMode: "multi",
    options: [
      {
        id: "modern_covered_lanai",
        label: "Modern Covered Lanai",
        description: "Outdoor kitchen, dining, entertaining focused",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "outdoor-lanai",
        tags: ["WM", "CC", "OM", "lanai", "outdoor-kitchen", "dining", "entertaining"],
      },
      {
        id: "farmhouse_porch_fire",
        label: "Farmhouse Porch and Fireplace",
        description: "Casual, warm, gathered around the fire",
        imageFolder: "styles/modern-farmhouse/exterior",
        imageName: "outdoor-porch",
        tags: ["MF", "MC", "porch", "fireplace", "casual", "gathering", "warm"],
      },
      {
        id: "resort_pavilion",
        label: "Resort Pavilion or Cabana",
        description: "Full summer kitchen, luxury lifestyle",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "outdoor-pavilion",
        tags: ["CC", "MS", "pavilion", "cabana", "summer-kitchen", "resort", "luxury"],
      },
      {
        id: "organic_spa_courtyard",
        label: "Organic Spa Courtyard",
        description: "Fire feature, privacy, wellness and calm",
        imageFolder: "styles/organic-modern/exterior",
        imageName: "outdoor-spa",
        tags: ["OM", "MS", "courtyard", "fire", "privacy", "wellness", "calm"],
      },
      {
        id: "open_land_zone",
        label: "Open Land Outdoor Zone",
        description: "Firepit, open seating, relaxed acreage living",
        imageFolder: "styles/barndominium/exterior",
        imageName: "outdoor-land",
        tags: ["MB", "MM", "firepit", "open", "acreage", "land", "relaxed"],
      },
      {
        id: "simple_covered_patio",
        label: "Simple Covered Patio",
        description: "Clean, understated, functional outdoor space",
        imageFolder: "styles/transitional/exterior",
        imageName: "outdoor-patio",
        tags: ["TR", "WM", "patio", "covered", "simple", "functional"],
      },
    ],
  },
];

// ─── STAGE 2 — Interior Discovery (10 questions) ──────────────────────────────

export const STAGE_2_QUESTIONS: StageQuestion[] = [
  {
    id: "int_1",
    prompt:
      "Which interior finish directions feel most like the home you would want to live in?",
    type: "multi",
    options: [
      {
        id: "A",
        label: "Modern Clean",
        description: "Simple, crisp, minimal — beautifully uncluttered",
        signals: ["MCL", "WM"],
        gradient: "from-zinc-700 to-zinc-400",
        emoji: "⬜",
      },
      {
        id: "B",
        label: "Warm Natural",
        description: "Warm woods, organic textures, relaxed luxury",
        signals: ["WN", "OM"],
        gradient: "from-amber-700 to-stone-400",
        emoji: "🪵",
      },
      {
        id: "C",
        label: "Classic Elevated",
        description: "Timeless, formal, premium investment",
        signals: ["CE", "TR"],
        gradient: "from-zinc-600 to-zinc-300",
        emoji: "✦",
      },
      {
        id: "D",
        label: "Coastal Light",
        description: "Relaxed, bright, casual coastal luxury",
        signals: ["CL", "CC"],
        gradient: "from-sky-400 to-cyan-200",
        emoji: "🌊",
      },
      {
        id: "E",
        label: "Mediterranean Textured",
        description: "Character, warmth, handcrafted detail",
        signals: ["MT", "MS"],
        gradient: "from-orange-600 to-amber-400",
        emoji: "🌿",
      },
      {
        id: "F",
        label: "Organic Spa",
        description: "Wellness, quiet luxury, calm and elevated",
        signals: ["OS", "OM"],
        gradient: "from-stone-500 to-stone-300",
        emoji: "🧘",
      },
      {
        id: "G",
        label: "Cottage Character",
        description: "Personality, warmth, cozy detail",
        signals: ["CTG", "MC"],
        gradient: "from-rose-500 to-stone-300",
        emoji: "🌸",
      },
      {
        id: "H",
        label: "Rustic / Industrial",
        description: "Bold, durable, dramatic and raw",
        signals: ["RI", "MM", "MB"],
        gradient: "from-stone-800 to-stone-500",
        emoji: "⚙️",
      },
    ],
  },

  {
    id: "int_2",
    prompt: "Which flooring directions would you want considered throughout your new home?",
    type: "multi",
    options: [
      {
        id: "A",
        label: "Wide-Plank White Oak",
        description: "Warm, natural, timeless luxury",
        signals: ["WN", "OS", "CL"],
        gradient: "from-amber-600 to-stone-400",
        emoji: "🪵",
      },
      {
        id: "B",
        label: "Medium Warm Oak",
        description: "Warmth, family-friendly, versatile",
        signals: ["WN", "MF", "TR"],
        gradient: "from-amber-700 to-stone-500",
        emoji: "🌳",
      },
      {
        id: "C",
        label: "Durable Wood-Look LVP",
        description: "Practical, low-maintenance, family durability",
        signals: ["MF"],
        gradient: "from-stone-600 to-stone-400",
        emoji: "✅",
      },
      {
        id: "D",
        label: "Large-Format Porcelain Tile",
        description: "Modern, durable, easy to maintain",
        signals: ["MCL", "WM", "CC"],
        gradient: "from-zinc-600 to-zinc-300",
        emoji: "⬜",
      },
      {
        id: "E",
        label: "Natural Stone-Look Tile",
        description: "Organic luxury, elevated character",
        signals: ["OS", "MT", "MS"],
        gradient: "from-stone-500 to-stone-300",
        emoji: "🪨",
      },
      {
        id: "F",
        label: "Patterned Tile in Select Areas",
        description: "Personality, design moments",
        signals: ["CTG", "MT"],
        gradient: "from-rose-600 to-amber-400",
        emoji: "🎨",
      },
      {
        id: "G",
        label: "Dark Wood / Rich Flooring",
        description: "Drama, depth, sophisticated character",
        signals: ["CE", "RI", "MM"],
        gradient: "from-stone-900 to-stone-600",
        emoji: "🖤",
      },
      {
        id: "H",
        label: "Concrete / Polished Modern",
        description: "Bold, industrial-modern statement",
        signals: ["MCL", "RI", "WM"],
        gradient: "from-zinc-700 to-zinc-500",
        emoji: "🏗️",
      },
    ],
  },

  {
    id: "int_3",
    prompt: "Which cabinet door styles are you most drawn to?",
    type: "multi",
    options: [
      {
        id: "A",
        label: "Flat Slab Cabinet Doors",
        description: "Modern, clean, minimal",
        signals: ["MCL", "WM"],
        gradient: "from-zinc-700 to-zinc-400",
        emoji: "▭",
      },
      {
        id: "B",
        label: "Slim Shaker Cabinets",
        description: "Versatile, warm, transitional",
        signals: ["WN", "MF", "TR"],
        gradient: "from-stone-500 to-stone-300",
        emoji: "📋",
      },
      {
        id: "C",
        label: "Traditional Shaker Cabinets",
        description: "Timeless, familiar, classic",
        signals: ["MF", "TR", "CE"],
        gradient: "from-zinc-500 to-zinc-300",
        emoji: "🏠",
      },
      {
        id: "D",
        label: "Inset Cabinetry",
        description: "Premium, precise, elevated craftsmanship",
        signals: ["CE", "TR"],
        gradient: "from-zinc-600 to-zinc-400",
        emoji: "✦",
      },
      {
        id: "E",
        label: "Reeded or Fluted Detail",
        description: "Custom, textured, design-forward",
        signals: ["OM", "WN"],
        gradient: "from-stone-600 to-stone-400",
        emoji: "🎵",
      },
      {
        id: "F",
        label: "Arched / Furniture-Style",
        description: "Character, warmth, custom personality",
        signals: ["MS", "CTG", "MT"],
        gradient: "from-rose-600 to-amber-400",
        emoji: "🌿",
      },
      {
        id: "G",
        label: "Beadboard / Cottage Detail",
        description: "Cottage charm, layered personality",
        signals: ["CTG", "MC"],
        gradient: "from-rose-500 to-stone-300",
        emoji: "🌸",
      },
      {
        id: "H",
        label: "Metal / Glass / Industrial",
        description: "Dramatic, bold, industrial edge",
        signals: ["RI", "MM"],
        gradient: "from-stone-800 to-zinc-600",
        emoji: "⚙️",
      },
    ],
  },

  {
    id: "int_4",
    prompt: "Which countertop styles are you most drawn to?",
    type: "multi",
    options: [
      {
        id: "A",
        label: "Clean White Quartz",
        description: "Crisp, clean, versatile",
        signals: ["MCL", "CL"],
        gradient: "from-zinc-200 to-white",
        emoji: "⬜",
      },
      {
        id: "B",
        label: "Warm Marble-Look Quartz",
        description: "Timeless, elegant, warm veining",
        signals: ["CE", "WN"],
        gradient: "from-stone-200 to-white",
        emoji: "🤍",
      },
      {
        id: "C",
        label: "Dramatic Veined Slab",
        description: "Statement, luxury, custom centerpiece",
        signals: ["WM", "CE"],
        gradient: "from-zinc-700 to-stone-400",
        emoji: "✦",
      },
      {
        id: "D",
        label: "Honed Stone Look",
        description: "Organic, spa-inspired, calm luxury",
        signals: ["OS", "MT", "OM"],
        gradient: "from-stone-400 to-stone-200",
        emoji: "🪨",
      },
      {
        id: "E",
        label: "Concrete-Look Surface",
        description: "Industrial-modern, durable, bold",
        signals: ["RI", "MCL", "WM"],
        gradient: "from-zinc-600 to-zinc-400",
        emoji: "🏗️",
      },
      {
        id: "F",
        label: "Butcher Block / Wood Accent",
        description: "Warm, casual, character accent",
        signals: ["MF", "CTG", "WN"],
        gradient: "from-amber-700 to-stone-500",
        emoji: "🪵",
      },
      {
        id: "G",
        label: "Dark Countertops",
        description: "Dramatic, bold, sophisticated depth",
        signals: ["RI", "MM"],
        gradient: "from-stone-900 to-stone-700",
        emoji: "🖤",
      },
      {
        id: "H",
        label: "Quartzite / Natural Stone Luxury",
        description: "Premium, elevated, genuine luxury",
        signals: ["CE", "WM", "OS"],
        gradient: "from-stone-400 to-stone-200",
        emoji: "💎",
      },
    ],
  },

  {
    id: "int_5",
    prompt: "Which kitchen direction feels right for your new home?",
    type: "single",
    options: [
      {
        id: "A",
        label: "Warm Modern Kitchen",
        description: "Clean, warm, refined — elevated daily cooking",
        signals: ["WM", "WN", "MCL"],
        gradient: "from-amber-700 to-stone-400",
        emoji: "👨‍🍳",
      },
      {
        id: "B",
        label: "Modern Farmhouse Kitchen",
        description: "Casual, family-friendly, welcoming",
        signals: ["MF", "CTG"],
        gradient: "from-slate-600 to-slate-300",
        emoji: "🌾",
      },
      {
        id: "C",
        label: "Classic Elevated Kitchen",
        description: "Formal, timeless, premium investment",
        signals: ["TR", "CE"],
        gradient: "from-zinc-600 to-zinc-300",
        emoji: "✦",
      },
      {
        id: "D",
        label: "Coastal Light Kitchen",
        description: "Bright, relaxed, airy palette",
        signals: ["CC", "CL"],
        gradient: "from-sky-400 to-cyan-200",
        emoji: "🌊",
      },
      {
        id: "E",
        label: "Mediterranean Textured Kitchen",
        description: "Warm, handcrafted, layered character",
        signals: ["MS", "MT"],
        gradient: "from-orange-600 to-amber-400",
        emoji: "🌿",
      },
      {
        id: "F",
        label: "Organic Minimal Kitchen",
        description: "Calm, quiet luxury, clean simplicity",
        signals: ["OM", "OS"],
        gradient: "from-stone-500 to-stone-300",
        emoji: "🧘",
      },
      {
        id: "G",
        label: "Cottage Character Kitchen",
        description: "Charm, personality, detailed warmth",
        signals: ["MC", "CTG"],
        gradient: "from-rose-500 to-stone-300",
        emoji: "🌸",
      },
      {
        id: "H",
        label: "Rustic / Industrial Kitchen",
        description: "Dramatic, masculine, durable and bold",
        signals: ["MM", "RI"],
        gradient: "from-stone-800 to-stone-500",
        emoji: "🔩",
      },
    ],
  },

  {
    id: "int_6",
    prompt: "Which lighting styles feel right for your new home?",
    type: "multi",
    options: [
      {
        id: "A",
        label: "Minimal Modern Fixtures",
        description: "Clean, architectural, understated",
        signals: ["MCL", "WM"],
        gradient: "from-zinc-700 to-zinc-400",
        emoji: "💡",
      },
      {
        id: "B",
        label: "Warm Woven / Natural Fixtures",
        description: "Organic, textural, relaxed luxury",
        signals: ["WN", "OM", "CL"],
        gradient: "from-amber-700 to-stone-400",
        emoji: "🏺",
      },
      {
        id: "C",
        label: "Classic Lanterns / Chandeliers",
        description: "Timeless, formal, elevated character",
        signals: ["CE", "TR"],
        gradient: "from-zinc-600 to-zinc-300",
        emoji: "🕯️",
      },
      {
        id: "D",
        label: "Coastal Casual Pendants",
        description: "Relaxed, airy, casual luxury",
        signals: ["CL", "CC"],
        gradient: "from-sky-400 to-cyan-200",
        emoji: "🌊",
      },
      {
        id: "E",
        label: "Mediterranean Iron / Brass Lighting",
        description: "Warm, handcrafted, regional character",
        signals: ["MT", "MS"],
        gradient: "from-orange-600 to-amber-400",
        emoji: "🌿",
      },
      {
        id: "F",
        label: "Sculptural Statement Lighting",
        description: "Custom, design-forward, art-like",
        signals: ["WM", "CE"],
        gradient: "from-amber-600 to-stone-400",
        emoji: "✨",
      },
      {
        id: "G",
        label: "Cottage Vintage-Inspired",
        description: "Character, charm, personality",
        signals: ["CTG", "MC"],
        gradient: "from-rose-500 to-stone-300",
        emoji: "🌸",
      },
      {
        id: "H",
        label: "Industrial / Rustic Fixtures",
        description: "Raw, bold, dramatic edge",
        signals: ["RI", "MM"],
        gradient: "from-stone-800 to-stone-600",
        emoji: "⚙️",
      },
    ],
  },

  {
    id: "int_7",
    prompt: "Which primary bathroom would you most want to wake up to every day?",
    type: "single",
    options: [
      {
        id: "A",
        label: "Clean Modern Spa",
        description: "Crisp, spa-like, elevated calm",
        signals: ["MCL", "WM", "OS"],
        gradient: "from-zinc-600 to-zinc-300",
        emoji: "✦",
      },
      {
        id: "B",
        label: "Warm Organic Spa",
        description: "Natural materials, soft warmth, wellness",
        signals: ["OS", "WN", "OM"],
        gradient: "from-amber-600 to-stone-400",
        emoji: "🧘",
      },
      {
        id: "C",
        label: "Classic Marble Bath",
        description: "Timeless luxury, polished, enduring",
        signals: ["CE", "TR"],
        gradient: "from-stone-300 to-white",
        emoji: "💎",
      },
      {
        id: "D",
        label: "Coastal Light Bath",
        description: "Airy, relaxed, bright and casual",
        signals: ["CL", "CC"],
        gradient: "from-sky-400 to-cyan-200",
        emoji: "🌊",
      },
      {
        id: "E",
        label: "Mediterranean Textured Bath",
        description: "Textured, romantic, handcrafted detail",
        signals: ["MT", "MS"],
        gradient: "from-orange-600 to-amber-400",
        emoji: "🌿",
      },
      {
        id: "F",
        label: "Cottage Character Bath",
        description: "Cozy, charming, warm personality",
        signals: ["CTG", "MC"],
        gradient: "from-rose-500 to-stone-300",
        emoji: "🌸",
      },
      {
        id: "G",
        label: "Dramatic Dark Spa",
        description: "Moody, sophisticated, statement retreat",
        signals: ["RI", "MM", "WM"],
        gradient: "from-zinc-900 to-zinc-600",
        emoji: "🖤",
      },
      {
        id: "H",
        label: "Resort-Style Wet Room",
        description: "Premium, open, full spa experience",
        signals: ["OS", "WM", "CC"],
        gradient: "from-teal-700 to-cyan-300",
        emoji: "🏊",
      },
    ],
  },

  {
    id: "int_8",
    prompt: "How do you prefer your main living spaces to flow?",
    type: "single",
    options: [
      {
        id: "A",
        label: "Fully Open Concept",
        description: "Kitchen, dining, and living as one seamless space",
        signals: ["CC", "WM", "MCL"],
        gradient: "from-sky-500 to-cyan-200",
        emoji: "↔️",
      },
      {
        id: "B",
        label: "Semi-Open with Soft Definition",
        description: "Connected but with some structure between zones",
        signals: ["MF", "TR", "WN"],
        gradient: "from-stone-500 to-stone-300",
        emoji: "🏡",
      },
      {
        id: "C",
        label: "Defined Rooms with Character",
        description: "Distinct rooms — each with its own personality",
        signals: ["TR", "CE", "MC"],
        gradient: "from-zinc-600 to-zinc-400",
        emoji: "🏛️",
      },
      {
        id: "D",
        label: "Dramatic Great Room as Centerpiece",
        description: "One grand volume space anchoring the home",
        signals: ["MB", "MM", "WM"],
        gradient: "from-stone-800 to-stone-500",
        emoji: "🗼",
      },
    ],
  },

  {
    id: "int_9",
    prompt: "Which interior color story speaks most to you?",
    type: "single",
    options: [
      {
        id: "A",
        label: "Warm & Earthy",
        description: "Taupes, warm whites, natural wood, amber accents",
        signals: ["WN", "OM", "MT"],
        gradient: "from-amber-700 to-stone-400",
        emoji: "🍂",
      },
      {
        id: "B",
        label: "Cool & Crisp",
        description: "True whites, light grays, black accents, minimal palette",
        signals: ["MCL", "CC"],
        gradient: "from-zinc-500 to-zinc-200",
        emoji: "❄️",
      },
      {
        id: "C",
        label: "Layered Neutral",
        description: "Greiges, soft stone, aged brass, textured neutrals",
        signals: ["CE", "OS", "WN"],
        gradient: "from-stone-500 to-stone-300",
        emoji: "🏺",
      },
      {
        id: "D",
        label: "Bright & Coastal Light",
        description: "Whites with soft blues, seafoam, sandy driftwood tones",
        signals: ["CL", "CC"],
        gradient: "from-sky-300 to-cyan-100",
        emoji: "🏖️",
      },
      {
        id: "E",
        label: "Moody & Sophisticated",
        description: "Deep greens, charcoal, aged bronze, dramatic depth",
        signals: ["RI", "MM", "CE"],
        gradient: "from-stone-800 to-zinc-600",
        emoji: "🌑",
      },
      {
        id: "F",
        label: "Warm Character & Charm",
        description: "Brick-toned reds, antique whites, heritage greens",
        signals: ["CTG", "MC"],
        gradient: "from-rose-700 to-stone-400",
        emoji: "🌸",
      },
    ],
  },

  {
    id: "int_10",
    prompt:
      "Which complete interior finish package feels most like the direction you would want us to design?",
    type: "single",
    options: [
      {
        id: "A",
        label: "Modern Clean Package",
        description: "MCL + WM — crisp, precise, minimally beautiful",
        signals: ["MCL", "WM"],
        gradient: "from-zinc-700 to-zinc-400",
        emoji: "⬜",
      },
      {
        id: "B",
        label: "Warm Natural Package",
        description: "WN + OM — organic, warm, relaxed luxury",
        signals: ["WN", "OM"],
        gradient: "from-amber-700 to-stone-400",
        emoji: "🪵",
      },
      {
        id: "C",
        label: "Classic Elevated Package",
        description: "CE + TR — timeless, formal, premium",
        signals: ["CE", "TR"],
        gradient: "from-zinc-600 to-zinc-300",
        emoji: "✦",
      },
      {
        id: "D",
        label: "Coastal Light Package",
        description: "CL + CC — airy, bright, coastal luxury",
        signals: ["CL", "CC"],
        gradient: "from-sky-500 to-cyan-200",
        emoji: "🌊",
      },
      {
        id: "E",
        label: "Mediterranean Textured Package",
        description: "MT + MS — character, warmth, handcrafted",
        signals: ["MT", "MS"],
        gradient: "from-orange-600 to-amber-400",
        emoji: "🌿",
      },
      {
        id: "F",
        label: "Organic Spa Package",
        description: "OS + OM — wellness, quiet, elevated calm",
        signals: ["OS", "OM"],
        gradient: "from-stone-500 to-stone-300",
        emoji: "🧘",
      },
      {
        id: "G",
        label: "Cottage Character Package",
        description: "CTG + MC — personality, charm, layered detail",
        signals: ["CTG", "MC"],
        gradient: "from-rose-500 to-stone-300",
        emoji: "🌸",
      },
      {
        id: "H",
        label: "Rustic / Industrial Package",
        description: "RI + MM — bold, dramatic, raw and durable",
        signals: ["RI", "MM", "MB"],
        gradient: "from-stone-800 to-stone-500",
        emoji: "⚙️",
      },
    ],
  },
];
