
import mongoose, { Document } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IUserModel extends  IUser, Document {}

interface IAuth {
    _id: string | mongoose.Types.ObjectId;
    email: string;
};

interface IUserRegisterSanitizedInputs {
    name: string;
    email: string;
    password: string;
}

interface IUserLoginSanitizedInputs {
    email: string;
    password: string;
}

export {
    IAuth,
    IUser,
    IUserModel,
    IUserRegisterSanitizedInputs,
    IUserLoginSanitizedInputs,
}