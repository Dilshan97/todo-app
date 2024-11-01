/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import Todo from "../todo.model";
import mongoose from "mongoose";
import UserService from "../../user/user.service";
import NotFoundError from "../../../error/error.classes/NotFoundError";
import { ITodoCreateSanitizedInputs } from "../todo.interface";

const createTodo = async (
    sanitizedInputs: ITodoCreateSanitizedInputs,
    userId: string | mongoose.Types.ObjectId
) => {

    const dbUser = await UserService.findById(userId);

    if (!dbUser) throw new NotFoundError("User not found!");

    const todo = new Todo({
        ...sanitizedInputs,
        user: dbUser
    });

    await todo.save();

    return todo;
};

export default { createTodo }