import { inject, injectable } from "inversify";
import { UserEntity } from "../../entities";
import { IUserService, IUserRepository, IPasswordService, ITokenService } from "../../interfaces";
import { INTERFACE_TYPE } from "../../utils";
import { AppError } from "../../utils/Error";
import { ErrorMessages } from "../../utils/Enum/httpCodes";

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
        try {
            return await this.userRepository.createUser(user);
        } catch (error) {
            // Hata mesajını değiştirerek fırlatabilirsiniz
            throw new AppError(400, 'User creation failed');
        }
    }
    async getUserById(id: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new AppError(404, 'User not found'); // İş mantığı hatası
            }
            return user;
        } catch (error) {
            // Repository hata mesajlarını değiştirmeyin
            throw new AppError(500, 'Error retrieving user by ID');
        }
    }

    async getAllUsers():Promise<UserEntity[]>{
        try {
            const users = await this.userRepository.getAllUser();
            if (users.length === 0) {
                throw new AppError(404, 'No users found'); // İş mantığı hatası
            }
            return users;
        } catch (error) {
            throw new AppError(500, 'Error retrieving users');
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new AppError(404, 'User not found by email'); // İş mantığı hatası
            }
            return user;
        } catch (error) {
            throw new AppError(500, 'Error retrieving user by email');
        }
    }
    async updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
   

}