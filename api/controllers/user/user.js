"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const utils_1 = require("../../utils");
async function getUser(req, res) {
    try {
        const userId = Number(req.body.id);
        const user = await utils_1.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        res.status(200);
        res.json({
            data: user,
            err: null,
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            data: null,
            err: {
                message: "Internal Server Erro",
                status: 500,
            },
        });
    }
}
exports.getUser = getUser;
//# sourceMappingURL=user.js.map