import { ServiceDataType } from "@prisma/client";
import { z } from "zod";
export const validateService = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  dataType: z.nativeEnum(ServiceDataType),
});

export const validateConnectService = z.object({
  companyId: z.number(),
  serviceId: z.number(),
});
