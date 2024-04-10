"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = 8000;
server_1.default.listen(port, () => {
    console.log("Server is running on port : ", port);
});
//# sourceMappingURL=index.js.map