"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./main"));
// Only start the server if this file is the main module
if (require.main === module) {
    (0, main_1.default)();
}
