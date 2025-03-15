import { z } from "zod";

export const questionAnswerSchema = z.object({
  talk_id: z.string(),
  answer: z.string(),
});

export type QuestionAnswerType = z.infer<typeof questionAnswerSchema>;
