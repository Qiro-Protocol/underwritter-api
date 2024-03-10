import { z } from "zod";
export const validateCreatePolicy = z.object({
  name: z.string(),
  polciyCode: z.any(),
  id: z.string(),
});

export const validatePolicyDeployInput = z.object({
  policyId: z.number(),
  appId: z.number(),
});
