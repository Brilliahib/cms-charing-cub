import { z } from "zod";

export const bookingNanniesSchema = z.object({
  nanny_id: z
    .string()
    .min(1, { message: "ID pengasuh harus diisi dan minimal 1" }),
  price_id: z.string(),
  start_time: z
    .string()
    .min(1, { message: "Waktu mulai harus diisi" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Waktu mulai harus berupa format tanggal yang valid",
    }),
  end_time: z
    .string()
    .min(1, { message: "Waktu selesai harus diisi" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Waktu selesai harus berupa format tanggal yang valid",
    }),
  name_babies: z
    .string()
    .min(1, { message: "Nama bayi harus diisi" })
    .max(255, { message: "Nama bayi maksimal 255 karakter" }),
  age_babies: z
    .string()
    .min(1, { message: "Usia bayi harus diisi" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "Usia bayi minimal 0 tahun",
    }),
  special_request: z.string().optional(),
});

export type BookingNanniesType = z.infer<typeof bookingNanniesSchema>;
