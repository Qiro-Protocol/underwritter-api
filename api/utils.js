"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.createJwtToken = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const hashPassword = async (password, saltRounds = 10) => {
    try {
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        return await bcrypt_1.default.hash(password, salt);
    }
    catch (error) {
        console.log(error);
    }
    return null;
};
exports.hashPassword = hashPassword;
const createJwtToken = (userID) => {
    const privateKey = process.env.JWT_TOKEN_SECRETE;
    if (privateKey) {
        const token = jsonwebtoken_1.default.sign(userID, privateKey);
        return token;
    }
    else {
        return null;
    }
};
exports.createJwtToken = createJwtToken;
exports.prisma = new client_1.PrismaClient();
//# sourceMappingURL=utils.js.map