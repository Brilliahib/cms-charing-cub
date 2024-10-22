import { z } from "zod";

export const daycareSchema = z.object({
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
  description: z.string().nullable().optional(),
  opening_hours: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Format jam buka harus HH:mm" }),
  closing_hours: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Format jam tutup harus HH:mm" }),
  opening_days: z.string().min(1, { message: "Hari buka harus diisi" }),
  phone_number: z
    .string()
    .max(20, { message: "Nomor telepon maksimal 20 karakter" })
    .nullable()
    .optional(),
  facility_images: z
    .array(
      z.union([
        z.string().nullable().optional(),
        z
          .instanceof(File)
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
                file.type
              ),
            {
              message:
                "Gambar fasilitas harus berformat jpeg, png, jpg, atau gif",
            }
          )
          .refine((file) => file.size <= 2048 * 1024, {
            message: "Ukuran gambar fasilitas maksimal 2MB",
          }),
      ])
    )
    .min(1, { message: "Setidaknya satu gambar fasilitas harus diunggah" }),
});

export type DaycareType = z.infer<typeof daycareSchema>;
