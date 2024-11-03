/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class InternalServerError extends CustomAPIError {
    statusCode: number;
    constructor(message: string, data?: {}) {
        super(message, data);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

export default InternalServerError;
