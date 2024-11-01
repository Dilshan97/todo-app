/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import {model, Schema} from "mongoose";
import {ITodoModel} from "./todo.interface";
import { constants } from "../constants";

const TodoSchema: Schema<ITodoModel> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: constants.MODELS.USER,
        required: [true, "User is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: 10,
        maxlength: 500
    },
    priority: {
        type: String,
        required: [true, "Priority is required"],
        enum: {
            values: Object.values(constants.TODO.PRIORITIES),
            message: "{VALUE} is not a valid priority"
        }
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: Object.values(constants.TODO.STATUSES),
            message: "{VALUE} is not a valid status"
        }
    }
}, { versionKey: false, timestamps: true });

export default model<ITodoModel>("Todo", TodoSchema);