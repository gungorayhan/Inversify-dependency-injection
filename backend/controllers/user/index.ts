import { Request, Response, NextFunction } from "express"
import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../utils";
import { IUserService } from "../../interfaces";
import { IRedisService } from "../../interfaces/redis";
import { UserEntity } from "../../entities";


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
            const { id } = req.params
            const user = await this.userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error); // Hata middleware'ini çağır
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user: UserEntity = req.body
            const result = await this.userService.createUser(user);
            res.status(201).json(result);
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

            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getUserByEmail(req.query.email as string);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userUpdates: Partial<UserEntity> = req.body;
            const result = await this.userService.updateUser(id, userUpdates);
            return result;
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(204).send(); // No content
        } catch (error) {
            next(error)
        }
    }

}