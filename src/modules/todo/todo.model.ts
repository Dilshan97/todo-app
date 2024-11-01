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
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: (value: Date) => value >= new Date(),
        message: "Due date must be a future date"
      }
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: Object.values(constants.TODO.STATUSES),
            message: "{VALUE} is not a valid status"
        },
        default: constants.TODO.STATUSES.PENDING
    }
}, { versionKey: false, timestamps: true });

export default model<ITodoModel>("Todo", TodoSchema);