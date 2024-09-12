import { IAuthService, IPasswordService, ITokenService, IUserRepository } from "../../interfaces";
import { inject, injectable } from "inversify"
import { INTERFACE_TYPE } from "../../utils";
import { UserEntity } from "../../entities";
import { AppError } from "../../utils/Error";


@injectable()
export class AuthService implements IAuthService {
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
    
    async login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new AppError(404, 'User not found by email');
        }

        const isPasswordValid = await this.passwordService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new AppError(401,'Invalid credentials');
        }

        const accessToken = await this.tokenService.generateAccessToken({ userId: user._id })
        const refreshToken = await this.tokenService.generateRefreshToken({ userId: user._id })

        return { accessToken, refreshToken }
    }
    async register(user: Omit<UserEntity, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ accessToken: string, refreshToken: string }> {
        const existingUser = await this.userRepository.findByEmail(user.email)

        if (existingUser) {
            throw new AppError(404, 'User not found by email');
        }

        const hashedPassword = await this.passwordService.hashPassword(user.password);
        const createdUser = await this.userRepository.create({
            username: user.username,
            email: user.email,
            password: hashedPassword,
            first_name: user.first_name,
            last_name: user.last_name
        })

        if (!createdUser) {
            throw new AppError(204,'No Content');
        }

        const accessToken = await this.tokenService.generateAccessToken({ userId: createdUser._id })
        const refreshToken = await this.tokenService.generateRefreshToken({ userId: createdUser._id })

        return { accessToken, refreshToken }
    }
    async logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
        try {
            
            const decoded = await this.tokenService.verifyRefreshToken(refreshToken);

            if (!decoded || !decoded.userId) {
                return null; 
            }

            const user = await this.userRepository.findById(decoded.userId);
            if (!user) {
                return null;
            }

            const accessToken = await this.tokenService.generateAccessToken({ userId: user._id });

            
            const newRefreshToken = await this.tokenService.generateRefreshToken({ userId: user._id });

            return { accessToken, refreshToken: newRefreshToken };
        } catch (error) {
            console.log("Refresh Token Error: ", error);
            
            return null;
        }
    }

    async verifyTokenAndGetUser(token:string):Promise<UserEntity | null>{
        
         
         const decoded = await this.tokenService.verifyAccessToken(token);

        
         if (!decoded) {
             return null; 
         }

        
         const user = await this.userRepository.findById(decoded.userId);
         if (!user) {
             return null;
         }

         return user;
        
    }
}