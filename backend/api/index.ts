import express, {Application} from "express"
import {Router} from "../routes"
import cookieParser from "cookie-parser"

import { connectToUserDatabase } from "../db"
import cors from "cors"

export default async (app:Application):Promise<Application>=>{
  
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());

    await connectToUserDatabase();
   

    app.use("/api",Router)
  
    return app;
}