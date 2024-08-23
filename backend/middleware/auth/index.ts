import { injectable, inject } from "inversify";
import { IAuthService } from "../../interfaces";
import { INTERFACE_TYPE } from "../../utils";
import { Request, Response, NextFunction } from "express";
import { UserEntity } from "../../entities";


@injectable()
export class AuthMiddleware {
    private authService: IAuthService
    constructor(
        @inject(INTERFACE_TYPE.AuthService) authService: IAuthService,
    ) {
       this.authService=authService;
    }

    async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            
            const authHeader = req.headers.authorization;
            let token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    
          
            if (token) {
                
                const user = await this.authService.verifyTokenAndGetUser(token);
                if (user) {
                    req.user = user || {} as UserEntity 
                    return next();  
                }
            }
    
           
            const refreshToken = req.cookies.refreshToken;
            
            if (refreshToken) {

                const newTokens = await this.authService.refreshAccessToken(refreshToken);
        
                if (newTokens) {
                    res.cookie('refreshToken', newTokens.refreshToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün
                    });
    
                    return res.json({
                        accessToken: newTokens.accessToken
                    });
                }
            }
    
            
            return res.status(401).json({ message: 'Unauthorized: Invalid or missing tokenn' });
        } catch (error) {
            console.log("Authentication Error: ", error);
            return res.status(401).json({ message: 'Unauthorized: Error in authentication' });
        }
    }


}