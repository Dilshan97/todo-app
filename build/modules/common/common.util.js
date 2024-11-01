"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DataValidationError_1 = __importDefault(require("../../error/error.classes/DataValidationError"));
const InternalServerError_1 = __importDefault(require("../../error/error.classes/InternalServerError"));
const BadRequestError_1 = __importDefault(require("../../error/error.classes/BadRequestError"));
const connectDB = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return mongoose_1.default
        .connect(url, { retryWrites: true, w: "majority" })
        .then(() => {
        console.log("MONGO DB CONNECTION SUCCESSFUL!");
    })
        .catch((err) => {
        console.error(err);
    });
});
/**
 * used for abort early option disabled; when all fields required to be validated
 */
const throwCustomJoiDataValidationError = (errDetails) => {
    const errKeyValuePairs = [];
    for (const errDetail of errDetails) {
        const key = errDetail.path.join(".");
        const message = errDetail.message;
        errKeyValuePairs.push({
            key,
            message,
        });
    }
    throw new DataValidationError_1.default(errKeyValuePairs);
};
/**
 * used for abort early option
 */
const throwCustomJoiError = (errDetails) => {
    const errDetail = errDetails[0];
    if (!errDetail)
        throw new InternalServerError_1.default("No Joi error object!");
    const message = errDetail.message;
    throw new BadRequestError_1.default(message);
};
/**
 * used for on server start functions
 */
const onServerStart = (port) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.default = {
    connectDB,
    throwCustomJoiDataValidationError,
    throwCustomJoiError,
    onServerStart
};
