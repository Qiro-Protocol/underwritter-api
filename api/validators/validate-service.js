"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConnectService = exports.validateService = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.validateService = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    dataType: zod_1.z.nativeEnum(client_1.ServiceDataType),
});
exports.validateConnectService = zod_1.z.object({
    companyId: zod_1.z.number(),
    serviceId: zod_1.z.number(),
});
//# sourceMappingURL=validate-service.js.map