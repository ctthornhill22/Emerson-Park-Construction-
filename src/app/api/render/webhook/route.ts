/**
 * POST /api/render/webhook?session={sessionId}
 *
 * Replicate calls this endpoint when the rendering prediction completes.
 * We save the image URL to Supabase and send the exterior rendering email.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session");
    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID." }, { status: 400 });
    }

    const payload = await req.json() as {
      id: string;
      status: string;
      output: string | string[] | null;
      error?: string;
    };

    const supabase = createServiceClient();

    if (payload.status !== "succeeded" || !payload.output) {
      // Rendering failed
      await supabase
        .from("quiz_sessions")
        .update({ rendering_status: "failed" })
        .eq("id", sessionId);
      return NextResponse.json({ received: true });
    }

    // Replicate returns a string or array of strings (image URLs)
    const renderingUrl = Array.isArray(payload.output)
      ? payload.output[0]
      : payload.output;

    // ── Update Supabase ────────────────────────────────────────────────────
    const { data: session } = await supabase
      .from("quiz_sessions")
      .update({ rendering_url: renderingUrl, rendering_status: "complete" })
      .eq("id", sessionId)
      .select("first_name, email, primary_arch_style, secondary_arch_style")
      .single();

    if (!session?.email) {
      return NextResponse.json({ received: true });
    }

    // ── Send rendering email via Resend ────────────────────────────────────
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "designs@buildemersonpark.com";
    const fromName  = process.env.RESEND_FROM_NAME  ?? "Emerson Park Design & Construction";

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: session.email,
        subject: `${session.first_name ?? "Your"} Exterior Rendering is Ready`,
        html: renderingEmailHtml({
          firstName: session.first_name ?? "There",
          primaryArch: session.primary_arch_style ?? "",
          renderingUrl,
        }),
      });

      await supabase
        .from("quiz_sessions")
        .update({ rendering_email_sent_at: new Date().toISOString() })
        .eq("id", sessionId);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Render webhook error:", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}

// ─── Email template ───────────────────────────────────────────────────────────

function renderingEmailHtml({
  firstName,
  primaryArch,
  renderingUrl,
}: {
  firstName: string;
  primaryArch: string;
  renderingUrl: string;
}) {
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Your Exterior Rendering</title>
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
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#9B6B38;">Your Exterior Rendering</p>
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#1C1A15;line-height:1.2;">
                ${firstName}, your rendering is ready.
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#78716C;">
                Based on your style quiz selections, our system generated this exterior concept rendering in the <strong style="color:#3D3226;">${primaryArch}</strong> direction.
                This is an AI-generated starting point — your actual home will be crafted with our design team based on your lot, program, and vision.
              </p>

              <!-- Rendering Image -->
              <img src="${renderingUrl}" alt="Your exterior concept rendering" width="520"
                style="width:100%;max-width:520px;border-radius:10px;display:block;margin:0 auto 32px;" />

              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#78716C;">
                Continue to Stage 2 of your quiz to discover your interior design direction and receive a personalized mood board.
              </p>

              <div style="text-align:center;margin:0 0 32px;">
                <a href="https://buildemersonpark.com/quiz/discover"
                  style="display:inline-block;background:#9B6B38;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
                  Continue to Interior Discovery →
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
