import bcrypt from "bcryptjs";
import UserService from "../user.service";
import NotFoundError from "../../../error/error.classes/NotFoundError";
import UnAuthorizedError from "../../../error/error.classes/UnAuthorizedError";
import {IUserLoginSanitizedInputs} from "../user.interface";

const login = async (sanitizedInputs: IUserLoginSanitizedInputs) => {
    const { email, password } = sanitizedInputs as IUserLoginSanitizedInputs;

    const dbUser = await UserService.findByEmail(email);

    if (!dbUser) throw new NotFoundError("User not found!");

    const passwordCompare = await bcrypt.compare(password, dbUser.password);

    if(!passwordCompare) throw new UnAuthorizedError("Invalid credentials!");

    //TODO: generate access token
};

export  default  { login };