export function formatTime(dateOrStr: Date | string | undefined): string {
  if (!dateOrStr) return "Waktu tidak tersedia";
  const date =
    typeof dateOrStr === "string"
      ? new Date(`1970-01-01T${dateOrStr}`)
      : dateOrStr;
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
