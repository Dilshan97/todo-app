"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = __importDefault(require("./todo.controller"));
const router = express_1.default.Router();
router.post('/', todo_controller_1.default.createTodo);
router.put('/:id', todo_controller_1.default.updateTodo);
router.delete('/:id', todo_controller_1.default.deleteTodo);
router.get('/', todo_controller_1.default.getAllTodos);
exports.default = router;
