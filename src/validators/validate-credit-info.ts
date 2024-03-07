import { z } from "zod";

export const validateCreditInfo = z.object({
  companyId: z.string(),
  data: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});
