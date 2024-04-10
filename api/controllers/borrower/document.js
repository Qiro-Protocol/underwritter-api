"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrwerDocuments = exports.addDocument = void 0;
const utils_1 = require("../../utils");
const validate_user_1 = require("../../validators/validate-user");
async function addDocument(req, res) {
    try {
        const { companyId, label, link } = validate_user_1.validateDocument.parse(req.body);
        const dpcument = await utils_1.prisma.document.create({
            data: {
                label,
                companyId,
                link,
                documentType: "AGREEMENTS",
            },
        });
        res.status(200);
        res.json({
            data: {
                message: "Document Added Successfuly`",
                dpcument,
            },
            err: null,
        });
    }
    catch (e) {
        res.status(500);
        res.json({
            data: null,
            err: "INTERNAL SERVER ERROR",
        });
    }
}
exports.addDocument = addDocument;
async function getBorrwerDocuments(req, res) {
    try {
        const companyId = Number(req.params.id);
        console.log(companyId);
        if (companyId) {
            const allDocuments = await utils_1.prisma.document.findMany({
                where: {
                    companyId: companyId,
                },
            });
            if (!allDocuments) {
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
                    data: allDocuments,
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
exports.getBorrwerDocuments = getBorrwerDocuments;
//# sourceMappingURL=document.js.map