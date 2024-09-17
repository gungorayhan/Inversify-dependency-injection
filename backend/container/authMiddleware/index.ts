import { IAuthService, IPasswordService, ITokenService, IUserRepository } from "../../interfaces";
import { AuthMiddleware } from "../../middleware/auth";
import { Container } from "inversify";
import { INTERFACE_TYPE } from "../../utils";
import { AuthService } from "../../services/auth";
import { PasswordService, TokenService } from "../../libs";
import { UserRepository } from "../../repositories";
import { BaseRepository } from "../../repositories/base";
import { UserEntity } from "../../entities";
import { UserModel } from "../../models";


const authMiddlewareContainer = new Container()
authMiddlewareContainer.bind<ITokenService>(INTERFACE_TYPE.TokenService).to(TokenService)
authMiddlewareContainer.bind<IPasswordService>(INTERFACE_TYPE.PasswordService).to(PasswordService)
// authMiddlewareContainer.bind<BaseRepository<UserEntity>>(INTERFACE_TYPE.BaseRepository).to(BaseRepository)
// authMiddlewareContainer.bind(INTERFACE_TYPE.UserModel).toConstantValue(UserModel)
authMiddlewareContainer.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository)
authMiddlewareContainer.bind<IAuthService>(INTERFACE_TYPE.AuthService).to(AuthService)
authMiddlewareContainer.bind(INTERFACE_TYPE.AuthMiddleware).to(AuthMiddleware)
// const authMiddleware = container.get<AuthMiddleware>(INTERFACE_TYPE.AuthMiddleware)

// export {authMiddleware as AuthMiddlewareContainer}
export{authMiddlewareContainer}