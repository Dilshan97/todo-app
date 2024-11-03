/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import "express-async-errors";
import "./express-ts-formatter";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import { rateLimit } from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes';
import ErrorMiddleware from "./error/error.middleware";
import NotFoundError from "./error/error.classes/NotFoundError";
import Config from "./config/db.config";

//route imports
import UserRoutes from "./modules/user/user.route";
import TodoRoutes from "./modules/todo/todo.route";
import CommonUtil from "./modules/common/common.util";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 500, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again after 10 minutes!',
    })
);

app.use("/ping", (req, res, next) => {
    res.status(StatusCodes.OK).json({ message: "pong" });
});

app.use("/api/user", UserRoutes);
app.use("/api/todo", TodoRoutes);

app.use((req, res, next) => {
    throw new NotFoundError("API Endpoint Not Found!");
});

app.use(ErrorMiddleware.errorHandler);

const start = async () => {
    try {
        const dbConfig = Config.getDBConfig();

        await CommonUtil.connectDB(dbConfig.MONGODB_URL);

        const port = process.env.SERVER_PORT || 4000;

        app.listen(port, async () => {
            console.log(`Server is running at http://localhost:${port}`);
            await CommonUtil.onServerStart(port);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();