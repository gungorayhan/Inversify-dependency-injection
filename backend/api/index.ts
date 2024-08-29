import express, { Application } from "express"
import { Router } from "../routes"
import cookieParser from "cookie-parser"

import { connectToUserDatabase } from "../db"
import cors from "cors"
import { errorContainer } from "../container/errorMiddleware"
import { INTERFACE_TYPE } from "../utils"
import { ErrorMiddleware } from "../middleware/error"



export default async (app: Application): Promise<Application> => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    const ErrorMiddleware = errorContainer.get<ErrorMiddleware>(INTERFACE_TYPE.ErrorMiddleware)

    await connectToUserDatabase();


    app.use("/api", Router)
    app.use(ErrorMiddleware.handle.bind(ErrorMiddleware))


    return app;
}