import mongoose from "mongoose";
import TodoRemover from "../../../modules/todo/useCase/todoRemover";
import TodoService from "../../../modules/todo/todo.service";
import TestDbConfig from "../../../config/test-db.config";
import {StatusCodes} from "http-status-codes";

jest.setTimeout(30000);//increase the default timeout 5000 to 300000

describe("TEST: TODO REMOVE TESTCASE", () => {

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

    test("Should remove existing todo", async () => {

        const todoId = new mongoose.Types.ObjectId("671ca295d8307616b9e781a5");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a5");

        await TodoRemover.removeTodo(todoId, userId);

        const todo = await TodoService.findById(todoId);
        expect(todo).toBeNull();
    });

    test("Should fail if the todo is not exist", async () => {

        const todoId = new mongoose.Types.ObjectId("671ca295d8307616b9e881a3");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a5");

        try {
            await TodoRemover.removeTodo(todoId, userId);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
        }
    });

    test("Should fail if the user is not authorized to remove the todo", async () => {

        const todoId = new mongoose.Types.ObjectId("671ca295d8307616b9e781a5");
        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2");

        try {
            await TodoRemover.removeTodo(todoId, userId);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        }
    });
});