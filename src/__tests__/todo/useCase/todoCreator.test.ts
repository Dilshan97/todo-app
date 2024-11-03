import mongoose from "mongoose";
import TodoCreator from "../../../modules/todo/useCase/todoCreator";
import TestDbConfig from "../../../config/test-db.config";
import {StatusCodes} from "http-status-codes";
import {ITodoCreateSanitizedInputs} from "../../../modules/todo/todo.interface";

describe("TEST: TODO CREATE TESTCASE", () => {

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

    test("Should create a new todo", async () => {

        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a2");

        const sanitizedInputs: ITodoCreateSanitizedInputs = {
            title: "ABC project requirement meeting",
            description: "we have a project requirement meeting on next monday",
            priority: "high",
            dueDate: new  Date("2024-11-03")
        };

       const todo = await TodoCreator.createTodo(sanitizedInputs, userId);

       expect(todo.title).toBe("ABC project requirement meeting");
       expect(todo.description).toBe("we have a project requirement meeting on next monday");
       expect(todo.priority).toBe("high");
       expect(todo.dueDate).toEqual(new Date("2024-11-03"));
       expect(todo.status).toEqual("pending");
    });

    test("Should fail if the user does not exist", async () => {

        const userId = new mongoose.Types.ObjectId("671ca295d8307616b9e887a3"); // non-existing user

        const sanitizedInputs: ITodoCreateSanitizedInputs = {
            title: "ABC project requirement meeting",
            description: "we have a project requirement meeting on next monday",
            priority: "high",
            dueDate: new  Date("2024-11-03")
        };

        try {
            await TodoCreator.createTodo(sanitizedInputs, userId);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
        }
    });

});