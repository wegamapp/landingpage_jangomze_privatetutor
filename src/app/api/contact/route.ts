import { MailtrapClient } from "mailtrap";
import { getTranslations, resolveLocale, t } from "./i18n-server";

const OWNER_EMAIL = process.env.EMAIL_TEACHER;
const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN ?? process.env.MAILTRAP_API_KEY;
const FROM_NAME = "Jan Gómez Escobar";
const FROM_EMAIL = process.env.EMAIL_USER ?? "hello@jangomezetutor.es";
const OWNER_PHONE = "+34652092407";
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? OWNER_PHONE).replace(/^\+/, "");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Parse selected slot from request: prefer explicit horario, else extract from mensaje */
function parseSelectedSlot(horario?: string, mensaje?: string): string {
  if (horario && horario.trim()) return horario.trim();
  if (!mensaje) return "—";
  const match = mensaje.match(/Horario:\s*(.+?)(?:\n|$)/i) ?? mensaje.match(/horario[:\s]+(.+)/i);
  return match ? match[1].trim() : mensaje.trim();
}

/**
 * Parsea el string de horario (ej. "Lunes 24/2/2025 - 15:00") a Date.
 * Si se recibe slotIso (ISO con zona), se usa para precisión UTC.
 * Si no, se interpreta d/m/y y H:mm en la zona del servidor (o la indicada en env).
 */
function parseSlotToDate(selectedSlot: string, slotIso?: string): Date | null {
  if (slotIso && slotIso.trim()) {
    const d = new Date(slotIso.trim());
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const match = selectedSlot.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})\s*-\s*(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const [, day, month, year, hour, minute] = match;
  const d = new Date(
    parseInt(year!, 10),
    parseInt(month!, 10) - 1,
    parseInt(day!, 10),
    parseInt(hour!, 10),
    parseInt(minute!, 10),
    0,
    0
  );
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Comprueba que la fecha del slot sea al menos mañana (no hoy ni pasado). */
function isSlotFromTomorrow(slotDate: Date): boolean {
  const now = new Date();
  const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const slotDayStart = new Date(
    slotDate.getFullYear(),
    slotDate.getMonth(),
    slotDate.getDate(),
    0,
    0,
    0,
    0
  );
  return slotDayStart.getTime() >= startOfTomorrow.getTime();
}

/**
 * Calcula el timestamp Unix (segundos) para enviar el recordatorio exactamente 24h antes del slot.
 * slotDate se interpreta en hora local del servidor si se creó con parseSlotToDate sin ISO.
 */
function getReminderSendAtUnix(slotDate: Date): number {
  const ms24h = 24 * 60 * 60 * 1000;
  return Math.floor((slotDate.getTime() - ms24h) / 1000);
}

/** Escapa HTML para insertar texto seguro en el cuerpo del email */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  if (!MAILTRAP_TOKEN) {
    console.error("MAILTRAP_TOKEN (or MAILTRAP_API_KEY) is not set");
    return Response.json(
      { ok: false, error: "Email service not configured" },
      { status: 500 }
    );
  }
  if (!OWNER_EMAIL) {
    console.error("EMAIL_USER is not set");
    return Response.json(
      { ok: false, error: "Owner email not configured" },
      { status: 500 }
    );
  }

  let body: {
    nombre?: string;
    email?: string;
    telefono?: string;
    tipoContacto?: string;
    mensaje?: string;
    horario?: string;
    slotIso?: string;
    locale?: string;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const {
    nombre = "",
    email = "",
    telefono = "",
    tipoContacto = "",
    mensaje = "",
    horario,
    slotIso,
    locale: rawLocale,
  } = body;

  const locale = resolveLocale(rawLocale);
  const tr = getTranslations(rawLocale);

  const selectedSlot = parseSelectedSlot(horario, mensaje);

  const slotDate = parseSlotToDate(selectedSlot, slotIso);
  if (slotDate && !isSlotFromTomorrow(slotDate)) {
    return Response.json(
      { ok: false, error: "Solo se permiten reservas a partir de mañana" },
      { status: 400 }
    );
  }

  const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

  const displayName = nombre?.trim() || (locale === "es" ? "estimado/a" : locale === "ca" ? "estimat/ada" : "there");
  const locationVal = t(tr, "cta.location_val");
  const bringVal = t(tr, "cta.bring_val");
  const policyVal = t(tr, "cta.policy_val");

  try {
    // Email 1 — Owner: new lead notification with all form details (interno, texto fijo)
    await client.send({
      from: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: OWNER_EMAIL }],
      subject: `Nuevo lead / contacto (${tipoContacto || "formulario"})`,
      text: `Nuevo mensaje de contacto

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Tipo de contacto: ${tipoContacto || "—"}

Horario seleccionado: ${selectedSlot}

Mensaje:
${mensaje || "—"}`,
    });

    // Email 2 — User: confirmación con i18n y HTML
    const confSubject = t(tr, "emails.confirmation.subject", { nombre: displayName });
    const confGreeting = t(tr, "emails.confirmation.greeting", { nombre: displayName });
    const confThanks = t(tr, "emails.confirmation.thanks");
    const confDetailsTitle = t(tr, "emails.confirmation.details_title");
    const confDateLabel = t(tr, "emails.confirmation.date_time_label");
    const confLocationLabel = t(tr, "emails.confirmation.location_label");
    const confContactBefore = t(tr, "emails.confirmation.contact_before", { phone: OWNER_PHONE });
    const confBringLabel = t(tr, "emails.confirmation.bring_label");
    const confPolicyLabel = t(tr, "emails.confirmation.policy_label");
    const confFooter = t(tr, "emails.confirmation.footer");
    const confWhatsappBtn = t(tr, "emails.confirmation.whatsapp_button");

    const confirmationHtml = `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(confSubject)}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; margin: 0 0 16px;">${escapeHtml(confGreeting)}</p>
    <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 24px;">${escapeHtml(confThanks)}</p>
    <h2 style="font-size: 18px; font-weight: 600; color: #001738; margin: 0 0 12px;">${escapeHtml(confDetailsTitle)}</h2>
    <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td style="padding: 6px 0; color: #555; font-size: 14px;">${escapeHtml(confDateLabel)}</td><td style="padding: 6px 0; font-size: 14px; color: #1a1a1a;">${escapeHtml(selectedSlot)}</td></tr>
      <tr><td style="padding: 6px 0; color: #555; font-size: 14px;">${escapeHtml(confLocationLabel)}</td><td style="padding: 6px 0; font-size: 14px; color: #1a1a1a;">${escapeHtml(locationVal)}</td></tr>
    </table>
    <p style="font-size: 14px; line-height: 1.6; color: #444; margin: 0 0 20px;">${escapeHtml(confContactBefore)}</p>
    <p style="font-size: 14px; font-weight: 600; color: #333; margin: 0 0 4px;">${escapeHtml(confBringLabel)}</p>
    <p style="font-size: 14px; line-height: 1.5; color: #555; margin: 0 0 16px;">${escapeHtml(bringVal)}</p>
    <p style="font-size: 14px; font-weight: 600; color: #333; margin: 0 0 4px;">${escapeHtml(confPolicyLabel)}</p>
    <p style="font-size: 14px; line-height: 1.5; color: #555; margin: 0 0 24px;">${escapeHtml(policyVal)}</p>
    <p style="text-align: center; margin: 0 0 24px;">
      <a href="${WHATSAPP_LINK}" style="display: inline-block; background-color: #25D366; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">${escapeHtml(confWhatsappBtn)}</a>
    </p>
    <p style="font-size: 14px; color: #666; margin: 0;">${escapeHtml(confFooter)}</p>
  </div>
</body>
</html>`;

    await client.send({
      from: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email }],
      subject: confSubject,
      text: `${confGreeting}\n\n${confThanks}\n\n${confDetailsTitle}\n• ${confDateLabel}: ${selectedSlot}\n• ${confLocationLabel}: ${locationVal}\n\n${confContactBefore}\n\n${confBringLabel}\n${bringVal}\n\n${confPolicyLabel}\n${policyVal}\n\n${confFooter}`,
      html: confirmationHtml,
    });

    // Email 3 — Recordatorio programado 24h antes (send_at); con i18n y HTML
    if (slotDate) {
      const sendAtUnix = getReminderSendAtUnix(slotDate);
      if (sendAtUnix > Math.floor(Date.now() / 1000)) {
        try {
          const remSubject = t(tr, "emails.reminder.subject");
          const remGreeting = t(tr, "emails.reminder.greeting", { nombre: displayName });
          const remIntro = t(tr, "emails.reminder.intro");
          const remDateLabel = t(tr, "emails.reminder.date_time_label");
          const remPolicyNote = t(tr, "emails.reminder.policy_note");
          const remFooter = t(tr, "emails.reminder.footer");
          const remWhatsappBtn = t(tr, "emails.reminder.whatsapp_button");

          const reminderHtml = `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(remSubject)}</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a; margin: 0 0 16px;">${escapeHtml(remGreeting)}</p>
    <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0 0 16px;">${escapeHtml(remIntro)}</p>
    <p style="font-size: 14px; margin: 0 0 20px;"><strong>${escapeHtml(remDateLabel)}:</strong> ${escapeHtml(selectedSlot)}</p>
    <p style="font-size: 14px; line-height: 1.5; color: #555; margin: 0 0 24px;">${escapeHtml(remPolicyNote)}</p>
    <p style="text-align: center; margin: 0 0 24px;">
      <a href="${WHATSAPP_LINK}" style="display: inline-block; background-color: #25D366; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;">${escapeHtml(remWhatsappBtn)}</a>
    </p>
    <p style="font-size: 14px; color: #666; margin: 0;">${escapeHtml(remFooter)}</p>
  </div>
</body>
</html>`;

          const reminderPayload = {
            from: { name: FROM_NAME, email: FROM_EMAIL },
            to: [{ email }],
            subject: remSubject,
            text: `${remGreeting}\n\n${remIntro}\n\n${remDateLabel}: ${selectedSlot}\n\n${remPolicyNote}\n\n${remFooter}`,
            html: reminderHtml,
            send_at: sendAtUnix,
          };
          await client.send(reminderPayload as Parameters<MailtrapClient["send"]>[0]);
        } catch (reminderErr) {
          console.error("Mailtrap reminder (send_at) failed — reservation still OK:", reminderErr);
        }
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Mailtrap API error:", err);
    return Response.json(
      { ok: false, error: "Failed to send email", details: message },
      { status: 500 }
    );
  }
}
