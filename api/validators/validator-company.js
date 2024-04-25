"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCompanyData = void 0;
const zod_1 = require("zod");
exports.ValidateCompanyData = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, {
        message: "name must be at least 2 characters.",
    })
        .max(30, {
        message: "Username must not be longer than 30 characters.",
    }),
    headLine: zod_1.z.string(),
    logo: zod_1.z.string().optional(),
    website: zod_1.z.string().url().optional(),
    description: zod_1.z.string().max(160).min(4),
    foundedYear: zod_1.z.string(),
    teamSize: zod_1.z.string(),
    fundingStage: zod_1.z.string(),
    location: zod_1.z.string(),
    userId: zod_1.z.number(),
});
//# sourceMappingURL=validator-company.js.map