import {IAuth} from "./modules/user/user.interface";
import { IPagination } from "./modules/common/common.interface";

declare module "express-serve-static-core" {
    interface Request {
        auth: IAuth;
        pageable: IPagination;
    }
}
