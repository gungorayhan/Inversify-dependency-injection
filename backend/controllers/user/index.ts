import { Request, Response, NextFunction } from "express"
import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../utils";
import { IUserService } from "../../interfaces";


@injectable()
export class UserController {
    private userService: IUserService
    constructor(@inject(INTERFACE_TYPE.UserService) userService: IUserService) {
        this.userService = userService
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.getUserById(req.params.id)
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.createUser(req.body)
            res.status(201).json(result);
        } catch (error) {
            console.log(error)
        }
    }

    async getUserAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userService.getAllUsers();
            res.json(result);
        } catch (error) {
            console.log("users not read")
            console.log(error)
        }
    }
}