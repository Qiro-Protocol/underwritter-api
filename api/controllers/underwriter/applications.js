"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationsStats = exports.getAllApplications = void 0;
const utils_1 = require("../../utils");
async function getAllApplications(_, res) {
    try {
        const allapplications = await utils_1.prisma.application.findMany();
        res.status(200);
        res.json({
            data: allapplications,
            err: null,
        });
    }
    catch (e) {
        res.status(200);
        res.json({
            data: null,
            err: "INTERNAL SERVER ErROR",
        });
    }
}
exports.getAllApplications = getAllApplications;
const UnderwrittenApplicationStats = [
    { label: "Application", data: "20" },
    { label: "In-review", data: "10 applications" },
    {
        label: "Approved",
        data: "2 applications",
    },
    {
        label: "Funded",
        data: "$20k",
    },
];
async function getApplicationsStats(_, res) {
    try {
        res.status(200);
        res.json({
            data: UnderwrittenApplicationStats,
            err: null,
        });
    }
    catch (e) {
        res.status(500);
        res.json({
            data: null,
            err: "INTERNAL SERVER ERRRO",
        });
    }
}
exports.getApplicationsStats = getApplicationsStats;
//# sourceMappingURL=applications.js.map