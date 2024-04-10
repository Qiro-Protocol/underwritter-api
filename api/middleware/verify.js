"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    const token = req.cookies.token;
    const privateKey = process.env.JWT_TOKEN_SECRETE;
    if (token && privateKey) {
        try {
            const userid = jsonwebtoken_1.default.verify(token, privateKey);
            if (userid) {
                req.body.id = userid.toString();
                next();
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        res.status(403);
        res.json({
            error: "no token",
        });
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=verify.js.map