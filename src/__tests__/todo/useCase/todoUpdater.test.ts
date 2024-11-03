import mongoose from "mongoose";
import TodoUpdater from "../../../modules/todo/useCase/todoUpdater";
import TestDbConfig from "../../../config/test-db.config";
import {StatusCodes} from "http-status-codes";
import {ITodoUpdateSanitizedInputs} from "../../../modules/todo/todo.interface";

describe("TEST: TODO UPDATE TESTCASE", () => {

    beforeAll(async () => {
        await TestDbConfig.connectToMemoryDatabase();
        await TestDbConfig.loadTestDataToMemoryDb();
    });

    afterAll(async () => {
        await TestDbConfig.closeDatabase();
    });

    beforeEach(async () => {
        await TestDbConfig.loadTestDataToMemoryDb();
    });

    afterEach(async () => {
        await TestDbConfig.clearMemoryDatabase();
    });

    test("should update todo", async () => {

        const todoId = new mongoose.Types.ObjectId("60744d9a591d9d11b29894d4");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2");

        const sanitizedInputs: ITodoUpdateSanitizedInputs  = {
            title: "ABC production release",
            description: "this is a sample description for this todo",
            priority: "high",
            dueDate: new Date("2024-11-04"),
            status: "pending"
        };

        const dbTodo = await TodoUpdater.updateTodo(todoId, sanitizedInputs, userId);

        expect(dbTodo.title).toBe("ABC production release");
        expect(dbTodo.description).toBe("this is a sample description for this todo");
        expect(dbTodo.priority).toBe("high");
        expect(dbTodo.dueDate).toEqual(new Date("2024-11-04"));
        expect(dbTodo.status).toBe("pending");
    });

    test("should fail if the todo is not exist", async () => {

        const todoId = new mongoose.Types.ObjectId("60744d9a591d9d11b29894d4");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2");

        const sanitizedInputs: ITodoUpdateSanitizedInputs  = {
            title: "ABC production release",
            description: "this is a sample description for this todo",
            priority: "high",
            dueDate: new Date("2024-11-04"),
            status: "pending"
        };

        try {
            await TodoUpdater.updateTodo(todoId, sanitizedInputs, userId);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
        }
    });

    test("should fail if the user is not authorized to update the todo", async () => {

        const todoId = new mongoose.Types.ObjectId("60744d9a591d9d11b29894d4");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a3"); // non-existing user

        const sanitizedInputs: ITodoUpdateSanitizedInputs  = {
            title: "ABC production release",
            description: "this is a sample description for this todo",
            priority: "high",
            dueDate: new Date("2024-11-04"),
            status: "pending"
        };

        try {
            await TodoUpdater.updateTodo(todoId, sanitizedInputs, userId);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        }
    });
});
