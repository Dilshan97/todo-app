/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class TooManyRequestsError extends CustomAPIError {
    statusCode: number;
    constructor(message: string, data?: {}) {
        super(message, data);
        this.statusCode = StatusCodes.TOO_MANY_REQUESTS;
    }
}

export default TooManyRequestsError;