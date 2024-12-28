import { z } from "zod";

export const uploadPaymentProofDaycareSchema = z.object({
  payment_proof: z
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
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Ukuran gambar maksimal 2MB",
    }),
});

export type UploadPaymentProofDaycareType = z.infer<
  typeof uploadPaymentProofDaycareSchema
>;
