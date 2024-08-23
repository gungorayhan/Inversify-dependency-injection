import { inject, injectable } from "inversify";
import { UserEntity } from "../../entities";
import { IUserService, IUserRepository, IPasswordService, ITokenService } from "../../interfaces";
import { INTERFACE_TYPE } from "../../utils";

@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository;
    private tokenService: ITokenService;
    private passwordService: IPasswordService;
    
    constructor(
        @inject(INTERFACE_TYPE.UserRepository) userRepository: IUserRepository,
        @inject(INTERFACE_TYPE.TokenService) tokenService: ITokenService,
        @inject(INTERFACE_TYPE.PasswordService) passwordService: IPasswordService,
    ) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
        
    }
   

    async createUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.createUser(user);
    }
    async getUserById(id: string): Promise<UserEntity | null> {
            return this.userRepository.findById(id);
    }

    async getAllUsers():Promise<UserEntity[] | null>{
        try {
            const users = await this.userRepository.getAllUser();
            return users;
        } catch (error) {
            console.log("getAllUsers")
            return null
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findByEmail(email);
    }
    async updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
   

}