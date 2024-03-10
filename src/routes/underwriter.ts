import {
  getAllApplications,
  getApplicationsStats,
} from "@/controllers/underwriter/applications";
import { getUnderWritterStats } from "@/controllers/underwriter/overview";
import {
  DeployPolicy,
  createPolicy,
  getAllPolicies,
} from "@/controllers/underwriter/policy";
import { Router } from "express";

const underwriterRoute = Router();

underwriterRoute.get("/stats", getUnderWritterStats);
underwriterRoute.get("/applications", getAllApplications);
underwriterRoute.get("/applications/stats", getApplicationsStats);
underwriterRoute.get("/policy", getAllPolicies);
underwriterRoute.post("/policy", createPolicy);
underwriterRoute.post("/policy/deploy", DeployPolicy);

export { underwriterRoute };
