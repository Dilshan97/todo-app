import bcrypt from "bcryptjs";
import UserUtil from "../user.util";
import UserCacher from "../user.cacher";
import UserService from "../user.service";
import NotFoundError from "../../../error/error.classes/NotFoundError";
import UnAuthorizedError from "../../../error/error.classes/UnAuthorizedError";
import {IAuthRecord, IUserLoginSanitizedInputs} from "../user.interface";

const login = async (sanitizedInputs: IUserLoginSanitizedInputs):  Promise<string> => {
    const { email, password } = sanitizedInputs as IUserLoginSanitizedInputs;

    const dbUser = await UserService.findByEmail(email);

    if (!dbUser) throw new NotFoundError("User not found!");

    const passwordCompare = await bcrypt.compare(password, dbUser.password);

    if(!passwordCompare) throw new UnAuthorizedError("Invalid credentials!");

    return UserUtil.generateAuthSession(dbUser);
};

const logout = async(auth: IAuthRecord): Promise<void> => {
    const authRecord = await UserCacher.getAuthRecord(auth._id);

    if (!authRecord)
        throw new UnAuthorizedError("Auth session is not found! Sign in again.");

    await UserCacher.removeAuthRecord(authRecord._id);

    return;
};

export  default  { login, logout };