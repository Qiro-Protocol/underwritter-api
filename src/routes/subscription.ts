import {
  createSubscription,
  getSubscriptionById,
  getSubscriptions,
} from "@/controllers/subscription";
import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/subscriptions", getSubscriptions);
subscriptionRouter.post("/subscriptions", createSubscription);
subscriptionRouter.get("/subscriptions/:id", getSubscriptionById);

export { subscriptionRouter };
