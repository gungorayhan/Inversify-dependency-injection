import { Request, Response, NextFunction } from "express"
import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../utils";
import { IUserService } from "../../interfaces";
import { IRedisService } from "../../interfaces/redis";


@injectable()
export class UserController {
    private userService: IUserService
    private redis: IRedisService
    constructor(
        @inject(INTERFACE_TYPE.UserService) userService: IUserService,
        @inject(INTERFACE_TYPE.Redis) redis: IRedisService
    ) {
        this.userService = userService
        this.redis = redis
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

            if (users) {
                this.redis.setIfNotExists(req.originalUrl, users, 3600)
            }

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