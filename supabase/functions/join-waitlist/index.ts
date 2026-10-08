// import { createClient } from "npm:@supabase/supabase-js@2";

// const cors = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// };

// Deno.serve(async (req) => {
//   if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

//   const { email } = await req.json();
//   if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
//     return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400, headers: cors });
//   }

//   const supabase = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
//   );

//   const { error } = await supabase.from("waitlist").insert({ email: email.toLowerCase() });

//   if (error?.code === "23505") {
//     return new Response(JSON.stringify({ ok: true, duplicate: true }), { headers: cors });
//   }
//   if (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: cors });
//   }

//   await fetch("https://api.resend.com/emails", {
//     method: "POST",
//     headers: {

//       Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       from: "Mantios <onboarding@resend.dev>",
//       to: email,
//       subject: "You're on the Mantios waitlist",
//       html: "<p>Thanks for joining the Mantios waitlist. We'll be in touch soon.</p>",
//     }),
//   });

//   return new Response(JSON.stringify({ ok: true }), { headers: cors });
// });
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

  const { email: raw } = await req.json();
  const email = String(raw || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return json({ error: "Invalid email" }, 400);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error?.code === "23505") return json({ ok: false, duplicate: true });
  if (error) return json({ error: error.message }, 500);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   from: "Mantios <hello@mantios.ng>",
    //   to: email,
    //   subject: "You're on the Mantios waitlist",
    //   html: "<p>Thanks for joining the Mantios waitlist. We'll be in touch soon.</p>",
    // }),
    body: JSON.stringify({
      from: "Mantios <hello@mantios.ng>",
      to: email,
      subject,
      html,
      text,
    }),

  });

  if (!res.ok) console.error("Resend error:", res.status, await res.text());

  return json({ ok: true, emailSent: res.ok });
});