/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import CommonUtil from "../../common/common.util";
import { constants } from "../../constants";

const todoCreateInputSanitizer = async (req: Request, res: Response, next: NextFunction) => {
    const inputValidationSchema = Joi.object({
        title: Joi.string().required().messages({
            "any.required": "Title is required",
            "string.empty": "Title cannot be empty",
        }),
        description: Joi.string().required().messages({
            "any.required": "Description is required",
            "string.empty": "Description cannot be empty",
        }),
        priority: Joi.string().valid(
            constants.TODO.PRIORITIES.LOW,
            constants.TODO.PRIORITIES.MEDIUM,
            constants.TODO.PRIORITIES.HIGH,
        ).required().messages({
            "any.required": "Priority is required",
            "string.pattern.base": "Priority must be either low, medium, or high",
        }),
    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
    });

    if(error) CommonUtil.throwCustomJoiDataValidationError(error.details);

    next();
};

export default { todoCreateInputSanitizer };