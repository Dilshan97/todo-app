import { IPagination } from "./modules/common/common.interface";

declare module "express-serve-static-core" {
    interface Request {
        auth: any;
        pageable: IPagination;
    }
}
