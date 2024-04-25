"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrwerInfo = void 0;
const utils_1 = require("../../utils");
async function getBorrwerInfo(req, res) {
    try {
        const userId = Number(req.body.id);
        const profile = await utils_1.prisma.company.findFirst({
            where: {
                ownerId: userId,
            },
            include: {
                credit: {
                    take: 6,
                },
                documents: {
                    take: 10,
                },
            },
        });
        if (profile) {
            res.status(200);
            res.json({
                data: profile,
                err: null,
            });
        }
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
exports.getBorrwerInfo = getBorrwerInfo;
//# sourceMappingURL=getBorrowerInfo.js.map