/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import TodoService from "../todo.service";
import UserService from "../../user/user.service";
import NotFoundError from "../../../error/error.classes/NotFoundError";
import UnAuthorizedError from "../../../error/error.classes/UnAuthorizedError";
import {ITodoUpdateSanitizedInputs} from "../todo.interface";

const updateTodo = async (
    todoId: string | mongoose.Types.ObjectId,
    sanitizedInputs: ITodoUpdateSanitizedInputs,
    userId: string | mongoose.Types.ObjectId
) => {

    const { title, description, status, priority, dueDate } = sanitizedInputs as ITodoUpdateSanitizedInputs;

    const dbUser = await UserService.findById(userId);

    if (!dbUser) throw new NotFoundError("User not found!");

    const dbTodo = await TodoService.findById(todoId);

    if (!dbTodo) throw new NotFoundError("Todo not found!");

    if (dbUser._id.toString() !== dbTodo.user.toString()) throw new UnAuthorizedError("You're not authorized to access this resource!");

    dbTodo.title = title;
    dbTodo.description = description;
    dbTodo.status = status;
    dbTodo.priority = priority;
    dbTodo.dueDate = dueDate;

    await dbTodo.save();

    return dbTodo;
};

export default { updateTodo }