import { z } from "zod";

export const validateUser = z.object({
  email: z.string(),
});
