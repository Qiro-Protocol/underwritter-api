import { z } from "zod";

export const ValidateCompanyData = z.object({
  name: z.string(),
  headLine: z.string(),
  description: z.string(),
  logo: z.string().url(),
  website: z.string().url(),
  city: z.string(),
  country: z.string(),
  foundedYear: z.date(),
  teamSize: z.string(),
  id: z.number(),
});
