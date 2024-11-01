
/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { Request, Response } from "express";
import {IAuthRecord, IUserLoginSanitizedInputs, IUserRegisterSanitizedInputs} from "./user.interface";
import {StatusCodes} from "http-status-codes";

//use cases
import UserRegister from "./useCase/userRegister";
import Authenticate from "./useCase/authenticate";

const login = async (req: Request, res: Response) => {
    const sanitizedInputs = req.body as IUserLoginSanitizedInputs;

    const accessToken = await Authenticate.login(sanitizedInputs);

    return res.status(StatusCodes.OK).json({
        message: "User logged in successfully!",
        payload: accessToken
    });
};

const register = async (req: Request, res: Response) => {
    const sanitizedInputs = req.body as IUserRegisterSanitizedInputs;

    const user = await UserRegister.registerUser(sanitizedInputs);

    return res.status(StatusCodes.CREATED).json({
        message: "User successfully registered!",
        payload: user
    });
};

const logout = async (req: Request, res: Response) => {
    const auth = req.auth as IAuthRecord;

    await Authenticate.logout(auth);

    return res.status(StatusCodes.OK).json({
        message: "Logout Successful!",
    });
}

export default  {
    login,
    register,
    logout
}