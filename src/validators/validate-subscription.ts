import { z } from "zod";

export const validateSubscription = z.object({
  id: z.string(),
  name: z.string(),
  subscriptionId: z.number().int(),
  chainId: z.number().int(),
  routerAddress: z.string(),
  donId: z.string(),
  linkTokenAddress: z.string(),
  explorerUrl: z.string(),
  contractAddress: z.string(),
});
