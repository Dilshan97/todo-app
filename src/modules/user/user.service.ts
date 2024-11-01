/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import User from "./user.model";
import mongoose from "mongoose";

const findByEmail = (email: string) => {
    return User.findOne({ email });
};

const findById = (id: string | mongoose.Types.ObjectId) => {
    return User.findById(id);
};

export default {
    findByEmail,
    findById
}