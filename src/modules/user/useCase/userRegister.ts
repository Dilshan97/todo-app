/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import User from "../user.model";
import bcrypt from "bcryptjs";
import UserService from "../user.service";
import ForbiddenError from "../../../error/error.classes/ForbiddenError";
import {IUserRegisterSanitizedInputs} from "../user.interface";

const registerUser = async (
    sanitizedInputs: IUserRegisterSanitizedInputs
) => {

    const { name, email, password } = sanitizedInputs as IUserRegisterSanitizedInputs;

    const dbUser = await UserService.findByEmail(email);

    if(dbUser) throw new ForbiddenError("User already exists!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();

    return user;
};

export  default  { registerUser };