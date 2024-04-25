"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const service_1 = require("../controllers/services/service");
const express_1 = require("express");
const serviceRouter = (0, express_1.Router)();
exports.serviceRouter = serviceRouter;
serviceRouter.get("/", service_1.getAllServices);
serviceRouter.post("/", service_1.createService);
serviceRouter.post("/connect", service_1.connectService);
serviceRouter.get("/:id", service_1.getConnectedServicesByCompanyId);
//# sourceMappingURL=service.js.map