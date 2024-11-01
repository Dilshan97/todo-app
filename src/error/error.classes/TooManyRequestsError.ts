/*
 *   Copyright (c) 2023
 *   All rights reserved.
 *   Nova Solutions (Pvt) Ltd. All rights reserved.
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