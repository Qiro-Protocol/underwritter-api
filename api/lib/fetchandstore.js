"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const utils_1 = require("../utils");
const axios_1 = __importDefault(require("axios"));
async function fetchData(job) {
    const { serviceId, companyId, url } = job;
    try {
        const response = await axios_1.default.get(url);
        const data = response.data;
        await utils_1.prisma.service.update({
            where: {
                id: serviceId,
                companyId: companyId,
            },
            data: {
                extraData: data,
            },
        });
        console.log("DONE");
    }
    catch (error) {
        console.error(`Error processing job ${serviceId}:`, error);
    }
}
exports.fetchData = fetchData;
//# sourceMappingURL=fetchandstore.js.map