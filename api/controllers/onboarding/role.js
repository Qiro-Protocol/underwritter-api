"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRole = void 0;
const utils_1 = require("../../utils");
const AddRole = async (req, res) => {
    try {
        const userId = req.body.id;
        const { role } = req.body;
        const user = await utils_1.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role: role,
            },
        });
        if (!user) {
            res.status(404);
            res.json({
                data: null,
                err: {
                    message: "User Not found",
                },
            });
        }
        res.status(201);
        res.json({
            data: {
                message: "Added ROLE",
            },
            err: null,
        });
    }
    catch (e) {
        res.status(200);
        res.json({
            data: null,
            err: e,
        });
    }
};
exports.AddRole = AddRole;
//# sourceMappingURL=role.js.map