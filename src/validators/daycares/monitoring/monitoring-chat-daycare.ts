import { z } from "zod";

export const monitoringChatDaycareSchema = z.object({
  monitoring_children_id: z.string(),
  message: z.string(),
  user_id: z.string(),
  image: z
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

export type MonitoringChatDaycareType = z.infer<
  typeof monitoringChatDaycareSchema
>;
