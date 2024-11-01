import UserCacher from "./user.cacher";
import {IUserModel} from "./user.interface";
import UnAuthorizedError from "../../error/error.classes/UnAuthorizedError";
import jwt, {TokenExpiredError} from "jsonwebtoken";

const getAuthKey = (email: string): string => {
    return `todo_app_${email}`;
};

const generateAccessToken = (dbUser: IUserModel) => {
    return jwt.sign(
        {
            _id: dbUser._id.toString(),
            email: dbUser.email
        },
        String(process.env.JWT_SECRET),
        {
            expiresIn: '60m'
        }
    );
};

const validateAndGetTokenPayload = (token: string): string | jwt.JwtPayload => {
    try {
        return jwt.verify(token, String(process.env.JWT_SECRET));
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new UnAuthorizedError("Token is expired!");
        }
        throw new UnAuthorizedError("You're not authorized to access this resource!");
    }
};

const generateAuthSession = async  (dbUser: IUserModel): Promise<string> => {
    const accessToken = generateAccessToken(dbUser);

    const authRecord = await UserCacher.getAuthRecord(dbUser.email);

    if (!authRecord) {
        await UserCacher.createAuthRecord({
            _id: dbUser.email,
            email: dbUser.email,
            accessToken: accessToken,
        });
    } else {
        authRecord.accessToken = accessToken;
        await UserCacher.updateAuthRecord(authRecord);
    }

    return accessToken;
}

export default {
    getAuthKey,
    generateAuthSession,
    validateAndGetTokenPayload
}