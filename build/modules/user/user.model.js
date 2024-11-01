"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const UserSchema = new mongoose_1.Schema({
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
            validator: function (v) {
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
        // select: false
    }
}, { versionKey: false, timestamps: true });
exports.default = (0, mongoose_1.model)(constants_1.constants.MODELS.USER, UserSchema);
