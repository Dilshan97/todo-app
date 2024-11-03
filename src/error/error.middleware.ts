/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import logger from "./logger";
import { StatusCodes } from "http-status-codes";
import InternalServerError from "../error/error.classes/InternalServerError";
import { IStringDictionary } from "../modules/common/common.interface";
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let customError: {
        statusCode: number;
        message: string;
        data: any;
    } = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something Went Wrong!",
        data: err.data || {},
    };

    // if status 500 display set err msg to "Something went wrong"
    if (customError.statusCode == StatusCodes.INTERNAL_SERVER_ERROR)
        customError.message = "Something Went Wrong!";

    // handle custom internal server errors
    if (err instanceof InternalServerError) {
        customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        customError.message = err.message;
    }

    // to handle mongo db validation errors
    if (err.name === "ValidationError") {
        let validatorKeyValuePairs: IStringDictionary = {};
        Object.keys(err.errors).forEach((key) => {
            validatorKeyValuePairs[key] = err.errors[key].message;
        });
        customError.message = "Data Validation Error!";
        customError.data = validatorKeyValuePairs;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // to handle mongo db duplicate value errors
    if (err.code && err.code === 11000) {
        customError.message = `${Object.keys(
            err.keyValue
        )} Already Exists. Please Choose Another Value`;

        customError.statusCode = StatusCodes.CONFLICT;
    }

    // to handle mongo db cast errors
    if (err.name === "CastError") {
        customError.message = `No Item found With ID ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    //logo error in logger
    logger.error(`Error processing request: ${req.method} ${req.url}`, err);

    return res
        .status(customError.statusCode)
        .json({ message: customError.message, data: customError.data });
};

export default { errorHandler };
