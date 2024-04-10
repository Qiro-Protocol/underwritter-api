"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscription = exports.getSubscriptions = void 0;
const utils_1 = require("../../utils");
const validate_subscription_1 = require("../../validators/validate-subscription");
async function getSubscriptions(req, res) {
    try {
        const { id } = req.body;
        const subscriptions = await utils_1.prisma.subscription.findMany({
            where: {
                ownerId: Number(id),
            },
        });
        if (!subscriptions) {
            res.status(404);
            res.json({
                data: null,
                err: {
                    message: "Resource not found",
                },
            });
        }
        else {
            res.status(200);
            res.json({
                data: subscriptions,
                err: null,
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            data: null,
            err: "INTERNAL SerVer ERROR",
        });
    }
}
exports.getSubscriptions = getSubscriptions;
async function createSubscription(req, res) {
    try {
        const { id, name, chainId, contractAddress, donId, explorerUrl, linkTokenAddress, routerAddress, subscriptionId, } = validate_subscription_1.validateSubscription.parse(req.body);
        const createdSubscription = await utils_1.prisma.subscription.create({
            data: {
                name,
                chainId,
                contractAdress: contractAddress,
                donId,
                explorerUrl,
                linkTokenAddress,
                routerAddress,
                subscriptionId,
                osner: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });
        res.status(201);
        res.json({
            data: createdSubscription,
            err: null,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            data: null,
            err: "INTERNAL SERVER ERROR",
        });
    }
}
exports.createSubscription = createSubscription;
//# sourceMappingURL=index.js.map