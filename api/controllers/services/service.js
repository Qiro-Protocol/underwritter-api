"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveService = exports.getConnectedServicesByCompanyId = exports.connectService = exports.getAllServices = exports.createService = void 0;
const fetchandstore_1 = require("../../lib/fetchandstore");
const queue_1 = __importDefault(require("../../lib/queue"));
const utils_1 = require("../../utils");
const validate_service_1 = require("../../validators/validate-service");
async function createService(req, res) {
    try {
        const { id, name, description, dataType } = validate_service_1.validateService.parse(req.body);
        const serviceRes = await utils_1.prisma.service.create({
            data: {
                name,
                description,
                dataType: dataType !== null && dataType !== void 0 ? dataType : "UNKOWN",
                user: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });
        res.status(200);
        res.json({
            data: serviceRes,
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
exports.createService = createService;
async function getAllServices(_, res) {
    try {
        const allServices = await utils_1.prisma.service.findMany({
            include: {
                company: true,
                user: true,
            },
        });
        res.status(200);
        res.json({
            data: allServices,
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
exports.getAllServices = getAllServices;
async function connectService(req, res) {
    try {
        const { companyId, serviceId } = validate_service_1.validateConnectService.parse(req.body);
        const connectedSerciesData = await utils_1.prisma.company.update({
            where: {
                id: companyId,
            },
            data: {
                services: {
                    connect: {
                        id: serviceId,
                    },
                },
            },
        });
        if (!connectedSerciesData) {
            res.status(404);
            res.json({
                data: null,
                err: {
                    message: "NO SERVICE WITH THAT ID OR NO COMPANY WITH THAT COMPANY ID",
                },
            });
        }
        else {
            queue_1.default.process(function (job) {
                return (0, fetchandstore_1.fetchData)({
                    companyId,
                    serviceId,
                    url: job.data.url,
                });
            });
            queue_1.default
                .add({
                id: serviceId,
                companyId,
                serviceId,
                url: "https://jsonplaceholder.typicode.com/posts",
            })
                .then(() => {
                res.status(200);
                res.json({
                    data: connectedSerciesData,
                    err: null,
                });
            })
                .catch((e) => {
                console.log(e);
                res.status(500);
                res.json("ERROR WITH QUEUE");
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
exports.connectService = connectService;
async function getConnectedServicesByCompanyId(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            res.json({
                data: null,
                err: {
                    message: "ID NOT PROVIDED",
                },
            });
        }
        const services = await utils_1.prisma.service.findMany({
            where: {
                companyId: Number(id),
            },
        });
        res.status(200);
        res.json({
            data: services,
            err: null,
        });
    }
    catch (e) {
        res.status(200);
        res.json({
            data: null,
            err: "INTERNAL SERVER ERROR",
        });
    }
}
exports.getConnectedServicesByCompanyId = getConnectedServicesByCompanyId;
async function RemoveService(req, res) {
    try {
        const { companyId, serviceId } = validate_service_1.validateConnectService.parse(req.body);
        const resDelete = await utils_1.prisma.company.update({
            where: {
                id: companyId,
            },
            data: {
                services: {
                    disconnect: {
                        id: serviceId,
                    },
                },
            },
        });
        res.status(200);
        res.json({
            data: resDelete,
            err: null,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            data: null,
            err: "internal server erro",
        });
    }
}
exports.RemoveService = RemoveService;
//# sourceMappingURL=service.js.map