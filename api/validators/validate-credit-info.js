"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreditInfo = void 0;
const zod_1 = require("zod");
exports.validateCreditInfo = zod_1.z.object({
    companyId: zod_1.z.string(),
    data: zod_1.z.array(zod_1.z.object({
        label: zod_1.z.string(),
        value: zod_1.z.string(),
    })),
});
//# sourceMappingURL=validate-credit-info.js.map