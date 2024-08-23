export interface ITokenService {
    generateAccessToken(payload: object): Promise<string>;
    generateRefreshToken(payload: object): Promise<string>;
    verifyAccessToken(token: string): Promise<{userId:string} | null>;
    verifyRefreshToken(token: string): Promise<{userId:string} | null>;
}
