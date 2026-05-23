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
  // Cloudinary image reference (Stage 1 + Stage 2 options)
  imageFolder?: string;
  imageName?: string;
  // Scoring signals — used by scoreStage1 / scoreStage2
  tags?: string[];
  // Legacy fields kept for backwards compat (not used in current questions)
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
  // ── Q1: Interior Direction (multi, max 2, weight: 3) ───────────────────────
  {
    id: "q1_interior_direction",
    prompt: "Which interior finish directions feel most like the home you'd want to live in?",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "modern_clean",
        label: "Modern Clean",
        description: "Simple, crisp, minimal — beautifully uncluttered",
        imageFolder: "moodboards/kitchens",
        imageName: "modern-clean-01",
        tags: ["MCL"],
      },
      {
        id: "warm_natural",
        label: "Warm Natural",
        description: "Warm woods, organic textures, relaxed luxury",
        imageFolder: "moodboards/kitchens",
        imageName: "warm-natural-01",
        tags: ["WN"],
      },
      {
        id: "classic_elevated",
        label: "Classic Elevated",
        description: "Timeless, formal, premium investment",
        imageFolder: "moodboards/kitchens",
        imageName: "classic-elevated-01",
        tags: ["CE"],
      },
      {
        id: "coastal_light",
        label: "Coastal Light",
        description: "Relaxed, bright, casual coastal luxury",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "coastal-light-01",
        tags: ["CL"],
      },
      {
        id: "mediterranean_textured",
        label: "Mediterranean Textured",
        description: "Character, warmth, handcrafted detail",
        imageFolder: "moodboards/kitchens",
        imageName: "warm-natural-02",
        tags: ["MT"],
      },
      {
        id: "organic_spa",
        label: "Organic Spa",
        description: "Wellness, quiet luxury, calm and elevated",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "organic-spa-01",
        tags: ["OS"],
      },
      {
        id: "cottage_character",
        label: "Cottage Character",
        description: "Personality, warmth, cozy detail",
        imageFolder: "moodboards/kitchens",
        imageName: "cottage-character-01",
        tags: ["CTG"],
      },
      {
        id: "rustic_industrial",
        label: "Rustic / Industrial",
        description: "Bold, durable, dramatic and raw",
        imageFolder: "moodboards/kitchens",
        imageName: "rustic-industrial-01",
        tags: ["RI"],
      },
    ],
  },

  // ── Q2: Flooring (multi, max 2, weight: 1.5) ────────────────────────────────
  {
    id: "q2_flooring",
    prompt: "Which flooring directions would you want considered throughout your new home?",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "wide_plank_white_oak",
        label: "Wide-Plank White Oak",
        description: "Warm, natural, timeless luxury",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-white-oak-01",
        tags: ["WN", "OS", "CL"],
      },
      {
        id: "medium_warm_oak",
        label: "Medium Warm Oak",
        description: "Warmth, family-friendly, versatile",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-medium-oak-01",
        tags: ["WN", "CE"],
      },
      {
        id: "wood_look_lvp",
        label: "Durable Wood-Look LVP",
        description: "Practical, low-maintenance, family durability",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-lvp-01",
        tags: ["CTG"],
      },
      {
        id: "large_format_porcelain",
        label: "Large-Format Porcelain Tile",
        description: "Modern, durable, easy to maintain",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-porcelain-01",
        tags: ["MCL", "CL"],
      },
      {
        id: "natural_stone_tile",
        label: "Natural Stone-Look Tile",
        description: "Organic luxury, elevated character",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-stone-tile-01",
        tags: ["OS", "MT"],
      },
      {
        id: "patterned_tile",
        label: "Patterned Tile in Select Areas",
        description: "Personality, design moments",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-pattern-01",
        tags: ["CTG", "MT"],
      },
      {
        id: "dark_wood",
        label: "Dark Wood / Rich Flooring",
        description: "Drama, depth, sophisticated character",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-dark-wood-01",
        tags: ["CE", "RI"],
      },
      {
        id: "concrete_polished",
        label: "Concrete / Polished Modern",
        description: "Bold, industrial-modern statement",
        imageFolder: "moodboards/details-finishes",
        imageName: "floor-concrete-01",
        tags: ["MCL", "RI"],
      },
    ],
  },

  // ── Q3: Cabinet Style (multi, max 2, weight: 1.5) ───────────────────────────
  {
    id: "q3_cabinet_style",
    prompt: "Which cabinet door styles are you most drawn to?",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "flat_slab",
        label: "Flat Slab",
        description: "Modern, clean, minimal",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-flat-01",
        tags: ["MCL"],
      },
      {
        id: "slim_shaker",
        label: "Slim Shaker",
        description: "Versatile, warm, transitional",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-shaker-slim-01",
        tags: ["WN", "CL"],
      },
      {
        id: "traditional_shaker",
        label: "Traditional Shaker",
        description: "Timeless, familiar, classic",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-shaker-01",
        tags: ["CE", "CTG"],
      },
      {
        id: "inset_cabinetry",
        label: "Inset Cabinetry",
        description: "Premium, precise, elevated craftsmanship",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-inset-01",
        tags: ["CE"],
      },
      {
        id: "reeded_fluted",
        label: "Reeded or Fluted Detail",
        description: "Custom, textured, design-forward",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-reeded-01",
        tags: ["OS", "WN"],
      },
      {
        id: "arched_furniture",
        label: "Arched / Furniture-Style",
        description: "Character, warmth, custom personality",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-arched-01",
        tags: ["MT", "CTG"],
      },
      {
        id: "beadboard_cottage",
        label: "Beadboard / Cottage Detail",
        description: "Cottage charm, layered personality",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-beadboard-01",
        tags: ["CTG"],
      },
      {
        id: "metal_glass_open",
        label: "Metal / Glass / Open Shelving",
        description: "Dramatic, bold, industrial edge",
        imageFolder: "moodboards/kitchens",
        imageName: "cabinet-glass-01",
        tags: ["RI", "MCL"],
      },
    ],
  },

  // ── Q4: Cabinet Color (single, weight: 1) ───────────────────────────────────
  {
    id: "q4_cabinet_color",
    prompt: "Which cabinet color direction do you prefer?",
    type: "single",
    options: [
      {
        id: "white_off_white",
        label: "White / Off-White",
        description: "Clean, crisp, bright and timeless",
        imageFolder: "moodboards/kitchens",
        imageName: "color-white-01",
        tags: ["MCL", "CL", "CTG"],
      },
      {
        id: "warm_greige",
        label: "Warm Greige / Cream",
        description: "Warm, versatile, transitional",
        imageFolder: "moodboards/kitchens",
        imageName: "color-greige-01",
        tags: ["WN", "CE"],
      },
      {
        id: "navy_deep_blue",
        label: "Navy / Deep Blue",
        description: "Bold, classic, nautical depth",
        imageFolder: "moodboards/kitchens",
        imageName: "color-navy-01",
        tags: ["CL", "CE"],
      },
      {
        id: "sage_soft_green",
        label: "Sage / Soft Green",
        description: "Organic, fresh, garden-inspired",
        imageFolder: "moodboards/kitchens",
        imageName: "color-green-01",
        tags: ["OS", "CTG"],
      },
      {
        id: "black_charcoal",
        label: "Black / Charcoal",
        description: "Dramatic, sophisticated, bold statement",
        imageFolder: "moodboards/kitchens",
        imageName: "color-black-01",
        tags: ["MCL", "RI"],
      },
      {
        id: "natural_wood_tone",
        label: "Natural Wood Tone",
        description: "Warm, organic, biophilic warmth",
        imageFolder: "moodboards/kitchens",
        imageName: "color-wood-01",
        tags: ["WN", "MT"],
      },
    ],
  },

  // ── Q5: Countertop & Backsplash (multi, max 2, weight: 2) ───────────────────
  {
    id: "q5_countertop_backsplash",
    prompt: "Which countertop and surface direction feels right for your new kitchen?",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "clean_white_quartz",
        label: "Clean White Quartz",
        description: "Crisp, clean, versatile and bright",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-white-quartz-01",
        tags: ["MCL", "CL"],
      },
      {
        id: "warm_marble_quartz",
        label: "Warm Marble-Look Quartz",
        description: "Timeless, elegant, warm veining",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-marble-01",
        tags: ["CE", "WN"],
      },
      {
        id: "dramatic_veined_slab",
        label: "Dramatic Veined Slab",
        description: "Statement, luxury, custom centerpiece",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-veined-slab-01",
        tags: ["CE", "MCL"],
      },
      {
        id: "honed_stone",
        label: "Honed Stone Look",
        description: "Organic, spa-inspired, calm luxury",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-honed-stone-01",
        tags: ["OS", "MT"],
      },
      {
        id: "concrete_surface",
        label: "Concrete-Look Surface",
        description: "Industrial-modern, durable, bold",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-concrete-01",
        tags: ["RI", "MCL"],
      },
      {
        id: "butcher_block",
        label: "Butcher Block / Wood Accent",
        description: "Warm, casual, character accent",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-butcher-block-01",
        tags: ["CTG", "WN"],
      },
      {
        id: "dark_countertop",
        label: "Dark Countertops",
        description: "Dramatic, bold, sophisticated depth",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-dark-01",
        tags: ["RI", "CE"],
      },
      {
        id: "quartzite_luxury",
        label: "Quartzite / Natural Stone Luxury",
        description: "Premium, elevated, genuine luxury",
        imageFolder: "moodboards/kitchens",
        imageName: "surface-quartzite-01",
        tags: ["CE", "OS"],
      },
    ],
  },

  // ── Q6: Primary Bathroom (single, weight: 3) ────────────────────────────────
  {
    id: "q6_primary_bathroom",
    prompt: "Which primary bathroom would you most want to wake up to every day?",
    type: "single",
    options: [
      {
        id: "clean_modern_spa",
        label: "Clean Modern Spa",
        description: "Crisp, spa-like, elevated calm",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-modern-01",
        tags: ["MCL", "OS"],
      },
      {
        id: "warm_organic_spa",
        label: "Warm Organic Spa",
        description: "Natural materials, soft warmth, wellness",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-organic-01",
        tags: ["OS", "WN"],
      },
      {
        id: "classic_marble",
        label: "Classic Marble Bath",
        description: "Timeless luxury, polished, enduring",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-classic-01",
        tags: ["CE"],
      },
      {
        id: "coastal_light_bath",
        label: "Coastal Light Bath",
        description: "Airy, relaxed, bright and casual",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-coastal-01",
        tags: ["CL"],
      },
      {
        id: "mediterranean_bath",
        label: "Mediterranean Textured Bath",
        description: "Textured, romantic, handcrafted detail",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-mediterranean-01",
        tags: ["MT"],
      },
      {
        id: "cottage_bath",
        label: "Cottage Character Bath",
        description: "Cozy, charming, warm personality",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-cottage-01",
        tags: ["CTG"],
      },
      {
        id: "dramatic_dark_spa",
        label: "Dramatic Dark Spa",
        description: "Moody, sophisticated, statement retreat",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-dark-01",
        tags: ["RI", "MCL"],
      },
      {
        id: "resort_wet_room",
        label: "Resort-Style Wet Room",
        description: "Premium, open, full spa experience",
        imageFolder: "moodboards/primary-bathrooms",
        imageName: "bath-resort-01",
        tags: ["OS", "CL"],
      },
    ],
  },

  // ── Q7: Windows & Doors (multi, max 2, weight: 1) ───────────────────────────
  {
    id: "q7_windows_doors",
    prompt: "Which window and door style speaks most to you?",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "black_frame",
        label: "Black Frame / Steel Look",
        description: "Modern, dramatic, industrial edge",
        imageFolder: "styles/warm-modern/exterior",
        imageName: "window-01",
        tags: ["MCL", "RI"],
      },
      {
        id: "divided_lite_transitional",
        label: "Divided Lite / Transitional",
        description: "Classic, warm, familiar character",
        imageFolder: "styles/transitional/exterior",
        imageName: "window-01",
        tags: ["CE", "WN"],
      },
      {
        id: "arched_mediterranean",
        label: "Arched / Steel Accents",
        description: "Mediterranean warmth, handcrafted detail",
        imageFolder: "styles/mediterranean/exterior",
        imageName: "window-01",
        tags: ["MT"],
      },
      {
        id: "floor_ceiling_glass",
        label: "Floor-to-Ceiling Glass",
        description: "Modern, open, connected to outdoors",
        imageFolder: "styles/coastal-contemporary/exterior",
        imageName: "window-01",
        tags: ["MCL", "CL"],
      },
      {
        id: "sliding_pocket",
        label: "Sliding / Pocket Doors",
        description: "Indoor-outdoor flow, casual luxury",
        imageFolder: "styles/modern-prairie/exterior",
        imageName: "window-01",
        tags: ["CL", "OS"],
      },
      {
        id: "cottage_divided",
        label: "Cottage / Craftsman Divided",
        description: "Character, charm, welcoming detail",
        imageFolder: "styles/modern-cottage/exterior",
        imageName: "window-01",
        tags: ["CTG"],
      },
    ],
  },

  // ── Q8: Ceiling & Volume (single, weight: 1) ────────────────────────────────
  {
    id: "q8_ceiling_volume",
    prompt: "Which ceiling height and room volume feels right for your lifestyle?",
    type: "single",
    options: [
      {
        id: "soaring_cathedral",
        label: "Soaring Cathedral Ceilings",
        description: "Dramatic volume, grand and impressive",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "modern-clean-01",
        tags: ["MCL", "RI"],
      },
      {
        id: "coffered_elegant",
        label: "Coffered / Detailed Ceilings",
        description: "Classic, elegant, architectural detail",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "classic-elevated-01",
        tags: ["CE"],
      },
      {
        id: "clean_volume",
        label: "Clean Volume, Generous Height",
        description: "Open, modern, bright and airy",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "modern-clean-02",
        tags: ["MCL", "CL"],
      },
      {
        id: "warm_relaxed",
        label: "Warm & Relaxed Height",
        description: "Comfortable scale, cozy and livable",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "warm-natural-01",
        tags: ["WN", "CTG"],
      },
      {
        id: "intimate_defined",
        label: "Intimate, Defined Rooms",
        description: "Human scale, cozy, personal character",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "cottage-character-01",
        tags: ["CTG", "OS"],
      },
      {
        id: "dramatic_vault",
        label: "Dramatic Vault or Shed",
        description: "Dramatic roofline, exposed structure, bold",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "rustic-industrial-01",
        tags: ["RI", "WN"],
      },
    ],
  },

  // ── Q9: Lighting & Hardware (multi, max 2, weight: 1) ───────────────────────
  {
    id: "q9_lighting_hardware",
    prompt: "Which hardware and lighting finish direction speaks most to you?",
    type: "multi",
    maxSelections: 2,
    options: [
      {
        id: "matte_black",
        label: "Matte Black",
        description: "Modern, dramatic, clean edge",
        imageFolder: "moodboards/details-finishes",
        imageName: "finish-matte-black-01",
        tags: ["MCL", "RI"],
      },
      {
        id: "brushed_gold_brass",
        label: "Brushed Gold / Satin Brass",
        description: "Warm, elevated, modern luxury",
        imageFolder: "moodboards/details-finishes",
        imageName: "finish-brushed-gold-01",
        tags: ["CE", "WN"],
      },
      {
        id: "polished_chrome",
        label: "Polished Chrome / Nickel",
        description: "Clean, contemporary, versatile",
        imageFolder: "moodboards/details-finishes",
        imageName: "finish-chrome-01",
        tags: ["MCL", "CL"],
      },
      {
        id: "oil_rubbed_bronze",
        label: "Oil-Rubbed Bronze",
        description: "Warm, traditional, enduring character",
        imageFolder: "moodboards/details-finishes",
        imageName: "finish-bronze-01",
        tags: ["CE", "CTG"],
      },
      {
        id: "aged_brass",
        label: "Aged / Unlacquered Brass",
        description: "Character, warmth, patina beauty",
        imageFolder: "moodboards/details-finishes",
        imageName: "finish-aged-brass-01",
        tags: ["MT", "WN"],
      },
      {
        id: "brushed_nickel",
        label: "Brushed Nickel / Gunmetal",
        description: "Subtle, transitional, understated",
        imageFolder: "moodboards/details-finishes",
        imageName: "finish-nickel-01",
        tags: ["WN", "OS"],
      },
    ],
  },

  // ── Q10: Detail Level (single, weight: 3, COST DRIVER) ──────────────────────
  // Option IDs here are the finishKey used by calculatePriceRange() — do not rename.
  {
    id: "q10_detail_level",
    prompt: "Which interior detail level best matches the home you're envisioning?",
    type: "single",
    options: [
      {
        id: "minimal_clean",
        label: "Minimal & Clean",
        description: "Simple, well-built, clean quality throughout — beautiful without being busy",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "modern-clean-01",
        tags: ["MCL"],
      },
      {
        id: "clean_wood_accents",
        label: "Clean with Warm Accents",
        description: "Clean lines with warm wood accents and thoughtful material moments",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "warm-natural-01",
        tags: ["WN", "MCL"],
      },
      {
        id: "board_batten_shiplap",
        label: "Board & Batten / Shiplap Character",
        description: "Warm character details, board and batten walls, shiplap moments throughout",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "cottage-character-01",
        tags: ["CTG", "WN"],
      },
      {
        id: "refined_traditional",
        label: "Refined Traditional Millwork",
        description: "Wainscoting, cased openings, crown moulding — traditional detail done precisely",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "classic-elevated-01",
        tags: ["CE"],
      },
      {
        id: "full_wall_paneling",
        label: "Full Wall Paneling",
        description: "Full wall paneling, built-in library walls, extensive architectural woodwork",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "classic-elevated-02",
        tags: ["CE"],
      },
      {
        id: "custom_statement_millwork",
        label: "Custom Statement Millwork",
        description: "One-of-a-kind custom millwork, feature walls, ceiling treatments, and architectural moments throughout every room",
        imageFolder: "moodboards/primary-bedrooms",
        imageName: "modern-clean-02",
        tags: ["CE", "MCL"],
      },
    ],
  },
];
