export const formatPaymentMethod = (method?: string): string => {
  switch (method) {
    case "credit_card":
      return "Kartu Kredit";
    case "gopay":
      return "GoPay";
    case "shopeepay":
      return "ShopeePay";
    case "bank_transfer":
      return "Transfer Bank";
    case "echannel":
      return "Mandiri Bill Payment";
    case "qris":
      return "QRIS";
    case "cstore":
      return "Alfamart / Indomaret";
    default:
      return "Belum Membayar";
  }
};
