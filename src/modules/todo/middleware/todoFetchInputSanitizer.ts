/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Joi from "joi";
import CommonUtil from "../../common/common.util";
import {constants} from "../../constants";
import {ITodoSanitizedResult} from "../todo.interface";
import {NextFunction, Request, Response} from "express";

const todoFetchInputSanitizer = async (req: Request, res: Response, next: NextFunction) => {
    const inputValidationSchema = Joi.object({
        keyword: Joi.string().optional().messages({
            "string.empty": "Keyword is required",
        }),
        status: Joi.string().valid(
            constants.TODO.STATUSES.PENDING,
            constants.TODO.STATUSES.IN_PROGRESS,
            constants.TODO.STATUSES.COMPLETED,
        ).optional().messages({
            "string.pattern.base": "Status must be either pending, in_progress, or completed",
        }),
        sortBy: Joi.string().valid(
            constants.TODO.SORT_BY.PRIORITY_ASC,
            constants.TODO.SORT_BY.PRIORITY_DESC,
            constants.TODO.SORT_BY.DUE_DATE_ASC,
            constants.TODO.SORT_BY.DUE_DATE_DESC,
        ).optional().messages({
            "string.pattern.base": "Sort by must be either priority_asc, priority_desc, due_date_asc, or due_date_desc",
        }),
    });

    const queryPrams = req.query as { [key: string]: string };

    const { error } = inputValidationSchema.validate(queryPrams, {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) CommonUtil.throwCustomJoiDataValidationError(error.details);

    req.body.sanitizedResult = {
        keyword: queryPrams.keyword,
        sortBy: queryPrams.sortBy,
        status: queryPrams.status,
    } as ITodoSanitizedResult;

    next();
};

export default { todoFetchInputSanitizer };