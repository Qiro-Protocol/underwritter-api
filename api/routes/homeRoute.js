"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_1 = require("../middleware/verify");
const user_1 = require("../controllers/user/user");
const router = (0, express_1.Router)();
router.get("/", verify_1.verifyJwt, user_1.getUser);
exports.default = router;
//# sourceMappingURL=homeRoute.js.map