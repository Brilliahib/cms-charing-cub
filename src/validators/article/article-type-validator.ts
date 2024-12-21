import { z } from "zod";

export const typeArticleSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Tipe artikel harus diisi" })
    .max(255, { message: "Tipe artikel maksimal 255 karakter" }),
});

export type TypeArticleType = z.infer<typeof typeArticleSchema>;
