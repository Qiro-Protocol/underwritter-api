import { z } from "zod";
import { UserRole } from "@prisma/client";

export const validateEmail = z.object({
  email: z.string(),
});

export const validateUser = validateEmail.extend({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.nativeEnum(UserRole),
});

export const validateDocument = z.object({
  companyId: z.number(),
  link: z.string().url(),
  label: z.string(),
});
