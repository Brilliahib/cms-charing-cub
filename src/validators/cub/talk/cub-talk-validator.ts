import { z } from "zod";

export const cubTalkSchema = z.object({
  question_title: z.string(),
  question_detail: z.string(),
});

export type CubTalkType = z.infer<typeof cubTalkSchema>;
