import Joi from "joi";
import CommonUtil from "../../common/common.util";
import { Request, Response, NextFunction } from "express";

const registerInputSanitizer = async (req: Request, res: Response, next: NextFunction) => {
    const inputValidationSchema = Joi.object({
        name: Joi.string().required().messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty",
            "string.min": "Name should be at least 3 characters long",
            "string.max": "Name should be at most 50 characters long",
        }),
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

export default { registerInputSanitizer }