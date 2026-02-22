import es from "@/i18n/es.json";
import en from "@/i18n/en.json";
import ca from "@/i18n/ca.json";

export type SupportedLocale = "es" | "en" | "ca";

const translations: Record<SupportedLocale, Record<string, unknown>> = {
  es: es as Record<string, unknown>,
  en: en as Record<string, unknown>,
  ca: ca as Record<string, unknown>,
};

const DEFAULT_LOCALE: SupportedLocale = "es";

/**
 * Normaliza el locale recibido; si no es válido, devuelve español.
 */
export function resolveLocale(locale?: string | null): SupportedLocale {
  if (locale === "en" || locale === "ca" || locale === "es") return locale;
  return DEFAULT_LOCALE;
}

/**
 * Devuelve el objeto de traducciones para el locale (fallback a es).
 */
export function getTranslations(locale?: string | null): Record<string, unknown> {
  const loc = resolveLocale(locale);
  return translations[loc] ?? translations[DEFAULT_LOCALE];
}

/**
 * Obtiene una cadena traducida por path (ej. "emails.confirmation.subject")
 * y sustituye variables {nombre}, {phone}, etc.
 */
export function t(
  tr: Record<string, unknown>,
  path: string,
  vars?: Record<string, string>
): string {
  const keys = path.split(".");
  let value: unknown = tr;
  for (const k of keys) {
    value = (value as Record<string, unknown>)?.[k];
  }
  let s = typeof value === "string" ? value : path;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), v ?? "");
    }
  }
  return s;
}
