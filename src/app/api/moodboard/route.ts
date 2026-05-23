/**
 * POST /api/moodboard
 *
 * Called at Stage 2 gate.
 * Builds mood board image URLs directly from the user's quiz answers (no API
 * listing calls needed — paths are embedded in the question data), saves them
 * to Supabase, and sends the mood board email.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase";
import { scoreStage2 } from "@/lib/quiz-scoring";
import { buildWeightedMoodboardPaths, getBlendDescription } from "@/lib/style-matrix";
import type { QuizAnswers } from "@/lib/quiz-scoring";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      sessionId: string;
      s2Answers: QuizAnswers;
    };

    const { sessionId, s2Answers } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID." }, { status: 400 });
    }

    // ── Score Stage 2 ──────────────────────────────────────────────────────
    const { primaryFinish, secondaryFinish, finishScores } = scoreStage2(s2Answers);

    // ── Build weighted mood board image URLs ──────────────────────────────
    // Uses 60/30/10 weighting (primary / secondary / outdoor anchor).
    // No Cloudinary API listing calls needed — paths are derived from style codes.
    let moodboardImages: string[] = [];

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (cloudName) {
      moodboardImages = buildWeightedMoodboardPaths(
        primaryFinish.code,
        secondaryFinish.code,
        cloudName,
        8,
      );
    }

    // ── Generate personalized blend statement ─────────────────────────────
    // We don't have arch codes at this stage, so pass empty strings — the
    // function falls back gracefully to finish descriptions only.
    const blendResult = getBlendDescription("", "", primaryFinish.code, secondaryFinish.code);
    const blendStatement = blendResult.interiorBlend;

    // ── Update Supabase ────────────────────────────────────────────────────
    const supabase = createServiceClient();
    const { data: session } = await supabase
      .from("quiz_sessions")
      .update({
        s2_answers: s2Answers,
        primary_finish_style: primaryFinish.code,
        secondary_finish_style: secondaryFinish.code,
        finish_scores: finishScores,
        moodboard_images: moodboardImages,
        stage_2_completed_at: new Date().toISOString(),
        stage: "stage_2",
      })
      .eq("id", sessionId)
      .select("first_name, email, rendering_url")
      .single();

    if (!session?.email) {
      return NextResponse.json({
        moodboardImages,
        primaryFinish: primaryFinish.code,
        status: "ok",
      });
    }

    // ── Send mood board email ──────────────────────────────────────────────
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "designs@buildemersonpark.com";
    const fromName  = process.env.RESEND_FROM_NAME  ?? "Emerson Park Design & Construction";

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: session.email,
        subject: `${session.first_name ?? "Your"} Interior Mood Board is Ready`,
        html: moodboardEmailHtml({
          firstName: session.first_name ?? "There",
          primaryFinishName: primaryFinish.name,
          secondaryFinishName: secondaryFinish.name,
          blendStatement,
          moodboardImages,
        }),
      });

      await supabase
        .from("quiz_sessions")
        .update({ moodboard_email_sent_at: new Date().toISOString() })
        .eq("id", sessionId);
    }

    return NextResponse.json({
      moodboardImages,
      primaryFinish: primaryFinish.code,
      status: "ok",
    });
  } catch (err) {
    console.error("POST /api/moodboard error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ─── Email template ───────────────────────────────────────────────────────────

function moodboardEmailHtml({
  firstName,
  primaryFinishName,
  secondaryFinishName,
  blendStatement,
  moodboardImages,
}: {
  firstName: string;
  primaryFinishName: string;
  secondaryFinishName: string;
  blendStatement: string;
  moodboardImages: string[];
}) {
  const imageGrid = moodboardImages.length > 0
    ? moodboardImages
        .map(
          (url, i) =>
            `<img src="${url}" alt="Interior inspiration ${i + 1}" width="${i === 0 ? 520 : 250}"
              style="width:100%;max-width:${i === 0 ? "520px" : "250px"};border-radius:8px;display:block;margin:0 0 12px;" />`
        )
        .join("")
    : `<p style="color:#78716C;font-size:14px;text-align:center;padding:24px;">Your curated mood board images will appear here once your Cloudinary library is populated.</p>`;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Your Interior Mood Board</title>
</head>
<body style="margin:0;padding:0;background:#F5EFE4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#3D3226;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1C1A15;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <div style="display:inline-block;background:#9B6B38;border-radius:6px;padding:8px 14px;font-weight:700;color:#fff;font-size:16px;letter-spacing:1px;">EP</div>
              <p style="margin:12px 0 0;color:#F5EFE4;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Emerson Park Design &amp; Construction</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#fff;padding:40px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9B6B38;">Your Interior Mood Board</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#1C1A15;line-height:1.2;">
                ${firstName}, your mood board is ready.
              </h1>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#78716C;">
                <strong style="color:#3D3226;">Primary direction:</strong> ${primaryFinishName}
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#78716C;">
                <strong style="color:#3D3226;">Supporting influence:</strong> ${secondaryFinishName}
              </p>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#78716C;font-style:italic;">
                ${blendStatement}
              </p>

              <!-- Mood board images -->
              ${imageGrid}

              <p style="margin:24px 0;font-size:15px;line-height:1.6;color:#78716C;">
                Complete Stage 3 to tell us about your project scope and receive your personalized cost estimate range.
              </p>

              <div style="text-align:center;margin:0 0 32px;">
                <a href="https://buildemersonpark.com/quiz/discover"
                  style="display:inline-block;background:#9B6B38;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
                  Complete My Project Profile →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1C1A15;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#F5EFE4;opacity:.5;">
                Emerson Park Design &amp; Construction · Ocala, FL
              </p>
              <p style="margin:0;font-size:12px;color:#F5EFE4;opacity:.4;">
                <a href="mailto:info@buildemersonpark.com" style="color:#9B6B38;text-decoration:none;">info@buildemersonpark.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
