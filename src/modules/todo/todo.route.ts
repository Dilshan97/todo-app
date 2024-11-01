/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import TodoController from "./todo.controller";
import AuthMiddleware from "../user/middleware/authorizer";
import CommonMiddleware from "../common/common.middleware";
import TodoCreateInputSanitizer from "./middleware/todoCreateInputSanitizer";
import TodoUpdateInputSanitizer from "./middleware/todoUpdateInputSanitizer";

const router = express.Router();

router.post(
    "/",
    AuthMiddleware.authorizer,
    TodoCreateInputSanitizer.todoCreateInputSanitizer,
    TodoController.createTodo
);

router.put(
    "/:id",
    AuthMiddleware.authorizer,
    TodoUpdateInputSanitizer.todoUpdateInputSanitizer,
    TodoController.updateTodo
);

router.delete(
    "/:id",
    AuthMiddleware.authorizer,
    TodoController.deleteTodo
);

router.get(
    "/",
    AuthMiddleware.authorizer,
    CommonMiddleware.paginate,
    TodoController.getAllTodos
);

export default router;