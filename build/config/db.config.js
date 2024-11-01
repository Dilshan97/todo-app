"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InternalServerError_1 = __importDefault(require("../error/error.classes/InternalServerError"));
const getDBConfig = () => {
    const MONGO_BASE_URL = process.env.MONGO_BASE_URL;
    const MONGO_USERNAME = process.env.MONGO_USERNAME;
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
    const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;
    if (!MONGO_BASE_URL)
        throw new InternalServerError_1.default("Database base URL is not defined!");
    if (!MONGO_USERNAME)
        throw new InternalServerError_1.default("Database username is not defined!");
    if (!MONGO_PASSWORD)
        throw new InternalServerError_1.default("Database password is not defined!");
    if (!MONGO_DATABASE_NAME)
        throw new InternalServerError_1.default("Database name is not defined!");
    // build database url
    // inject user name
    let MONGODB_URL = MONGO_BASE_URL.replace(/\{\{\{username\}\}\}/g, MONGO_USERNAME);
    // inject password
    MONGODB_URL = MONGODB_URL.replace(/\{\{\{password\}\}\}/g, MONGO_PASSWORD);
    // inject database name
    MONGODB_URL = MONGODB_URL.replace(/\{\{\{database_name\}\}\}/g, MONGO_DATABASE_NAME);
    return {
        MONGODB_URL,
    };
};
exports.default = { getDBConfig };
