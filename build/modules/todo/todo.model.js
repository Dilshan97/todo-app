"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const TodoSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: constants_1.constants.MODELS.USER,
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
            values: Object.values(constants_1.constants.TODO.PRIORITIES),
            message: "{VALUE} is not a valid priority"
        }
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: Object.values(constants_1.constants.TODO.STATUSES),
            message: "{VALUE} is not a valid status"
        }
    }
}, { versionKey: false, timestamps: true });
exports.default = (0, mongoose_1.model)("Todo", TodoSchema);
