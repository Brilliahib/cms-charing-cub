import { z } from "zod";

export const monitoringChildrenSchema = z.object({
  user_id: z.string(),
  daycare_id: z.string(),
});

export type MonitoringChildrenType = z.infer<typeof monitoringChildrenSchema>;
