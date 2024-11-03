import mongoose from "mongoose";
import TodoUpdater from "../../../modules/todo/useCase/todoUpdater";
import TestDbConfig from "../../../config/test-db.config";
import {StatusCodes} from "http-status-codes";
import {ITodoUpdateSanitizedInputs} from "../../../modules/todo/todo.interface";

jest.setTimeout(30000);//increase the default timeout 5000 to 300000

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

        const todoId = new mongoose.Types.ObjectId("671ca295d8307616b9e777a1");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2");

        const sanitizedInputs: ITodoUpdateSanitizedInputs  = {
            title: "Task 1 release",
            description: "This is the description for Task 1.",
            priority: "medium",
            dueDate: new Date("2025-11-04"),
            status: "pending"
        };

        const dbTodo = await TodoUpdater.updateTodo(todoId, sanitizedInputs, userId);

        expect(dbTodo.title).toBe(sanitizedInputs.title);
        expect(dbTodo.description).toBe(sanitizedInputs.description);
        expect(dbTodo.priority).toBe(sanitizedInputs.priority);
        expect(dbTodo.dueDate).toEqual(sanitizedInputs.dueDate);
        expect(dbTodo.status).toBe(sanitizedInputs.status);
    });

    test("should fail if the todo is not exist", async () => {

        const todoId = new mongoose.Types.ObjectId("60744d9a591d9d11b29844d4");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2");

        const sanitizedInputs: ITodoUpdateSanitizedInputs  = {
            title: "ABC production release",
            description: "this is a sample description for this todo",
            priority: "high",
            dueDate: new Date("2025-11-04"),
            status: "pending"
        };

        try {
            await TodoUpdater.updateTodo(todoId, sanitizedInputs, userId);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
        }
    });

    test("should fail if the user is not authorized to update the todo", async () => {

        const todoId = new mongoose.Types.ObjectId("671ca295d8307616b9e781a5");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2"); // unauthorized user

        const sanitizedInputs: ITodoUpdateSanitizedInputs  = {
            title: "Task 5",
            description: "This is the description for Task 5.",
            priority: "medium",
            dueDate: new Date("2025-11-04"),
            status: "pending"
        };

        try {
            await TodoUpdater.updateTodo(todoId, sanitizedInputs, userId);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        }
    });
});
