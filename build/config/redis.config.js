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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
const redis_1 = require("redis");
class RedisConnection {
    constructor() { }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            let url = process.env.REDIS_URL;
            RedisConnection._instance = (0, redis_1.createClient)({ url });
            yield RedisConnection._instance
                .on("connect", () => {
                console.log("CLIENT CONNECTED TO REDIS");
            })
                .on("ready", () => {
                console.log("REDIS CLIENT READY TO BE USED");
            })
                .on("error", (err) => {
                console.log("ERROR : " + err.message);
            })
                .on("end", () => {
                console.log("CLIENT DISCONNECTED FROM REDIS");
            })
                .on("SIGINT", () => {
                var _a;
                (_a = RedisConnection._instance) === null || _a === void 0 ? void 0 : _a.quit();
            })
                .connect();
        });
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._instance) {
                const client = new RedisConnection();
                yield client.initialize();
            }
            return this._instance;
        });
    }
    static destroyInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._instance)
                return;
            yield this._instance.disconnect();
            this._instance = null;
        });
    }
}
RedisConnection._instance = null;
exports.default = RedisConnection;
