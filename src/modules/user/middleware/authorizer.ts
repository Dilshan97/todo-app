
import {IAuth} from "../user.interface";
import UserUtil from "../user.util";
import UserCacher from "../user.cacher";
import UnAuthorizedError from "../../../error/error.classes/UnAuthorizedError";
import { Request, Response, NextFunction } from "express";

const authorizer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnAuthorizedError("You're not authorized to access this resource!");
    }

    const accessToken = authHeader.split(" ")[1];

    const tokenPayload = UserUtil.validateAndGetTokenPayload(
        accessToken
    ) as IAuth;

    const authRecord = await UserCacher.getAuthRecord(tokenPayload.email.toString());

    if(!authRecord) {
        throw new UnAuthorizedError("You're not authorized to access this resource!");
    }

    if (accessToken !== authRecord.accessToken) {
        throw new UnAuthorizedError('User session is invalid!');
    }

    req.auth = authRecord;

    next();
};

export default { authorizer };