import { buildEmail } from "./email.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// minimal PostgREST call (no supabase-js)
const db = (path: string, method: string, body: unknown) =>
  fetch(`${SB_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(body),
  });

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const body = await req.json();

    // Step 2: save required product, then send the confirmation mail
    if (body.id) {
      const id = String(body.id);
      if (!UUID.test(id)) return json({ error: "Invalid id" }, 400);

      const product = String(body.product || "").trim().slice(0, 120);
      if (!product) return json({ error: "Product is required" }, 400);

      // only updates a row that has no product yet, so the mail is sent once
      const r = await db(`waitlist?id=eq.${id}&product=is.null`, "PATCH", { product });
      if (!r.ok) {
        console.error("DB update error:", r.status, await r.text());
        return json({ error: "Could not save product" }, 500);
      }
      const rows = await r.json();
      if (!rows.length) return json({ ok: true, alreadySaved: true });

      // a mail failure must not fail the request: the product is already saved
      try {
        const mail = buildEmail(product);
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Mantios <hello@mantios.ng>",
            to: rows[0].email,
            subject: mail.subject,
            html: mail.html,
            text: mail.text,
          }),
        });
        if (!res.ok) console.error("Resend error:", res.status, await res.text());
      } catch (e) {
        console.error("Resend request failed:", e);
      }

      return json({ ok: true });
    }

    // Step 1: save the email only
    const email = String(body.email || "").trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Invalid email" }, 400);

    const r = await db("waitlist", "POST", { email });
    if (r.status === 409) {
      // already on the list: if they never gave a product, let them finish step 2
      const q = await fetch(
        `${SB_URL}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}&select=id,product`,
        { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
      );
      const found = q.ok ? await q.json() : [];
      if (found[0] && found[0].product === null) {
        return json({ ok: true, resume: true, id: found[0].id });
      }
      return json({ ok: false, duplicate: true });
    }
    if (!r.ok) {
      console.error("DB insert error:", r.status, await r.text());
      return json({ error: "Could not save email" }, 500);
    }
    const rows = await r.json();
    return json({ ok: true, id: rows[0].id });
  } catch (e) {
    console.error(e);
    return json({ error: "Server error" }, 500);
  }
});