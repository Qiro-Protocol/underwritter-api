"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePolicyDeployInput = exports.validateCreatePolicy = void 0;
const zod_1 = require("zod");
exports.validateCreatePolicy = zod_1.z.object({
    name: zod_1.z.string(),
    polciyCode: zod_1.z.any(),
    id: zod_1.z.string(),
});
exports.validatePolicyDeployInput = zod_1.z.object({
    policyId: zod_1.z.number(),
    appId: zod_1.z.number(),
});
//# sourceMappingURL=validate-policy.js.map