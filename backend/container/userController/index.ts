import { Container } from "inversify"
import { INTERFACE_TYPE } from "../../utils"
import { IEventEmitter, IPasswordService, ITokenService, IUserRepository, IUserService } from "../../interfaces";
import { PasswordService, TokenService } from "../../libs";
import { UserController } from "../../controllers";
import { UserService } from "../../services";
import { UserRepository } from "../../repositories";
import { Emitter } from "../../libs/events";
import { NotificationServices } from "../../libs/notification";
import { IRedisService } from "../../interfaces/redis";
import { RedisService } from "../../libs/redis";
import { IBaseRepository } from "../../interfaces/base";
import { UserEntity } from "../../entities";
import { BaseRepository } from "../../repositories/base";

const userContainer = new Container();

userContainer.bind<IPasswordService>(INTERFACE_TYPE.PasswordService).to(PasswordService)
userContainer.bind<ITokenService>(INTERFACE_TYPE.TokenService).to(TokenService)
// userContainer.bind<IBaseRepository<UserEntity>>(INTERFACE_TYPE.BaseRepository).to(BaseRepository)
userContainer.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository)
userContainer.bind<IEventEmitter>(INTERFACE_TYPE.EventEmitter).to(Emitter)
userContainer.bind<IUserService>(INTERFACE_TYPE.UserService).to(UserService)
userContainer.bind<IRedisService>(INTERFACE_TYPE.Redis).to(RedisService)
userContainer.bind(INTERFACE_TYPE.Notification).to(NotificationServices)
userContainer.bind(INTERFACE_TYPE.UserController).to(UserController)
// const userControllers = container.get<UserController>(INTERFACE_TYPE.UserController)

// export {userControllers as UserContainer}
export{userContainer}