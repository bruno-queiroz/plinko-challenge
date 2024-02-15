import { z } from "zod";

export const betSchema = z.object({
  bet: z.coerce.number().min(1),
  rows: z.coerce.number().min(8).max(16),
  risk: z.literal("low").or(z.literal("medium").or(z.literal("high"))),
});
