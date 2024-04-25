"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    var _a, _b;
    console.log("request is coming");
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
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