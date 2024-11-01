"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const InternalServerError_1 = __importDefault(require("../error/error.classes/InternalServerError"));
const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something Went Wrong!",
        data: err.data || {},
    };
    console.log(err);
    // if status 500 display set err msg to "Something went wrong"
    if (customError.statusCode == http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        customError.message = "Something Went Wrong!";
    // handle custom internal server errors
    if (err instanceof InternalServerError_1.default) {
        customError.statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        customError.message = err.message;
    }
    // to handle mongo db validation errors
    if (err.name === "ValidationError") {
        let validatorKeyValuePairs = {};
        Object.keys(err.errors).forEach((key) => {
            validatorKeyValuePairs[key] = err.errors[key].message;
        });
        customError.message = "Data Validation Error!";
        customError.data = validatorKeyValuePairs;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // to handle mongo db duplicate value errors
    if (err.code && err.code === 11000) {
        customError.message = `${Object.keys(err.keyValue)} Already Exists. Please Choose Another Value`;
        customError.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
    }
    // to handle mongo db cast errors
    if (err.name === "CastError") {
        customError.message = `No Item found With ID ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return res
        .status(customError.statusCode)
        .json({ message: customError.message, data: customError.data });
};
exports.default = { errorHandler };
