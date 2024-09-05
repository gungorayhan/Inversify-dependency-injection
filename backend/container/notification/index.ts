import { Container } from "inversify"
import { INTERFACE_TYPE } from "../../utils"
import { IEventEmitter, IPasswordService, ITokenService, IUserRepository, IUserService } from "../../interfaces";
import { PasswordService, TokenService } from "../../libs";
import { UserService } from "../../services";
import { UserRepository } from "../../repositories";
import { Emitter } from "../../libs/events";
import { NotificationServices } from "../../libs/notification";

const notificationContainer = new Container();

notificationContainer.bind<IPasswordService>(INTERFACE_TYPE.PasswordService).to(PasswordService)
notificationContainer.bind<ITokenService>(INTERFACE_TYPE.TokenService).to(TokenService)
notificationContainer.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository)
notificationContainer.bind<IEventEmitter>(INTERFACE_TYPE.EventEmitter).to(Emitter)
notificationContainer.bind<IUserService>(INTERFACE_TYPE.UserService).to(UserService)
notificationContainer.bind(INTERFACE_TYPE.Notification).to(NotificationServices)


export {notificationContainer}
