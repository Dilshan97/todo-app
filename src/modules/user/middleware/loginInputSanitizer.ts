/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import CommonUtil from "../../common/common.util";
import { Request, Response, NextFunction } from "express";

const loginInputSanitizer = async (req: Request, res: Response, next: NextFunction) => {
    const inputValidationSchema = Joi.object({
        email: Joi.string().email().required().messages({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email": "Invalid email format",
        }),
        password: Joi.string().required().messages({
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
        }),
    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
    });

    if (error) CommonUtil.throwCustomJoiDataValidationError(error.details);

    next();
};

export default { loginInputSanitizer }