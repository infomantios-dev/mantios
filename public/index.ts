
import { createClient } from "npm:@supabase/supabase-js@2";
import { subject, html, text } from "./email.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const body = await req.json();
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Step 2: attach required product to the row created in step 1
  if (body.id) {
    const product = String(body.product || "").trim().slice(0, 120);
    if (!product) return json({ error: "Product is required" }, 400);
    const { error } = await supabase.from("waitlist").update({ product }).eq("id", body.id);
    return error ? json({ error: error.message }, 500) : json({ ok: true });
  }

  // Step 1: add email + send confirmation
  const email = String(body.email || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Invalid email" }, 400);

  const { data, error } = await supabase
    .from("waitlist")
    .insert({ email })
    .select("id")
    .single();

  if (error?.code === "23505") return json({ ok: false, duplicate: true });
  if (error) return json({ error: error.message }, 500);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Mantios <hello@mantios.ng>", 
      to: email,
      subject,
      html,
      text,
    }),
  });
  if (!res.ok) console.error("Resend error:", res.status, await res.text());

  return json({ ok: true, id: data.id });
});