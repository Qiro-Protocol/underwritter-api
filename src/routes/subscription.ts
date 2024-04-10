import {
  createSubscription,
  getSubscriptions,
} from "@/controllers/subscription";
import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getSubscriptions);
subscriptionRouter.post("/", createSubscription);

export { subscriptionRouter };
