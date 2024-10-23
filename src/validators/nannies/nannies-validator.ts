import { z } from "zod";

export const nanniesSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi" })
    .max(255, { message: "Nama maksimal 255 karakter" }),
  images: z
    .union([
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
    ])
    .nullable(),
  gender: z
    .string()
    .min(1, { message: "Jenis kelamin harus diisi" })
    .max(10, { message: "Jenis kelamin maksimal 10 karakter" }),
  age: z.number().min(18, { message: "Umur minimal 18 tahun" }),
  contact: z
    .string()
    .min(1, { message: "Kontak harus diisi" })
    .max(20, { message: "Kontak maksimal 20 karakter" }),
  price_half: z
    .number()
    .min(1, { message: "Harga setengah hari harus diisi dan minimal 1" }),
  price_full: z
    .number()
    .min(1, { message: "Harga penuh harus diisi dan minimal 1" }),
  experience_description: z
    .string()
    .min(1, { message: "Deskripsi pengalaman harus diisi" }),
});

export type NanniesType = z.infer<typeof nanniesSchema>;
