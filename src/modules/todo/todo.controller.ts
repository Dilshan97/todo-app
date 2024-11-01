/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import {IAuth} from "../user/user.interface";
import {StatusCodes} from "http-status-codes";
import { Request, Response } from "express";
import {ITodoCreateSanitizedInputs, ITodoUpdateSanitizedInputs} from "./todo.interface";

//use cases
import TodoGetter from "./useCase/todoGetter";
import TodoRemover from "./useCase/todoRemover";
import TodoUpdater from "./useCase/todoUpdater";
import TodoCreator from "./useCase/todoCreator";

const createTodo = async (req: Request, res: Response) => {
    const auth = req.auth as IAuth;
    const sanitizedInputs = req.body as ITodoCreateSanitizedInputs;

    const todo = await TodoCreator.createTodo(sanitizedInputs, auth._id);

    return res.status(StatusCodes.CREATED).json({
        message: "Todo successfully created!",
        payload: todo
    });
};

const updateTodo = async (req: Request, res: Response) => {
    const auth = req.auth as IAuth;
    const { id } = req.params;
    const sanitizedInputs = req.body as ITodoUpdateSanitizedInputs;

    const dbTodo = await TodoUpdater.updateTodo(id, sanitizedInputs);

    return res.status(StatusCodes.OK).json({
        message: "Todo successfully updated!",
        payload: dbTodo
    });
};

const deleteTodo = async (req: Request, res: Response) => {
    const auth = req.auth as IAuth;
    const { id } = req.params;

    await TodoRemover.removeTodo(id);

    return res.status(StatusCodes.NO_CONTENT).json({
        message: "Todo successfully deleted!"
    });
};

const getAllTodos = async (req: Request, res: Response) => {
    const auth = req.auth as IAuth;

    const dbTodos = await TodoGetter.getPaginatedTodos(auth._id);

    return res.status(StatusCodes.OK).json({
        message: "Todos successfully fetched!",
        payload: dbTodos
    });
};

export default {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}