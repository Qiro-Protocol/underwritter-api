import { z } from "zod";
export const validateCreatePolicy = z.object({
  name: z.string(),
  polciyCode: z.any(),
  id: z.number(),
});

export const validatePolicyDeployInput = z.object({
  id: z.number(),
  appId: z.number(),
});
