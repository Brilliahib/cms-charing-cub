import { z } from "zod";

export const feedbacksSchema = z.object({
  rate: z.string().min(1, { message: "Rating harus diisi" }),
  comment: z.string().nullable().optional(),
});

export type FeedbacksType = z.infer<typeof feedbacksSchema>;
