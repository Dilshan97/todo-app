/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import TodoService from "../todo.service";
import NotFoundError from "../../../error/error.classes/NotFoundError";
import mongoose from "mongoose";

const removeTodo = async (
    todoId: string | mongoose.Types.ObjectId
) => {

    const dbTodo = await TodoService.findById(todoId);

    if (!dbTodo) throw new NotFoundError("Todo not found!");

    await dbTodo.deleteOne();

    return;
};

export default { removeTodo }