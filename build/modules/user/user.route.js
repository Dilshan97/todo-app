"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const authorizer_1 = __importDefault(require("./middleware/authorizer"));
const loginInputSanitizer_1 = __importDefault(require("./middleware/loginInputSanitizer"));
const registerInputSanitizer_1 = __importDefault(require("./middleware/registerInputSanitizer"));
const router = express_1.default.Router();
router.post("/login", loginInputSanitizer_1.default.loginInputSanitizer, user_controller_1.default.login);
router.post("/register", registerInputSanitizer_1.default.registerInputSanitizer, user_controller_1.default.register);
router.post("/logout", authorizer_1.default.authorizer, user_controller_1.default.logout);
exports.default = router;
