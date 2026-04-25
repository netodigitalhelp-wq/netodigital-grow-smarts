import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100).regex(/^[\p{L}\s'’\-.]+$/u, "invalid name"),
  phone: z.string().trim().min(7).max(20).regex(/^[\d+\-\s()]+$/, "invalid phone"),
  email: z.string().trim().email().max(200),
  business: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(2).max(2000),
  company_website: z.string().max(0).optional().default(""), // honeypot
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = ContactSchema.safeParse(body);
          if (!parsed.success) {
            return Response.json({ error: "פרטים לא תקינים" }, { status: 400 });
          }
          // Honeypot tripped — silently accept, do not store
          if (parsed.data.company_website) {
            return Response.json({ ok: true });
          }
          const { error } = await supabaseAdmin
            .from("contact_submissions")
            .insert({
              name: parsed.data.name,
              phone: parsed.data.phone,
              email: parsed.data.email,
              business: parsed.data.business || null,
              message: parsed.data.message,
            });
          if (error) {
            return Response.json({ error: "שגיאה בשמירת הפנייה" }, { status: 500 });
          }
          return Response.json({ ok: true });
        } catch {
          return Response.json({ error: "שגיאה לא צפויה" }, { status: 500 });
        }
      },
    },
  },
});