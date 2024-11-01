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
/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("./express-ts-formatter");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_status_codes_1 = require("http-status-codes");
const error_middleware_1 = __importDefault(require("./error/error.middleware"));
const NotFoundError_1 = __importDefault(require("./error/error.classes/NotFoundError"));
const db_config_1 = __importDefault(require("./config/db.config"));
//route imports
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const todo_route_1 = __importDefault(require("./modules/todo/todo.route"));
const common_util_1 = __importDefault(require("./modules/common/common.util"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use("/ping", (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "pong" });
});
app.use("/api/user", user_route_1.default);
app.use("/api/todo", todo_route_1.default);
app.use((req, res, next) => {
    throw new NotFoundError_1.default("API Endpoint Not Found!");
});
app.use(error_middleware_1.default.errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConfig = db_config_1.default.getDBConfig();
        yield common_util_1.default.connectDB(dbConfig.MONGODB_URL);
        const port = process.env.SERVER_PORT || 4000;
        app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Server is running at http://localhost:${port}`);
            yield common_util_1.default.onServerStart(port);
        }));
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
start();
