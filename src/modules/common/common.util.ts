import Joi from "joi";
import mongoose from "mongoose";
import DataValidationError, {TKeyValuePair} from "../../error/error.classes/DataValidationError";
import InternalServerError from "../../error/error.classes/InternalServerError";
import BadRequestError from "../../error/error.classes/BadRequestError";

const connectDB = async (url: string) => {
    return mongoose
        .connect(url, { retryWrites: true, w: "majority" })
        .then(() => {
            console.log("MONGO DB CONNECTION SUCCESSFUL!");
        })
        .catch((err) => {
            console.error(err);
        });
};

/**
 * used for abort early option disabled; when all fields required to be validated
 */
const throwCustomJoiDataValidationError = (errDetails: Array<Joi.ValidationErrorItem>) => {
    const errKeyValuePairs: TKeyValuePair = [];
    for (const errDetail of errDetails) {
        const key = errDetail.path.join(".");
        const message = errDetail.message;

        errKeyValuePairs.push({
            key,
            message,
        });
    }

    throw new DataValidationError(errKeyValuePairs);
};

/**
 * used for abort early option
 */
const throwCustomJoiError = (errDetails: Array<Joi.ValidationErrorItem>) => {
    const errDetail = errDetails[0];
    if (!errDetail) throw new InternalServerError("No Joi error object!");

    const message = errDetail.message;

    throw new BadRequestError(message);
};

/**
 * used for on server start functions
 */
const onServerStart = async (port?: number | string) => {

};

export default {
    connectDB,
    throwCustomJoiDataValidationError,
    throwCustomJoiError,
    onServerStart
};
