"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
const express_1 = __importDefault(require("express"));
const todo_controller_1 = __importDefault(require("./todo.controller"));
const authorizer_1 = __importDefault(require("../user/middleware/authorizer"));
const common_middleware_1 = __importDefault(require("../common/common.middleware"));
//inout sanitization middlewares
const todoCreateInputSanitizer_1 = __importDefault(require("./middleware/todoCreateInputSanitizer"));
const todoUpdateInputSanitizer_1 = __importDefault(require("./middleware/todoUpdateInputSanitizer"));
const todoFetchInputSanitizer_1 = __importDefault(require("./middleware/todoFetchInputSanitizer"));
const router = express_1.default.Router();
router.post("/", authorizer_1.default.authorizer, todoCreateInputSanitizer_1.default.todoCreateInputSanitizer, todo_controller_1.default.createTodo);
router.put("/:id", authorizer_1.default.authorizer, todoUpdateInputSanitizer_1.default.todoUpdateInputSanitizer, todo_controller_1.default.updateTodo);
router.delete("/:id", authorizer_1.default.authorizer, todo_controller_1.default.deleteTodo);
router.get("/", authorizer_1.default.authorizer, common_middleware_1.default.paginate, todoFetchInputSanitizer_1.default.todoFetchInputSanitizer, todo_controller_1.default.getAllTodos);
exports.default = router;
