import {IUserLoginSanitizedInputs} from "../../../modules/user/user.interface";
import Authenticate from "../../../modules/user/useCase/authenticate";
import TestDbConfig from "../../../config/test-db.config";
import {StatusCodes} from "http-status-codes";

jest.setTimeout(30000);//increase the default timeout 5000 to 300000

describe("TEST: USER AUTHENTICATOR TESTCASE", () => {

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

    test("Should be authenticate with valid user", async () => {

        const sanitizedInputs: IUserLoginSanitizedInputs = {
            email: "alison.fernando@example.com",
            password: "123"
        };

        const accessToken = await Authenticate.login(sanitizedInputs);
        expect(accessToken).toBeTruthy();
    });

    test("Should be fail if the user is not exist", async () => {

        const sanitizedInputs: IUserLoginSanitizedInputs = {
            email: "alison@example.com",
            password: "123"
        };

        try {
            await Authenticate.login(sanitizedInputs);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
        }
    });

    test("Should be fail if the credentials are incorrect", async () => {

        const sanitizedInputs: IUserLoginSanitizedInputs = {
            email: "alison.fernando@example.com",
            password: "wrong-password"
        };

        try {
            await Authenticate.login(sanitizedInputs);
        } catch (error: any) {
            expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        }
    });
});

