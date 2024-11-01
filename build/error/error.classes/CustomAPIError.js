"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAPIError extends Error {
    constructor(message, data) {
        super(message);
        if (data)
            this.data = data;
        else
            this.data = {};
    }
}
exports.default = CustomAPIError;
