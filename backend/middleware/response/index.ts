import { Response } from "express";
import { injectable, inject } from "inversify";

//herhangi bir yerde kullanılmadı deneme amaçlı yazıldı
@injectable()
export class ResponseHandler{
    // private successService;
    // private errorService;
    constructor(){

    }

    success(res:Response,code:number,message:string,data?:any){
        res.status(code).json({
            status:"success",
            message,
            data
        })
    }

    error(error:Error,res:Response,code:number,message:string,data?:any){
        res.status(code).json({
            status:"success",
            message:error.message,
            data
        })
    }
}