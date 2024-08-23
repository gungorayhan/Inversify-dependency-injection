import { injectable, inject } from "inversify";
import { IAuthService } from "../../interfaces";
import { INTERFACE_TYPE } from "../../utils";
import { NextFunction, Request, Response } from "express";

@injectable()
export class AuthController {
    private authService: IAuthService
    constructor(
        @inject(INTERFACE_TYPE.AuthService) authService: IAuthService
    ) {
        this.authService = authService
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body // dto will write

            const tokens = await this.authService.login(email, password);

            if (tokens) {
                //refresh token hide in cookie
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    // secure:true, //only https 
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 day
                })

                //return access token
                res.json({ accessToken: tokens.accessToken })
            }

        } catch (error) {
            console.log("Login Error: ", error);
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password, first_name, last_name } = req.body // dto will write
            const tokens =await this.authService.register({
                username,
                email,
                password,
                first_name,
                last_name
            })

            if (tokens) {
                //refresh token hide in cookie
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    // secure:true, //only https 
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 day
                })

                //return access token
                res.json({ accessToken: tokens.accessToken })
            }

        } catch (error) {
            console.log("Register Error: ", error);
            next(error); // Hata middleware'ine iletmek için
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

        } catch (error) {
console.log(error)
        }
    }
}