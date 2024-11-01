/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import CommonUtil from "../../common/common.util";
import {constants} from "../../constants";
import { Request, Response, NextFunction } from "express";

const todoUpdateInputSanitizer = async (req: Request, res: Response, next: NextFunction) => {
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
        status: Joi.string().valid(
            constants.TODO.STATUSES.PENDING,
            constants.TODO.STATUSES.IN_PROGRESS,
            constants.TODO.STATUSES.COMPLETED,
        ).required().messages({
            "any.required": "Status is required",
            "string.pattern.base": "Status must be either pending, in progress, or completed",
        })
    });

    const { error } = inputValidationSchema.validate(req.body, {
        abortEarly: false,
    });

    if(error) CommonUtil.throwCustomJoiDataValidationError(error.details);

    next();
};

export default { todoUpdateInputSanitizer };