import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../lib/errors";

export function notFoundError(req: Request, res: Response, _next: NextFunction) {
    _next(new NotFoundError(`Route not Found`))
}