"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.underwriterRoute = void 0;
const applications_1 = require("../controllers/underwriter/applications");
const overview_1 = require("../controllers/underwriter/overview");
const policy_1 = require("../controllers/underwriter/policy");
const express_1 = require("express");
const underwriterRoute = (0, express_1.Router)();
exports.underwriterRoute = underwriterRoute;
underwriterRoute.get("/stats", overview_1.getUnderWritterStats);
underwriterRoute.get("/applications", applications_1.getAllApplications);
underwriterRoute.get("/applications/stats", applications_1.getApplicationsStats);
underwriterRoute.get("/policy", policy_1.getAllPolicies);
underwriterRoute.post("/policy", policy_1.createPolicy);
underwriterRoute.post("/policy/deploy", policy_1.DeployPolicy);
//# sourceMappingURL=underwriter.js.map