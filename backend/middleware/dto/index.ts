import { injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "../../utils/Error";


@injectable()
export class DtoMiddleware{

     validate(dtoClass:any){
        return async (req:Request, res:Response,next:NextFunction)=>{
            const dtoObject=plainToInstance(dtoClass,req.body);
            const errors = await validate(dtoObject);


            if (errors.length > 0) {
                const messages = errors.map(err => Object.values(err.constraints || {}).join(', ')).join('; ');
                next(new AppError(400, messages)); // Hatalı veriyi middleware'e ilet
            } else {
                next();
            }
        }
    }
}