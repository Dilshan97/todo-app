import UserUtil from "./user.util";
import RedisConfig from "../../config/redis.config";
import NotFoundError from "../../error/error.classes/NotFoundError";
import {IAuthRecord} from "./user.interface";

const createAuthRecord = async (body: IAuthRecord): Promise<void> => {
    const redisClient = await RedisConfig.getInstance();
    const key = UserUtil.getAuthKey(body._id);
    await redisClient.set(key, JSON.stringify(body));
};

const updateAuthRecord = async (body: IAuthRecord) => {
    const redisClient = await RedisConfig.getInstance();
    const key = UserUtil.getAuthKey(body._id);
    const result = await redisClient.get(key);
    if (result) {
        await redisClient.set(key, JSON.stringify(body));
    } else {
        return new NotFoundError("Auth record is not found! Sign in again.");
    }
};

const getAuthRecord = async (authId: string): Promise<IAuthRecord | null> => {
    const redisClient = await RedisConfig.getInstance();
    const key = UserUtil.getAuthKey(authId);
    const result = await redisClient.get(key);
    if (result) {
        return JSON.parse(result) as IAuthRecord;
    }
    return null;
};

const removeAuthRecord = async (authId: string): Promise<void> => {
    const redisClient = await RedisConfig.getInstance();
    const key = UserUtil.getAuthKey(authId);
    await redisClient.del(key);
};

export default {
    getAuthRecord,
    createAuthRecord,
    updateAuthRecord,
    removeAuthRecord,
}