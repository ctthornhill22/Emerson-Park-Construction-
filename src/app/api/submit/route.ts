/**
 * POST /api/submit
 *
 * Stage 3 final submission.
 * Calculates cost estimate, fires GoHighLevel webhook, sends concept email.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase";
import { buildFullResult, scoreStage1, scoreStage2 } from "@/lib/quiz-scoring";
import type { Stage3Data } from "@/lib/quiz-scoring";
import { calculatePriceRange } from "@/lib/stage3-form-data";
import { getBlendDescription } from "@/lib/style-matrix";
import type { PricingResult } from "@/lib/stage3-form-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      sessionId: string;
      s3Data: Stage3Data;
    };

    const { sessionId, s3Data } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID." }, { status: 400 });
    }

    // ── Fetch session ──────────────────────────────────────────────────────
    const supabase = createServiceClient();
    const { data: session, error: fetchErr } = await supabase
      .from("quiz_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (fetchErr || !session) {
      return NextResponse.json({ error: "Session not found." }, { status: 404 });
    }

    // ── Re-score both stages for the final result ──────────────────────────
    const s1Result   = scoreStage1(session.s1_answers ?? {});
    const s2Result   = scoreStage2(session.s2_answers ?? {});
    const fullResult = buildFullResult(s1Result, s2Result);

    // ── Generate personalised blend statement ─────────────────────────────
    const blendResult = getBlendDescription(
      fullResult.primaryArch.code,
      fullResult.secondaryArch.code,
      fullResult.primaryFinish.code,
      fullResult.secondaryFinish.code,
    );

    // ── Cost estimate — use Q10 answer as the finish multiplier key ─────────
    const s2Answers = session.s2_answers ?? {};
    const q10Answer = s2Answers["q10_detail_level"] as string | undefined;
    const finishKey  = (typeof q10Answer === "string" ? q10Answer : null)
                     ?? fullResult.primaryFinish.code.toLowerCase()
                     ?? "clean_wood_accents";

    const pricing = calculatePriceRange(s3Data, finishKey);

    // ── Update Supabase ────────────────────────────────────────────────────
    await supabase
      .from("quiz_sessions")
      .update({
        last_name:             s3Data.lastName,
        phone:                 s3Data.phone,
        square_footage:        s3Data.squareFootage,
        bedrooms:              s3Data.bedrooms,
        bathrooms:             s3Data.bathrooms,
        pool:                  s3Data.pool,
        garage_size:           s3Data.garageSize,
        special_spaces:        s3Data.specialSpaces,
        timeline:              s3Data.timeline,
        cost_estimate_low:     Math.round(pricing.lowEstimate),
        cost_estimate_high:    Math.round(pricing.highEstimate),
        cost_finish_level:     finishKey,
        stage_3_completed_at:  new Date().toISOString(),
        stage:                 "complete",
      })
      .eq("id", sessionId);

    // ── Fire GoHighLevel webhook ───────────────────────────────────────────
    const ghlUrl = process.env.GHL_WEBHOOK_URL;
    if (ghlUrl) {
      try {
        const ghlBody = {
          firstName:    session.first_name,
          lastName:     s3Data.lastName,
          email:        session.email,
          phone:        s3Data.phone,
          source:       "quiz",
          tags: [
            "quiz-completed",
            `style-${fullResult.primaryArch.code}`,
            `finish-${fullResult.primaryFinish.code}`,
            `tier-${finishKey}`,
            s3Data.pool ? "pool-yes" : "pool-no",
            `timeline-${s3Data.timeline}`,
          ],
          customFields: {
            primaryArchStyle:       fullResult.primaryArch.name,
            secondaryArchStyle:     fullResult.secondaryArch.name,
            primaryFinishStyle:     fullResult.primaryFinish.name,
            styleBlend:             fullResult.styleBlend,
            blendStatement:         blendResult.fullStatement,
            squareFootage:          s3Data.squareFootage,
            bedrooms:               s3Data.bedrooms,
            bathrooms:              s3Data.bathrooms,
            pool:                   s3Data.pool ? "Yes" : "No",
            garageSize:             s3Data.garageSize,
            specialSpaces:          s3Data.specialSpaces.join(", "),
            timeline:               s3Data.timeline,
            finishTier:             finishKey,
            costEstimateLow:        pricing.formattedLow,
            costEstimateHigh:       pricing.formattedHigh,
            costEstimateRange:      `${pricing.formattedLow} – ${pricing.formattedHigh}`,
            renderingUrl:           session.rendering_url ?? "",
            moodboardImages:        (session.moodboard_images ?? []).join(", "),
            sessionId,
          },
        };

        const ghlRes = await fetch(ghlUrl, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(ghlBody),
        });

        if (ghlRes.ok) {
          await supabase
            .from("quiz_sessions")
            .update({ ghl_webhook_fired_at: new Date().toISOString() })
            .eq("id", sessionId);
        }
      } catch (ghlErr) {
        console.error("GHL webhook error:", ghlErr);
        // Non-fatal
      }
    }

    // ── Send concept email ─────────────────────────────────────────────────
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "designs@buildemersonpark.com";
    const fromName  = process.env.RESEND_FROM_NAME  ?? "Emerson Park Design & Construction";

    if (process.env.RESEND_API_KEY && session.email) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:    `${fromName} <${fromEmail}>`,
        to:      session.email,
        subject: `${session.first_name ?? "Your"} Emerson Park concept is ready`,
        html: conceptEmailHtml({
          firstName:       session.first_name ?? "There",
          lastName:        s3Data.lastName,
          primaryArch:     fullResult.primaryArch.name,
          secondaryArch:   fullResult.secondaryArch.name,
          primaryFinish:   fullResult.primaryFinish.name,
          secondaryFinish: fullResult.secondaryFinish.name,
          styleBlend:      fullResult.styleBlend,
          blendStatement:  blendResult.fullStatement,
          pricing,
          renderingUrl:    session.rendering_url ?? null,
          moodboardImages: session.moodboard_images ?? [],
        }),
      });

      await supabase
        .from("quiz_sessions")
        .update({ concept_email_sent_at: new Date().toISOString() })
        .eq("id", sessionId);
    }

    return NextResponse.json({
      status:       "complete",
      primaryArch:  fullResult.primaryArch.name,
      primaryFinish:fullResult.primaryFinish.name,
      styleBlend:   fullResult.styleBlend,
      costRange:    `${pricing.formattedLow} – ${pricing.formattedHigh}`,
    });
  } catch (err) {
    console.error("POST /api/submit error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ─── Concept email template ───────────────────────────────────────────────────

function conceptEmailHtml(d: {
  firstName: string;
  lastName: string;
  primaryArch: string;
  secondaryArch: string;
  primaryFinish: string;
  secondaryFinish: string;
  styleBlend: string;
  blendStatement: string;
  pricing: PricingResult;
  renderingUrl: string | null;
  moodboardImages: string[];
}) {
  const renderingSection = d.renderingUrl
    ? `<div style="margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9B6B38;">Exterior Rendering</p>
        <img src="${d.renderingUrl}" alt="Exterior concept rendering" width="520"
          style="width:100%;max-width:520px;border-radius:10px;display:block;" />
       </div>`
    : "";

  const moodboardSection =
    d.moodboardImages.length > 0
      ? `<div style="margin-bottom:24px;">
          <p style="margin:0 0 12px;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9B6B38;">Interior Mood Board</p>
          <table width="100%" cellpadding="4" cellspacing="0"><tr>
            ${d.moodboardImages
              .slice(0, 4)
              .map(
                (url) =>
                  `<td width="25%"><img src="${url}" alt="Interior inspiration" style="width:100%;border-radius:6px;display:block;" /></td>`
              )
              .join("")}
          </tr></table>
         </div>`
      : "";

  const lineItemRows = d.pricing.lineItems
    .map(
      (item) =>
        `<tr>
          <td style="padding:6px 0;font-size:13px;color:#78716C;">${item.label}</td>
          <td style="padding:6px 0;font-size:13px;color:#78716C;text-align:right;">
            ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.lowCost)}
            –
            ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.highCost)}
          </td>
        </tr>`
    )
    .join("");

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Your Emerson Park Concept</title>
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
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9B6B38;">Your Concept Is Ready</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#1C1A15;line-height:1.2;">
                ${d.firstName}, your Emerson Park concept is here.
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#78716C;">
                Based on your design selections, here&apos;s the direction your home is pointing. Our team will be in touch within one business day.
              </p>

              <!-- Style summary -->
              <div style="background:#F5EFE4;border-radius:10px;padding:24px;margin-bottom:24px;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9B6B38;">Your Design Direction</p>
                <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1C1A15;">${d.primaryArch}</p>
                <p style="margin:0 0 16px;font-size:14px;color:#78716C;">with ${d.secondaryArch} influences · ${d.primaryFinish} interiors</p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:#78716C;font-style:italic;">${d.blendStatement}</p>
              </div>

              <!-- Rendering -->
              ${renderingSection}

              <!-- Mood board -->
              ${moodboardSection}

              <!-- Cost estimate -->
              <div style="background:#9B6B38;border-radius:10px;padding:24px;margin-bottom:16px;text-align:center;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);">Estimated Investment Range</p>
                <p style="margin:0 0 4px;font-size:32px;font-weight:700;color:#fff;">${d.pricing.formattedLow} – ${d.pricing.formattedHigh}</p>
              </div>

              <!-- Line items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;border-collapse:collapse;">
                ${lineItemRows}
              </table>

              <p style="margin:0 0 24px;font-size:11px;color:#78716C;line-height:1.6;font-style:italic;">
                ${d.pricing.disclaimer}
              </p>

              <!-- CTA -->
              <div style="text-align:center;margin:32px 0;">
                <a href="mailto:info@buildemersonpark.com"
                  style="display:inline-block;background:#1C1A15;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
                  Schedule Your Discovery Meeting
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1C1A15;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#F5EFE4;opacity:.5;">
                Emerson Park Design &amp; Construction · Ocala, FL · Licensed · Insured · Bonded
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
