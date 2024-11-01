"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomAPIError_1 = __importDefault(require("./CustomAPIError"));
const http_status_codes_1 = require("http-status-codes");
class ConflictError extends CustomAPIError_1.default {
    constructor(message, data) {
        super(message, data);
        this.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
    }
}
exports.default = ConflictError;
