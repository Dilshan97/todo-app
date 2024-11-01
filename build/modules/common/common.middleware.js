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
const BadRequestError_1 = __importDefault(require("../../error/error.classes/BadRequestError"));
const paginate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let page = req.query.page || 1;
    let limit = req.query.limit || 8;
    let orderBy = req.query.orderBy || "desc";
    page = parseInt(page);
    if (!page)
        throw new BadRequestError_1.default("Page number should be a number!");
    limit = parseInt(limit);
    if (!limit)
        throw new BadRequestError_1.default("Page limit should be a number!");
    if (orderBy != "asc" && orderBy != "desc") {
        throw new BadRequestError_1.default('Sorting order should be "asc" or "desc!"');
    }
    req.pageable = { page, limit, orderBy };
    next();
});
exports.default = { paginate };
