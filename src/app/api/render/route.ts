/**
 * POST /api/render
 *
 * Called at Stage 1 gate (email capture).
 * Creates a Supabase session, kicks off a Replicate prediction,
 * and returns the session ID so the client can track progress.
 */

import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { createServiceClient } from "@/lib/supabase";
import { scoreStage1, buildRenderingPrompt } from "@/lib/quiz-scoring";
import type { QuizAnswers } from "@/lib/quiz-scoring";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      firstName: string;
      email: string;
      s1Answers: QuizAnswers;
    };

    const { firstName, email, s1Answers } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // ── Score Stage 1 answers ──────────────────────────────────────────────
    const { primaryArch, secondaryArch, archScores } = scoreStage1(s1Answers);
    const prompt = buildRenderingPrompt([primaryArch.code, secondaryArch.code]);

    // ── Create Supabase session row ────────────────────────────────────────
    const supabase = createServiceClient();
    const { data: session, error: dbError } = await supabase
      .from("quiz_sessions")
      .insert({
        first_name: firstName,
        email,
        s1_answers: s1Answers,
        primary_arch_style: primaryArch.code,
        secondary_arch_style: secondaryArch.code,
        arch_scores: archScores,
        stage_1_completed_at: new Date().toISOString(),
        rendering_status: "pending",
        stage: "stage_1",
      })
      .select("id")
      .single();

    if (dbError || !session) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Failed to create session." }, { status: 500 });
    }

    const sessionId = session.id as string;

    // ── Kick off Replicate prediction ──────────────────────────────────────
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const webhookUrl = `${appUrl}/api/render/webhook?session=${sessionId}`;

    let predictionId: string | null = null;

    if (process.env.REPLICATE_API_TOKEN) {
      const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
      try {
        const prediction = await replicate.predictions.create({
          // Using SDXL — swap model version for a fine-tuned architectural model as needed
          version: "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
          input: {
            prompt,
            negative_prompt:
              "blurry, low quality, distorted, ugly, people, cars, text, watermark, construction site, unfinished",
            width: 1024,
            height: 576,
            num_inference_steps: 30,
            guidance_scale: 7.5,
            refine: "expert_ensemble_refiner",
            high_noise_frac: 0.8,
          },
          webhook: webhookUrl,
          webhook_events_filter: ["completed"],
        });
        predictionId = prediction.id;

        // Store prediction ID in Supabase
        await supabase
          .from("quiz_sessions")
          .update({ replicate_prediction_id: predictionId })
          .eq("id", sessionId);
      } catch (repErr) {
        console.error("Replicate prediction error:", repErr);
        // Non-fatal — session still created; rendering just won't happen automatically
      }
    }

    return NextResponse.json({
      sessionId,
      predictionId,
      primaryArch: primaryArch.code,
      status: "pending",
    });
  } catch (err) {
    console.error("POST /api/render error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
