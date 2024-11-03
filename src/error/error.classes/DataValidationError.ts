/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";
import {IStringDictionary} from "../../modules/common/common.interface";

export type TKeyValuePair = Array<{ key: string; message: string | number }>;

class DataValidationError extends CustomAPIError {
    statusCode: number;
    constructor(keyValuePairs: TKeyValuePair) {
        let validatorKeyValuePairs: IStringDictionary = {};
        for (const errorPair of keyValuePairs) {
            validatorKeyValuePairs[errorPair.key] = errorPair.message;
        }

        super("Data validation error", validatorKeyValuePairs);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default DataValidationError;
