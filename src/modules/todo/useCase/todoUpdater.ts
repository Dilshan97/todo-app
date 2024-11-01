/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import TodoService from "../todo.service";
import NotFoundError from "../../../error/error.classes/NotFoundError";
import {ITodoUpdateSanitizedInputs} from "../todo.interface";

const updateTodo = async (
    todoId: string | mongoose.Types.ObjectId,
    sanitizedInputs: ITodoUpdateSanitizedInputs
) => {

    const { title, description, status, priority } = sanitizedInputs as ITodoUpdateSanitizedInputs;

    const dbTodo = await TodoService.findById(todoId);

    if (!dbTodo) throw new NotFoundError("Todo not found!");

    dbTodo.title = title;
    dbTodo.description = description;
    dbTodo.status = status;
    dbTodo.priority = priority;

    await dbTodo.save();

    return dbTodo;
};

export default { updateTodo }