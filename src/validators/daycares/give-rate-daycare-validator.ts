import { z } from "zod";

export const giveRateDaycareSchema = z.object({
  daycare_id: z.number({
    invalid_type_error: "Daycare ID harus berupa angka",
  }),
  rating: z.number({
    invalid_type_error: "Rating harus berupa angka",
  }),
  comment: z.string().min(1, { message: "Konten harus diisi" }),
});

export type GiveRateDaycareType = z.infer<typeof giveRateDaycareSchema>;
