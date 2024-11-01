import BadRequestError from "../../error/error.classes/BadRequestError";
import { Request, Response, NextFunction } from "express";

const paginate = async (req: Request, res: Response, next: NextFunction) => {
  let page: number | string = (req.query.page as string) || 1;
  let limit: number | string = (req.query.limit as string) || 8;
  let orderBy: string = (req.query.orderBy as string) || "desc";

  page = parseInt(page as string);
  if (!page) throw new BadRequestError("Page number should be a number!");

  limit = parseInt(limit as string);
  if (!limit) throw new BadRequestError("Page limit should be a number!");

  if (orderBy != "asc" && orderBy != "desc") {
    throw new BadRequestError('Sorting order should be "asc" or "desc!"');
  }

  req.pageable = { page, limit, orderBy };

  next();
};

export default { paginate };
