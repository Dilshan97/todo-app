/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose from "mongoose";
import TodoService from "../todo.service";
import {IPagination} from "../../common/common.interface";
import {ITodoSanitizedResult} from "../todo.interface";

const getPaginatedTodos = async (
    userId: string | mongoose.Types.ObjectId,
    pagination: IPagination,
    sanitizedResult: ITodoSanitizedResult
) => {
    return await TodoService.getPaginatedTodos(pagination, userId, sanitizedResult);
};

export default { getPaginatedTodos };