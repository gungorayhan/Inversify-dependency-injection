import { inject, injectable } from "inversify";
import { UserEntity } from "../../entities";
import { IUserService, IUserRepository, IPasswordService, ITokenService, IEventEmitter } from "../../interfaces";
import { INTERFACE_TYPE } from "../../utils";
import { AppError } from "../../utils/Error";
import { ErrorMessages } from "../../utils/Enum/httpCodes";
import { IRedisService } from "../../interfaces/redis";


@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository;
    private tokenService: ITokenService;
    private passwordService: IPasswordService;
    private emitter : IEventEmitter
    // private redis:IRedisService
    constructor(
        @inject(INTERFACE_TYPE.UserRepository) userRepository: IUserRepository,
        @inject(INTERFACE_TYPE.TokenService) tokenService: ITokenService,
        @inject(INTERFACE_TYPE.PasswordService) passwordService: IPasswordService,
        @inject(INTERFACE_TYPE.EventEmitter) emitter : IEventEmitter,
        // @inject(INTERFACE_TYPE.Redis) redis:IRedisService
    ) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
        this.emitter=emitter
        // this.redis=redis
        
    }
   

    async createUser(user: UserEntity): Promise<UserEntity> {
        try {
            const result = await this.userRepository.create(user);

            this.emitter.publish('userCreated',result)
            
            return result
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
            const users = await this.userRepository.findAll();
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

    subscribeToUserCreated(callback: (data: any) => void):void {
        this.emitter.subscribe('userCreated', callback);
    }
   
}