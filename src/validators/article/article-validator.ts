import { z } from "zod";

export const articleSchema = z.object({
  article_type_id: z
    .string()
    .min(1, { message: "Article Type harus diisi" })
    .refine((val) => !isNaN(parseInt(val)), {
      message: "Article Type harus berupa ID yang valid",
    }),
  title: z
    .string()
    .min(1, { message: "Judul harus diisi" })
    .max(255, { message: "Judul maksimal 255 karakter" }),
  content: z.string().min(1, { message: "Konten harus diisi" }),
  image: z.union([
    z.string().nullable().optional(),
    z
      .instanceof(File)
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
            file.type
          ),
        {
          message: "Gambar harus berformat jpeg, png, jpg, atau gif",
        }
      )
      .refine((file) => file.size <= 2048 * 1024, {
        message: "Ukuran gambar maksimal 2MB",
      }),
  ]),
});

export type ArticleType = z.infer<typeof articleSchema>;
