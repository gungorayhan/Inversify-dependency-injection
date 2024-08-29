import { injectable } from "inversify";
import {Request,Response,NextFunction} from "express"
import { AppError } from "../../utils/Error";
@injectable()
export class ErrorMiddleware{
    async handle(error:Error,req:Request,res:Response,next:NextFunction){
        if(error instanceof AppError){
            res.status(error.statusCode).json({
                message:error.message
            })
        }else{
            res.status(500).json({
                message:'Internal Server Error'
            })
        }

    }
}