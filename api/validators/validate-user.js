"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDocument = exports.validateUser = exports.validateEmail = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.validateEmail = zod_1.z.object({
    email: zod_1.z.string(),
});
exports.validateUser = exports.validateEmail.extend({
    email: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    role: zod_1.z.nativeEnum(client_1.UserRole),
});
exports.validateDocument = zod_1.z.object({
    companyId: zod_1.z.number(),
    link: zod_1.z.string().url(),
    label: zod_1.z.string(),
});
//# sourceMappingURL=validate-user.js.map