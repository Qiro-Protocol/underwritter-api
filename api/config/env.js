"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_PORT = exports.REDIS_HOST = void 0;
exports.REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
exports.REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
//# sourceMappingURL=env.js.map