"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __importDefault(require("bull"));
const name = "JOBS";
const jobQueue = new bull_1.default(name, "redis://127.0.0.1:6379");
exports.default = jobQueue;
//# sourceMappingURL=queue.js.map