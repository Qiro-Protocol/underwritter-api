"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.regiseterUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../../utils");
const validate_user_1 = require("../../validators/validate-user");
const test_pass = "yesvikash29";
const regiseterUser = async (req, res) => {
    try {
        const { email, firstName, lastName, role } = validate_user_1.validateUser.parse(req.body);
        const hashedpassword = await (0, utils_1.hashPassword)(test_pass);
        if (hashedpassword) {
            const user = await utils_1.prisma.user.create({
                data: {
                    email,
                    password: hashedpassword,
                    firstName,
                    lastName,
                    role,
                },
            });
            if (user) {
                const token = (0, utils_1.createJwtToken)(user.id.toString());
                res.status(200);
                res.json({ token, user });
            }
            else {
                res.status(500);
                res.json("some error");
            }
        }
    }
    catch (e) {
        if (e.code == "P2002") {
            res.status(409);
            res.json("user already exist");
        }
        else {
            res.status(500);
            res.json("internal server erro");
        }
    }
};
exports.regiseterUser = regiseterUser;
const loginUser = async (req, res) => {
    const { email } = validate_user_1.validateEmail.parse(req.body);
    try {
        const user = await utils_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            const isPasswordMatched = await bcrypt_1.default.compare(test_pass, user === null || user === void 0 ? void 0 : user.password);
            if (isPasswordMatched) {
                const token = (0, utils_1.createJwtToken)(user.id.toString());
                res.json({
                    token,
                    user,
                });
            }
            else {
                res.status(403);
                res.json({
                    msg: "incorrect password",
                });
            }
        }
        else {
            res.status(403);
            res.json({
                msg: "incorrect username",
            });
        }
    }
    catch (e) {
        console.log(e.code);
        res.status(500);
        res.json(e);
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map