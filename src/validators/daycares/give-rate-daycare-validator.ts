import { z } from "zod";

export const giveRateDaycareSchema = z.object({
  daycare_id: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Daycare ID harus berupa angka yang valid",
    })
    .transform((val) => Number(val)),
  rating: z
    .number({
      invalid_type_error: "Rating harus berupa angka",
    })
    .min(1, { message: "Rating harus lebih besar dari 0" })
    .max(5, { message: "Rating harus kurang dari atau sama dengan 5" }),
  comment: z.string().min(1, { message: "Konten harus diisi" }),
});

export type GiveRateDaycareType = z.infer<typeof giveRateDaycareSchema>;
