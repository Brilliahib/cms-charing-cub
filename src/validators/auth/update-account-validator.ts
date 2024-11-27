import { z } from "zod";

export const updateAccountSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi." }).trim(),
  email: z.string().min(1, { message: "Email harus diisi" }).trim(),
  profile: z
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
});

export type UpdateAccountType = z.infer<typeof updateAccountSchema>;
