/**
 * Emerson Park Design & Construction
 * Stage 3 — Project Details, Contact Capture & Pricing Generator
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Stage3FormData {
  squareFootage: string;
  bedrooms: string;
  bathrooms: string;
  pool: boolean;
  garageSize: string;
  specialSpaces: string[];
  timeline: string;
  lastName: string;
  phone: string;
}

export interface PricingResult {
  lowEstimate: number;
  highEstimate: number;
  formattedLow: string;
  formattedHigh: string;
  disclaimer: string;
  lineItems: PricingLineItem[];
}

export interface PricingLineItem {
  label: string;
  lowCost: number;
  highCost: number;
}

export interface ConceptEmailPayload {
  leadData: Stage3FormData;
  stage1Score: {
    primaryStyle: string;
    secondaryStyle: string;
    tagScores: Record<string, number>;
  };
  stage2Score: {
    primaryFinish: string;
    secondaryFinish: string;
    finishMultiplierKey: string;
    tagScores: Record<string, number>;
  };
  exteriorRenderUrl: string;
  moodBoardPaths: string[];
  pricingResult: PricingResult;
  renderPrompt: string;
}

export interface GoHighLevelContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags: string[];
  customFields: Record<string, string>;
}

// ─── Form field options ───────────────────────────────────────────────────────

export const squareFootageOptions = [
  { value: "2000",  label: "2,000 sq ft" },
  { value: "2500",  label: "2,500 sq ft" },
  { value: "3000",  label: "3,000 sq ft" },
  { value: "3500",  label: "3,500 sq ft" },
  { value: "4000",  label: "4,000 sq ft" },
  { value: "4500",  label: "4,500 sq ft" },
  { value: "5000",  label: "5,000 sq ft" },
  { value: "5500",  label: "5,500 sq ft" },
  { value: "6000",  label: "6,000 sq ft" },
  { value: "6500",  label: "6,500 sq ft" },
  { value: "7000",  label: "7,000 sq ft" },
  { value: "7500",  label: "7,500 sq ft" },
  { value: "8000",  label: "8,000 sq ft" },
  { value: "8500",  label: "8,500 sq ft" },
  { value: "9000",  label: "9,000 sq ft" },
  { value: "9500",  label: "9,500 sq ft" },
  { value: "10000", label: "10,000 sq ft" },
  { value: "12500", label: "10,000 – 15,000 sq ft" },
  { value: "17500", label: "15,000 – 20,000 sq ft" },
];

export const bedroomOptions = [
  { value: "1",   label: "1 Bedroom" },
  { value: "2",   label: "2 Bedrooms" },
  { value: "3",   label: "3 Bedrooms" },
  { value: "4",   label: "4 Bedrooms" },
  { value: "5",   label: "5 Bedrooms" },
  { value: "6",   label: "6 Bedrooms" },
  { value: "7",   label: "7 Bedrooms" },
  { value: "8",   label: "8 Bedrooms" },
  { value: "9",   label: "9 Bedrooms" },
  { value: "10",  label: "10 Bedrooms" },
  { value: "10+", label: "10+ Bedrooms" },
];

export const bathroomOptions = [
  { value: "1",   label: "1 Bathroom" },
  { value: "1.5", label: "1.5 Bathrooms" },
  { value: "2",   label: "2 Bathrooms" },
  { value: "2.5", label: "2.5 Bathrooms" },
  { value: "3",   label: "3 Bathrooms" },
  { value: "3.5", label: "3.5 Bathrooms" },
  { value: "4",   label: "4 Bathrooms" },
  { value: "4.5", label: "4.5 Bathrooms" },
  { value: "5",   label: "5 Bathrooms" },
  { value: "5.5", label: "5.5 Bathrooms" },
  { value: "6",   label: "6 Bathrooms" },
  { value: "6.5", label: "6.5 Bathrooms" },
  { value: "7",   label: "7 Bathrooms" },
  { value: "7.5", label: "7.5 Bathrooms" },
  { value: "8",   label: "8 Bathrooms" },
  { value: "8+",  label: "8+ Bathrooms" },
];

export const garageSizeOptions = [
  { value: "2car",      label: "2 Car Garage" },
  { value: "3car",      label: "3 Car Garage" },
  { value: "4car",      label: "4 Car Garage" },
  { value: "5car",      label: "5 Car Garage or Larger" },
  { value: "rv",        label: "RV Bay Garage" },
  { value: "detached",  label: "Detached Garage" },
  { value: "workshop",  label: "Workshop Garage" },
];

export const specialSpacesOptions = [
  { value: "home_office",     label: "Home Office" },
  { value: "wine_bar",        label: "Wine Cellar or Bar" },
  { value: "home_theater",    label: "Home Theater" },
  { value: "guest_suite",     label: "Guest Suite" },
  { value: "gym",             label: "Home Gym" },
  { value: "pantry_scullery", label: "Walk-In Pantry or Scullery" },
  { value: "safe_room",       label: "Safe Room" },
  { value: "barn",            label: "Barn" },
];

export const timelineOptions = [
  { value: "within_6_months", label: "Within 6 Months" },
  { value: "6_to_12_months",  label: "6 to 12 Months" },
  { value: "1_to_2_years",    label: "1 to 2 Years" },
  { value: "just_exploring",  label: "Just Exploring for Now" },
];

// ─── UI copy ──────────────────────────────────────────────────────────────────

export const stage3Copy = {
  screenHeadline:    "Your concept is almost ready.",
  screenSubheadline: "Tell us a little about your project and where to send it.",
  group1Label:       "About Your Project",
  group2Label:       "About You",
  poolToggleLabel:   "Are you planning a pool?",
  poolToggleYes:     "Yes",
  poolToggleNo:      "Not at this time",
  submitButtonLabel: "Generate My Concept",
  belowButtonText:
    "Your personalized exterior render, interior mood board, and estimated build cost will be in your inbox within minutes.",
  privacyText:           "Your information is never shared or sold. Ever.",
  generatingMessage:
    "Your concept is being finalized. Watch for your email in the next 5 minutes.",
  formValidationMessage: "Please complete all fields before generating your concept.",
};

// ─── Pricing generator ────────────────────────────────────────────────────────
//
// PLACEHOLDER VALUES — update all dollar figures from your cost spreadsheet
// before going live. The calculation structure is correct; only numbers need
// updating once your Central Florida cost data is confirmed.

/** Cost per sq ft by Q10 detail-level answer ID */
export const baseCostPerSqFt: Record<string, { low: number; high: number }> = {
  minimal_clean:             { low: 250, high: 325 },
  clean_wood_accents:        { low: 275, high: 350 },
  refined_traditional:       { low: 300, high: 400 },
  board_batten_shiplap:      { low: 275, high: 360 },
  full_wall_paneling:        { low: 350, high: 450 },
  custom_statement_millwork: { low: 400, high: 550 },
};

/** Feature add-on ranges above the base sq-ft cost */
export const featureAddOns: Record<string, { low: number; high: number; label: string }> = {
  // Pool
  pool:              { low: 80_000,  high: 150_000, label: "Pool" },
  // Garage upgrades (above 2-car baseline)
  garage_3car:       { low: 25_000,  high: 40_000,  label: "3 Car Garage Upgrade" },
  garage_4car:       { low: 45_000,  high: 70_000,  label: "4 Car Garage Upgrade" },
  garage_5car:       { low: 65_000,  high: 100_000, label: "5+ Car Garage Upgrade" },
  garage_rv:         { low: 50_000,  high: 85_000,  label: "RV Bay Upgrade" },
  garage_detached:   { low: 60_000,  high: 120_000, label: "Detached Garage" },
  garage_workshop:   { low: 40_000,  high: 80_000,  label: "Workshop Garage" },
  // Special spaces
  home_office:       { low: 15_000,  high: 35_000,  label: "Home Office" },
  wine_bar:          { low: 25_000,  high: 75_000,  label: "Wine Cellar or Bar" },
  home_theater:      { low: 40_000,  high: 120_000, label: "Home Theater" },
  guest_suite:       { low: 30_000,  high: 80_000,  label: "Guest Suite" },
  gym:               { low: 20_000,  high: 60_000,  label: "Home Gym" },
  pantry_scullery:   { low: 15_000,  high: 45_000,  label: "Walk-In Pantry or Scullery" },
  safe_room:         { low: 20_000,  high: 50_000,  label: "Safe Room" },
  barn:              { low: 80_000,  high: 250_000, label: "Barn" },
};

/** Regulatory disclaimer — have a Florida construction attorney review before going live */
export const pricingDisclaimer =
  "This estimate is based on your design selections and current Central Florida construction cost benchmarks. " +
  "It represents a planning range only and is not a contract, bid, or guarantee of final cost. " +
  "Actual project cost is determined after a full design consultation, site evaluation, and detailed scope review. " +
  "Emerson Park Design and Construction will provide formal pricing after the discovery process is complete.";

/** Main pricing calculation.
 *  @param formData      Stage 3 form submission
 *  @param finishKey     Q10 answer ID (e.g. "minimal_clean", "custom_statement_millwork")
 */
export function calculatePriceRange(
  formData: Stage3FormData,
  finishKey: string
): PricingResult {
  const sqft  = parseFloat(formData.squareFootage) || 3_000;
  const rates = baseCostPerSqFt[finishKey] ?? baseCostPerSqFt.clean_wood_accents;

  let totalLow  = sqft * rates.low;
  let totalHigh = sqft * rates.high;

  const lineItems: PricingLineItem[] = [
    {
      label:    `Base Build (${Number(sqft).toLocaleString()} sq ft)`,
      lowCost:  totalLow,
      highCost: totalHigh,
    },
  ];

  // Pool
  if (formData.pool) {
    const c = featureAddOns.pool;
    totalLow  += c.low;
    totalHigh += c.high;
    lineItems.push({ label: c.label, lowCost: c.low, highCost: c.high });
  }

  // Garage upgrade (anything beyond 2-car baseline has an add-on)
  const garageKey = `garage_${formData.garageSize}`;
  if (featureAddOns[garageKey]) {
    const c = featureAddOns[garageKey];
    totalLow  += c.low;
    totalHigh += c.high;
    lineItems.push({ label: c.label, lowCost: c.low, highCost: c.high });
  }

  // Special spaces
  formData.specialSpaces.forEach((space) => {
    const c = featureAddOns[space];
    if (c) {
      totalLow  += c.low;
      totalHigh += c.high;
      lineItems.push({ label: c.label, lowCost: c.low, highCost: c.high });
    }
  });

  // 10% contingency buffer on the high end
  totalHigh = totalHigh * 1.10;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style:                 "currency",
      currency:              "USD",
      maximumFractionDigits: 0,
    }).format(Math.round(n / 10_000) * 10_000);

  return {
    lowEstimate:   totalLow,
    highEstimate:  totalHigh,
    formattedLow:  formatCurrency(totalLow),
    formattedHigh: formatCurrency(totalHigh),
    disclaimer:    pricingDisclaimer,
    lineItems,
  };
}

// ─── GoHighLevel contact builder ──────────────────────────────────────────────

export function buildGoHighLevelContact(
  formData:    Stage3FormData,
  firstName:   string,
  email:       string,
  stage1Score: { primaryStyle: string; secondaryStyle: string; allTags: string[] },
  stage2Score: { primaryFinish: string; secondaryFinish: string; finishMultiplierKey: string },
  pricing:     PricingResult
): GoHighLevelContact {
  const tags = [
    `style-${stage1Score.primaryStyle.toLowerCase()}`,
    `secondary-${stage1Score.secondaryStyle.toLowerCase()}`,
    `finish-${stage2Score.primaryFinish.toLowerCase()}`,
    `tier-${stage2Score.finishMultiplierKey.replace(/_/g, "-")}`,
    `sqft-${formData.squareFootage}`,
    formData.pool ? "pool-yes" : "pool-no",
    `garage-${formData.garageSize}`,
    `timeline-${formData.timeline.replace(/_/g, "-")}`,
    "source-visualizer",
    "stage-new-lead",
  ];

  formData.specialSpaces.forEach((s) =>
    tags.push(`space-${s.replace(/_/g, "-")}`)
  );

  return {
    firstName,
    lastName:     formData.lastName,
    email,
    phone:        formData.phone,
    tags,
    customFields: {
      square_footage:               formData.squareFootage,
      bedrooms:                     formData.bedrooms,
      bathrooms:                    formData.bathrooms,
      pool:                         formData.pool ? "Yes" : "No",
      garage_size:                  formData.garageSize,
      special_spaces:               formData.specialSpaces.join(", "),
      timeline:                     formData.timeline,
      primary_architectural_style:  stage1Score.primaryStyle,
      secondary_architectural_style:stage1Score.secondaryStyle,
      primary_interior_finish:      stage2Score.primaryFinish,
      secondary_interior_finish:    stage2Score.secondaryFinish,
      finish_tier:                  stage2Score.finishMultiplierKey,
      estimated_low:                pricing.formattedLow,
      estimated_high:               pricing.formattedHigh,
      price_range:                  `${pricing.formattedLow} – ${pricing.formattedHigh}`,
      lead_source:                  "Visualizer Quiz",
      quiz_completed:               new Date().toISOString(),
    },
  };
}

// ─── Concept email copy ───────────────────────────────────────────────────────

export const conceptEmailCopy = {
  subject: (firstName: string) =>
    `${firstName}, your Emerson Park concept is ready`,

  previewText:
    "Your exterior render, interior mood board, and estimated build cost are inside.",

  greeting:          (firstName: string) => `Hi ${firstName},`,
  openingParagraph:
    "Your Emerson Park home concept has been created based on your design selections. Take a look at what we put together for you.",
  renderSectionLabel:   "Your Exterior Direction",
  moodBoardSectionLabel:"Your Interior Finish Direction",
  estimateSectionLabel: "Your Estimated Build Range",

  estimateIntro: (low: string, high: string) =>
    `Based on your selections, your estimated build range is ${low} to ${high}.`,

  estimateNote:
    "This is a planning estimate based on your design choices and current Central Florida construction benchmarks. Final pricing is determined after a full project consultation.",

  ctaHeadline: "Ready to take the next step?",
  ctaBody:
    "When you're ready to talk about making this real, our team is ready to listen. Schedule a project conversation and we'll walk through your concept together.",
  ctaButtonLabel: "Schedule a Project Conversation",
  ctaButtonUrl:   "https://buildemersonpark.com/schedule",
  closingLine:    "We look forward to learning more about your project.",
  signatureName:  "Emerson Park Design and Construction",
  signatureTagline: "Another home built without compromise.",
  signatureWebsite: "BuildEmersonPark.com",
  signaturePhone: "", // Add your 352 GoHighLevel number here when provisioned
};

// ─── SMS templates ────────────────────────────────────────────────────────────

export const smsTemplates = {
  conceptReady: (firstName: string) =>
    `Hi ${firstName}, your Emerson Park concept is on its way to your inbox. Take a look and let us know what you think. ${conceptEmailCopy.ctaButtonUrl}`,
  followUp48h: (firstName: string) =>
    `Hi ${firstName}, just following up on your Emerson Park concept. Happy to answer any questions. ${conceptEmailCopy.ctaButtonUrl}`,
  followUp7d: (firstName: string) =>
    `Hi ${firstName}, your Emerson Park home concept is still saved for you. When you are ready to talk we are here. ${conceptEmailCopy.ctaButtonUrl}`,
};

// ─── Internal notification ────────────────────────────────────────────────────

export function buildInternalNotification(
  formData:    Stage3FormData,
  firstName:   string,
  stage1Score: { primaryStyle: string },
  stage2Score: { primaryFinish: string; finishMultiplierKey: string },
  pricing:     PricingResult
): string {
  return [
    "NEW EMERSON PARK LEAD",
    `Name: ${firstName} ${formData.lastName}`,
    `Phone: ${formData.phone}`,
    `Style: ${stage1Score.primaryStyle}`,
    `Finish: ${stage2Score.primaryFinish}`,
    `Size: ${formData.squareFootage} sq ft`,
    `Beds: ${formData.bedrooms} | Baths: ${formData.bathrooms}`,
    `Pool: ${formData.pool ? "Yes" : "No"}`,
    `Garage: ${formData.garageSize}`,
    `Spaces: ${formData.specialSpaces.join(", ") || "None"}`,
    `Estimate: ${pricing.formattedLow} – ${pricing.formattedHigh}`,
    `Timeline: ${formData.timeline}`,
  ].join("\n");
}
