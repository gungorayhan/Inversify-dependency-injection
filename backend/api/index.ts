import express, { Application } from "express"
import { Router } from "../routes"
import cookieParser from "cookie-parser"

import { connectToUserDatabase } from "../db"
import cors from "cors"
import { errorContainer } from "../container/errorMiddleware"
import { INTERFACE_TYPE } from "../utils"
import { ErrorMiddleware } from "../middleware/error"
import { notificationContainer } from "../container/notification"
import { NotificationServices } from "../libs/notification"
import { userContainer } from "../container/userController"
import { initializeModels } from "../models"

export default async (app: Application): Promise<Application> => {
    console.log("first")
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // notificationContainer.get<NotificationServices>(INTERFACE_TYPE.Notification)
    userContainer.get<NotificationServices>(INTERFACE_TYPE.Notification)
    

    const ErrorMiddleware = errorContainer.get<ErrorMiddleware>(INTERFACE_TYPE.ErrorMiddleware)

    // await connectToUserDatabase();
   await initializeModels()
    

    app.use("/api", Router)
    app.use(ErrorMiddleware.handle.bind(ErrorMiddleware))


    return app;
}