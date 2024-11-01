"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
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
            values: ["low", "medium", "high"],
            message: "{VALUE} is not a valid priority"
        }
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: ["pending", "in progress", "completed"],
            message: "{VALUE} is not a valid status"
        }
    }
}, { versionKey: false, timestamps: true });
exports.default = (0, mongoose_1.model)("Todo", TodoSchema);
