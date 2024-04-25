"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRouter = void 0;
const subscription_1 = require("../controllers/subscription");
const express_1 = require("express");
const subscriptionRouter = (0, express_1.Router)();
exports.subscriptionRouter = subscriptionRouter;
subscriptionRouter.get("/", subscription_1.getSubscriptions);
subscriptionRouter.post("/", subscription_1.createSubscription);
//# sourceMappingURL=subscription.js.map