import { z } from "zod";

export const validateCreditInfo = z.object({
  id: z.number(),
  data: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      type: z.enum(["CREDIT"]),
    })
  ),
});
