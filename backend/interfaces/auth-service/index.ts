import { UserEntity } from "../../entities"

export interface IAuthService{
    login(email:string,password:string):Promise<{ accessToken: string, refreshToken: string }>
    register(user:UserEntity):Promise<{ accessToken: string, refreshToken: string }>
    logout():Promise<void>
    refreshAccessToken(refreshToken:string):Promise<{accessToken:string,refreshToken:string} | null>
    verifyTokenAndGetUser(token:string):Promise<UserEntity | null>
}