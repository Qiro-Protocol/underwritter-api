"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployPolicy = exports.getAllPolicies = exports.createPolicy = void 0;
const request_1 = require("../../lib/functions/request");
const utils_1 = require("../../utils");
const validate_policy_1 = require("../../validators/validate-policy");
async function createPolicy(req, res) {
    try {
        const { name, polciyCode, id } = validate_policy_1.validateCreatePolicy.parse(req.body);
        const createdPolciy = await utils_1.prisma.policy.create({
            data: {
                name,
                polciyCode,
                owner: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });
        res.status(200);
        res.json({
            data: createdPolciy,
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
exports.createPolicy = createPolicy;
async function getAllPolicies(req, res) {
    try {
        const { id } = req.body;
        const allPolcies = await utils_1.prisma.policy.findMany({
            where: {
                userId: Number(id),
            },
        });
        res.status(200);
        res.json({
            data: allPolcies,
            err: null,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            data: null,
            err: "INTERNAL SERVEr ERROR",
        });
    }
}
exports.getAllPolicies = getAllPolicies;
async function DeployPolicy(req, res) {
    try {
        const { appId, policyId } = validate_policy_1.validatePolicyDeployInput.parse(req.body);
        const app = await utils_1.prisma.application.findUnique({
            where: {
                id: appId,
            },
        });
        const polciy = await utils_1.prisma.policy.findUnique({
            where: {
                id: policyId,
            },
        });
        if (!app || !polciy) {
            res.status(404);
            res.json({
                data: null,
                err: {
                    message: "No applicaton found with provided app id",
                },
            });
        }
        await utils_1.prisma.application.update({
            where: {
                id: appId,
            },
            data: {
                Policy: {
                    connect: {
                        id: policyId,
                    },
                },
            },
        });
        const r = await (0, request_1.makeRequestMumbai)();
        console.log(r);
        res.status(200);
        res.json({
            data: {
                message: "polciy deployed succesfully",
            },
            err: null,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            data: null,
            err: "INTERNAL SERVER ERRRO",
        });
    }
}
exports.DeployPolicy = DeployPolicy;
//# sourceMappingURL=policy.js.map