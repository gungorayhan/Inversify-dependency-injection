import { Container } from "inversify"
import { INTERFACE_TYPE } from "../../utils"
import { IPasswordService, ITokenService, IUserRepository, IUserService } from "../../interfaces";
import { PasswordService, TokenService } from "../../libs";
import { UserController } from "../../controllers";
import { UserService } from "../../services";
import { UserRepository } from "../../repositories";

const userContainer = new Container();

userContainer.bind<IPasswordService>(INTERFACE_TYPE.PasswordService).to(PasswordService)
userContainer.bind<ITokenService>(INTERFACE_TYPE.TokenService).to(TokenService)
userContainer.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository)
userContainer.bind<IUserService>(INTERFACE_TYPE.UserService).to(UserService)
userContainer.bind(INTERFACE_TYPE.UserController).to(UserController)
// const userControllers = container.get<UserController>(INTERFACE_TYPE.UserController)

// export {userControllers as UserContainer}
export{userContainer}