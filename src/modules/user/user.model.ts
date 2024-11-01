import {model, Schema} from "mongoose";
import {IUserModel} from "./user.interface";
import { constants } from "../constants";

const UserSchema: Schema<IUserModel> = new Schema<IUserModel>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v: string) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(v);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false
    }
}, { versionKey: false, timestamps: true });

export default model<IUserModel>(constants.MODELS.USER, UserSchema);