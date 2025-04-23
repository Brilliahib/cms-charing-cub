import { z } from "zod";

export const nanniesSchema = z.object({
  daycare_id: z.string().nullable().optional(),
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
  price_lists: z
    .array(
      z.object({
        age_start: z
          .string()
          .min(0, { message: "Umur awal harus minimal 0 tahun" }),
        age_end: z
          .string()
          .min(0, { message: "Umur akhir harus minimal 0 tahun" }),
        price: z
          .number()
          .min(1, { message: "Harga harus diisi dan minimal 1" }),
        name: z
          .string()
          .min(1, { message: "Nama keterangan price list wajib diisi" }),
      })
    )
    .min(1, { message: "Setidaknya satu price list harus diisi" }),
  experience_description: z
    .string()
    .min(1, { message: "Deskripsi pengalaman harus diisi" }),
});

export type NanniesType = z.infer<typeof nanniesSchema>;
