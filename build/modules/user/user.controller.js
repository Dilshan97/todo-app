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
const userRegister_1 = __importDefault(require("./useCase/userRegister"));
const authenticate_1 = __importDefault(require("./useCase/authenticate"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedInputs = req.body;
    const accessToken = yield authenticate_1.default.login(sanitizedInputs);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "User logged in successfully!",
        payload: accessToken
    });
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedInputs = req.body;
    const user = yield userRegister_1.default.registerUser(sanitizedInputs);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: "User successfully registered!",
        payload: user
    });
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    yield authenticate_1.default.logout(auth);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Logout Successful!",
    });
});
exports.default = {
    login,
    register,
    logout
};
