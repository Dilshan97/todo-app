"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
//use cases
const todoGetter_1 = __importDefault(require("./useCase/todoGetter"));
const todoRemover_1 = __importDefault(require("./useCase/todoRemover"));
const todoUpdater_1 = __importDefault(require("./useCase/todoUpdater"));
const todoCreator_1 = __importDefault(require("./useCase/todoCreator"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const sanitizedInputs = req.body;
    const todo = yield todoCreator_1.default.createTodo(sanitizedInputs, auth._id);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: "Todo successfully created!",
        payload: todo
    });
});
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const { id } = req.params;
    const sanitizedInputs = req.body;
    const dbTodo = yield todoUpdater_1.default.updateTodo(id, sanitizedInputs, auth._id);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Todo successfully updated!",
        payload: dbTodo
    });
});
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const { id } = req.params;
    yield todoRemover_1.default.removeTodo(id, auth._id);
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
        message: "Todo successfully deleted!"
    });
});
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const pagination = req.pageable;
    const sanitizedResult = req.body.sanitizedResult;
    const dbTodos = yield todoGetter_1.default.getPaginatedTodos(auth._id, pagination, sanitizedResult);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Todos successfully fetched!",
        payload: dbTodos
    });
});
exports.default = {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
};
