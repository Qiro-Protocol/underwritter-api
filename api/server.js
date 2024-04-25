"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
const auth_1 = __importDefault(require("./routes/auth"));
const borrower_1 = require("./routes/borrower");
const verify_1 = require("./middleware/verify");
const service_1 = require("./routes/service");
const underwriter_1 = require("./routes/underwriter");
const subscription_1 = require("./routes/subscription");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.enable("trust proxy");
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/", homeRoute_1.default);
app.use("/auth", auth_1.default);
app.use("/borrower", verify_1.verifyJwt, borrower_1.borrowerRoute);
app.use("/service", verify_1.verifyJwt, service_1.serviceRouter);
app.use("/underwriter", verify_1.verifyJwt, underwriter_1.underwriterRoute);
app.use("/subscriptions", verify_1.verifyJwt, subscription_1.subscriptionRouter);
exports.default = app;
//# sourceMappingURL=server.js.map