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
            const user = await this.userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error); // Hata middleware'ini çağır
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error); // Hata middleware'ini çağır
        }
    }

    async getUserAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error); // Hata middleware'ini çağır
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getUserByEmail(req.query.email as string);
            res.json(user);
        } catch (error) {
            next(error); // Hata middleware'ini çağır
        }
    }

}