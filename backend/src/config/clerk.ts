import type { NextFunction, Request, Response } from "express";
import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express";
import { UnauthorizedError } from "../lib/errors";


export { clerkClient, getAuth, clerkMiddleware };

export function requireAuth(req: Request, res: Response, next: NextFunction) {

    const auth = getAuth(req);

    if (!auth.userId) {
        return next(new UnauthorizedError('User must be sign in to access this resource'));
    }

    return next();
}