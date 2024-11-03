import UserRegister from "../../../modules/user/useCase/userRegister";
import TestDbConfig from "../../../config/test-db.config";
import {StatusCodes} from "http-status-codes";
import {IUserRegisterSanitizedInputs} from "../../../modules/user/user.interface";

jest.setTimeout(30000);//increase the default timeout 5000 to 300000

describe("TEST: USER REGISTER TESTCASE", () => {

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

    test("should register a new user", async () => {

        const sanitizedInputs: IUserRegisterSanitizedInputs = {
            name: "Jameson",
            email: "jameson@example.com",
            password: "123"
        };

       const user =  await UserRegister.registerUser(sanitizedInputs);

       expect(user).toHaveProperty("_id");
       expect(user.name).toBe(sanitizedInputs.name);
       expect(user.email).toBe(sanitizedInputs.email);
       expect(user.password).toBeTruthy();
    });

    test("should fail if the user already exists", async () => {

        const sanitizedInputs: IUserRegisterSanitizedInputs = {
            name: "Fernando",
            email: "alison.fernando@example.com",
            password: "123"
        };

        try {
            await UserRegister.registerUser(sanitizedInputs);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.FORBIDDEN);
        }
    });
});