export function formatPrice(amount: number | undefined): string {
  if (amount === undefined) return "Harga tidak tersedia";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatRupiahString(value?: string) {
  if (!value) return "Rp0";
  const number = Number(value);
  if (isNaN(number)) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}
