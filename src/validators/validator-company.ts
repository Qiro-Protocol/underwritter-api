import { z } from "zod";

export const ValidateCompanyData = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  headLine: z.string(),
  logo: z.string().optional(),
  website: z.string().url().optional(),
  description: z.string().max(160).min(4),
  foundedYear: z.string(),
  teamSize: z.string(),
  fundingStage: z.string(),
  location: z.string(),
  userId: z.number(),
});
