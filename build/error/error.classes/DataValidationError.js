"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomAPIError_1 = __importDefault(require("./CustomAPIError"));
const http_status_codes_1 = require("http-status-codes");
class DataValidationError extends CustomAPIError_1.default {
    constructor(keyValuePairs) {
        let validatorKeyValuePairs = {};
        for (const errorPair of keyValuePairs) {
            validatorKeyValuePairs[errorPair.key] = errorPair.message;
        }
        super("Data validation error", validatorKeyValuePairs);
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.default = DataValidationError;
