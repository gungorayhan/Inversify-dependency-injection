import { Container } from "inversify";
import { IAuthService, IPasswordService,ITokenService,IUserRepository } from "../../interfaces";
import { INTERFACE_TYPE } from "../../utils";
import { AuthController } from "../../controllers";
import { AuthService } from "../../services/auth";
import { UserRepository } from "../../repositories";
import { PasswordService, TokenService } from "../../libs";

const authContainer = new Container();

authContainer.bind<IPasswordService>(INTERFACE_TYPE.PasswordService).to(PasswordService);
authContainer.bind<ITokenService>(INTERFACE_TYPE.TokenService).to(TokenService);
authContainer.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
authContainer.bind<IAuthService>(INTERFACE_TYPE.AuthService).to(AuthService);
authContainer.bind(INTERFACE_TYPE.AuthController).to(AuthController);

// const authController = container.get<AuthController>(INTERFACE_TYPE.AuthController);

// export {authController as AuthContainer}

export{authContainer}