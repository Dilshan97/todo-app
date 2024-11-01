/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import TodoService from "../todo.service";
import UserService from "../../user/user.service";
import NotFoundError from "../../../error/error.classes/NotFoundError";
import UnAuthorizedError from "../../../error/error.classes/UnAuthorizedError";

const removeTodo = async (
    todoId: string | mongoose.Types.ObjectId,
    userId: string | mongoose.Types.ObjectId
) => {

    const dbUser = await UserService.findById(userId);

    if (!dbUser) throw new NotFoundError("User not found!");

    const dbTodo = await TodoService.findById(todoId);

    if (!dbTodo) throw new NotFoundError("Todo not found!");

    if (dbUser._id.toString() !== dbTodo.user.toString()) throw new UnAuthorizedError("You're not authorized to access this resource!");

    await dbTodo.deleteOne();

    return;
};

export default { removeTodo }