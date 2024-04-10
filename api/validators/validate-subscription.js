"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubscription = void 0;
const zod_1 = require("zod");
exports.validateSubscription = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    subscriptionId: zod_1.z.number().int(),
    chainId: zod_1.z.number().int(),
    routerAddress: zod_1.z.string(),
    donId: zod_1.z.string(),
    linkTokenAddress: zod_1.z.string(),
    explorerUrl: zod_1.z.string(),
    contractAddress: zod_1.z.string(),
});
//# sourceMappingURL=validate-subscription.js.map