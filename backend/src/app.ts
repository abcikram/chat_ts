import express from "express";
import cors from "cors";

import { NotFoundError } from "./lib/errors";
import { notFoundError } from "./middleware/notFoundHandler";
import { errorHandler } from "./middleware/errorHandler";
import helmet from "helmet";


export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials:true
    }))
    app.use(express.json());

    app.use(notFoundError);

    app.use(errorHandler)
    return app;
}