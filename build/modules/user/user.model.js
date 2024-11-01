"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
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
        required: true,
        minlength: 8,
        select: false
    }
}, { versionKey: false, timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
