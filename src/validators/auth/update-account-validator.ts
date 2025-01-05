import { z } from "zod";

export const updateAccountSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus diisi." })
    .trim()
    .nullable()
    .optional(),
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .trim()
    .nullable()
    .optional(),
  profile: z.union([
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

export type UpdateAccountType = z.infer<typeof updateAccountSchema>;
