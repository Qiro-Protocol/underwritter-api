"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrwerCreditDetails = exports.AddCreditInformaion = void 0;
const utils_1 = require("../../utils");
const validate_credit_info_1 = require("../../validators/validate-credit-info");
const AddCreditInformaion = async (req, res) => {
    try {
        const { companyId, data } = validate_credit_info_1.validateCreditInfo.parse(req.body);
        const comp = await utils_1.prisma.company.update({
            where: {
                id: Number(companyId),
            },
            data: {
                credit: {
                    createMany: {
                        data: data,
                    },
                },
            },
        });
        res.status(201);
        res.json({
            data: comp,
            err: null,
        });
    }
    catch (e) {
        res.status(500);
        res.json({
            data: null,
            err: e,
        });
    }
};
exports.AddCreditInformaion = AddCreditInformaion;
async function getBorrwerCreditDetails(req, res) {
    try {
        const companyId = Number(req.params.id);
        console.log(companyId);
        if (companyId) {
            const creditDetails = await utils_1.prisma.record.findMany({
                where: {
                    companyId: companyId,
                },
            });
            console.log(creditDetails);
            if (!creditDetails) {
                res.status(404);
                res.json({
                    data: null,
                    err: {
                        message: "Not able to find any borrwer with prvided id",
                    },
                });
            }
            else {
                res.status(200);
                res.json({
                    data: creditDetails,
                    err: null,
                });
            }
        }
        else {
            res.status(400);
            res.json({
                data: null,
                err: {
                    message: "NO company Id Provided",
                },
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            data: null,
            err: {
                message: "INTERNAL SERVER ERROR",
            },
        });
    }
}
exports.getBorrwerCreditDetails = getBorrwerCreditDetails;
//# sourceMappingURL=creidt.js.map