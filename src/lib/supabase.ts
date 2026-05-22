import { createClient } from "@supabase/supabase-js";

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Both clients are created lazily (inside functions, not at module level).
// This prevents "supabaseUrl is required" errors during Next.js static build,
// when NEXT_PUBLIC_* env vars haven't been injected yet.

/** Browser / client-side Supabase client (uses publishable/anon key). */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  // Supports both the new publishable key name and the legacy anon key name
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
           ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
           ?? "";
  return createClient(url, key);
}

/**
 * Server-side Supabase client (uses service role key).
 * Import only inside API routes or Server Components — never in client code.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// ─── Row type for quiz_sessions ───────────────────────────────────────────────

export interface QuizSession {
  id: string;
  created_at: string;
  updated_at: string;

  // Stage 1 gate contact
  first_name: string | null;
  email: string | null;

  // Stage 1
  s1_answers: Record<string, string | string[]> | null;
  primary_arch_style: string | null;
  secondary_arch_style: string | null;
  arch_scores: Record<string, number> | null;
  stage_1_completed_at: string | null;

  // Rendering
  replicate_prediction_id: string | null;
  rendering_url: string | null;
  rendering_status: "pending" | "complete" | "failed" | null;

  // Stage 2
  s2_answers: Record<string, string | string[]> | null;
  primary_finish_style: string | null;
  secondary_finish_style: string | null;
  finish_scores: Record<string, number> | null;
  stage_2_completed_at: string | null;

  // Mood board
  moodboard_images: string[] | null;

  // Stage 3
  last_name: string | null;
  phone: string | null;
  square_footage: string | null;
  bedrooms: string | null;
  bathrooms: string | null;
  pool: boolean | null;
  garage_size: string | null;
  special_spaces: string[] | null;
  timeline: string | null;
  stage_3_completed_at: string | null;

  // Cost estimate
  cost_estimate_low: number | null;
  cost_estimate_high: number | null;
  /** Q10 answer ID used as the finish-level key (e.g. "custom_statement_millwork") */
  cost_finish_level: string | null;

  // CRM & email tracking
  ghl_contact_id: string | null;
  ghl_webhook_fired_at: string | null;
  rendering_email_sent_at: string | null;
  moodboard_email_sent_at: string | null;
  concept_email_sent_at: string | null;

  // Overall stage
  stage: "stage_1" | "stage_2" | "stage_3" | "complete";
}
