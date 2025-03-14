import { formatDistanceToNowStrict } from "date-fns";
import { id } from "date-fns/locale";

/**
 * Format waktu menjadi "1 jam yang lalu", "2 hari yang lalu", dll.
 * @param date Objek Date
 * @returns Waktu dalam format relatif (contoh: "1 jam yang lalu")
 */
export function formatRelativeTime(date?: Date): string {
  if (!date) return "Baru saja";
  return formatDistanceToNowStrict(date, { addSuffix: true, locale: id });
}
