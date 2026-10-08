// supabase/functions/join-waitlist/email.ts

const SITE_URL = "https://mantios.ng";
const LOGO_URL = "https://mantios.ng/logo.png"; 

// Mantios palette (light defaults; dark overrides in <style>)
const BG = "#EFEEEB";
const CARD = "#FFFFFF";
const LINE = "#D9D7D2";
const INK = "#010101";
const BODY = "#1A1A1A";
const MUTED = "#474747";
const ACCENT = "#7B0027";
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const subject = "You're on the Mantios waitlist";

export const text = `Thank you for joining the Mantios waitlist.

Your email has been added successfully. Mantios helps you verify that pharma and beauty products are genuine, so you can protect your health and your money.

What happens next
1. We build the network: trusted vendors are being onboarded so every scan is backed by real data.
2. You get early access: waitlist members get in before the public launch.
3. We email you: you'll hear from us as soon as your spot opens.

Visit us: ${SITE_URL}

You received this because you joined the Mantios waitlist.
If this wasn't you, you can safely ignore this email.`;

const step = (n: number, title: string, body: string) => `
<tr>
  <td valign="top" width="44" style="padding:0 0 20px 0;">
    <div class="circle" style="width:28px;height:28px;border-radius:14px;background:${BG};color:${ACCENT};font:600 13px/28px ${FONT};text-align:center;">${n}</div>
  </td>
  <td valign="top" style="padding:0 0 20px 0;">
    <div class="ink" style="font:600 15px/22px ${FONT};color:${INK};">${title}</div>
    <div class="muted" style="font:400 14px/21px ${FONT};color:${MUTED};">${body}</div>
  </td>
</tr>`;

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${subject}</title>
<style>
  @media (prefers-color-scheme: dark) {
    .bg { background:#010101 !important; }
    .card { background:#0A0A0A !important; border-color:#222222 !important; }
    .box { background:#0A0A0A !important; border-color:#222222 !important; }
    .rule { border-color:#222222 !important; }
    .ink { color:#FFFFFF !important; }
    .body { color:#D9D9D9 !important; }
    .muted { color:#868686 !important; }
    .accent { color:#FFA08F !important; }
    .chip { background:#262626 !important; border-color:#262626 !important; color:#F8F8F8 !important; }
    .dot { color:#FFA08F !important; }
    .circle { background:#1C1C1C !important; color:#FFA08F !important; }
    .btn { background:#FFFFFF !important; color:#1A1A1A !important; }
  }
</style>
</head>
<body class="bg" style="margin:0;padding:0;background:${BG};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
  Your spot is saved. Here's what happens next.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="bg" style="background:${BG};">
<tr><td align="center" style="padding:32px 16px;">

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">

    <!-- brand -->
    <tr>
      <td style="padding:0 4px 20px 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td valign="middle" style="padding-right:10px;">
            <img src="${LOGO_URL}" alt="Mantios" width="32" height="32" style="display:block;border:0;outline:none;width:32px;height:32px;">
          </td>
          <td valign="middle" class="ink" style="font:600 18px/1 ${FONT};color:#1A1A1A;">Mantios</td>
        </tr></table>
      </td>
    </tr>

    <!-- card -->
    <tr>
      <td class="card" style="background:${CARD};border:1px solid ${LINE};border-radius:20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

          <!-- hero -->
          <tr>
            <td style="padding:36px 32px 8px 32px;">
              <div class="chip" style="display:inline-block;background:${CARD};border:1px solid ${LINE};color:${BODY};font:500 13px/1 ${FONT};padding:8px 14px;border-radius:999px;">
                <span class="dot" style="color:${ACCENT};">&#9679;</span>&nbsp; Waitlist confirmed
              </div>
              <h1 class="ink" style="margin:20px 0 12px 0;font:600 32px/40px ${FONT};color:${INK};">
                Thank you for joining the <span class="accent" style="color:${ACCENT};">Mantios</span> waitlist
              </h1>
              <p class="body" style="margin:0;font:400 16px/26px ${FONT};color:${BODY};">
                Your email has been added successfully. Mantios helps you verify that the pharma and beauty products you buy are genuine, so you can protect your health and your money.
              </p>
            </td>
          </tr>

          <!-- what we verify -->
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" valign="top" style="padding-right:8px;">
                    <div class="box" style="border:1px solid ${LINE};border-radius:14px;padding:16px;background:${CARD};">
                      <div class="ink" style="font:600 15px/22px ${FONT};color:${INK};">Pharma</div>
                      <div class="muted" style="font:400 13px/20px ${FONT};color:${MUTED};">Confirm medicines are real before you take them.</div>
                    </div>
                  </td>
                  <td width="50%" valign="top" style="padding-left:8px;">
                    <div class="box" style="border:1px solid ${LINE};border-radius:14px;padding:16px;background:${CARD};">
                      <div class="ink" style="font:600 15px/22px ${FONT};color:${INK};">Beauty</div>
                      <div class="muted" style="font:400 13px/20px ${FONT};color:${MUTED};">Spot fake skincare and cosmetics at a glance.</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- next steps -->
          <tr>
            <td style="padding:32px 32px 4px 32px;">
              <div class="ink" style="font:600 17px/24px ${FONT};color:${INK};margin-bottom:18px;">What happens next</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${step(1, "We build the network", "Trusted vendors are being onboarded so every scan is backed by real data.")}
                ${step(2, "You get early access", "Waitlist members get in before the public launch.")}
                ${step(3, "We email you", "You'll hear from us as soon as your spot opens.")}
              </table>
            </td>
          </tr>

          <!-- cta -->
          <tr>
            <td align="left" style="padding:4px 32px 36px 32px;">
              <a href="${SITE_URL}" class="btn" style="display:inline-block;background:#1A1A1A;color:#FFFFFF;font:600 15px/1 ${FONT};text-decoration:none;padding:14px 28px;border-radius:999px;">
                Visit Mantios
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>

    <!-- footer -->
    <tr>
      <td style="padding:20px 8px 0 8px;">
        <p class="muted" style="margin:0;font:400 12px/19px ${FONT};color:#868686;">
          You received this because you joined the Mantios waitlist. If this wasn't you, you can safely ignore this email.
        </p>
        <p class="muted" style="margin:10px 0 0 0;font:400 12px/18px ${FONT};color:#868686;">&copy; ${new Date().getFullYear()} Mantios</p>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;