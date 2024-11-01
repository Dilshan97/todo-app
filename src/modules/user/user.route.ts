/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from "express";
import UserController from "./user.controller";
import AuthMiddleware from "./middleware/authorizer";
import LoginInputSanitizer from "./middleware/loginInputSanitizer";
import RegisterInputSanitizer from "./middleware/registerInputSanitizer";

const router = express.Router();

router.post(
    "/login",
    LoginInputSanitizer.loginInputSanitizer,
    UserController.login
);

router.post(
    "/register",
    RegisterInputSanitizer.registerInputSanitizer,
    UserController.register
);

router.post(
    "/logout",
    AuthMiddleware.authorizer,
    UserController.logout
);

export default router;