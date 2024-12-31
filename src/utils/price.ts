export function formatPrice(amount: number | undefined): string {
  if (amount === undefined) return "Harga tidak tersedia";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
