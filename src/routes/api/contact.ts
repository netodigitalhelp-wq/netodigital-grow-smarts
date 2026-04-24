import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(200),
  business: z.string().max(200).optional().default(""),
  message: z.string().min(2).max(2000),
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