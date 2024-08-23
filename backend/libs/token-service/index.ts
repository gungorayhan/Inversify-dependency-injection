import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import config from "../../config";
import { ITokenService } from "../../interfaces";

@injectable()
export class TokenService implements ITokenService {

  async generateAccessToken(payload: object): Promise<string> {
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration })
    return token
  }

  async generateRefreshToken(payload: object): Promise<string> {
    const token = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiration })
    return token
  }

  async verifyAccessToken(token: string): Promise<{ userId: string } | null> {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
      return decoded;
    } catch (error) {
      console.log("Access token verification error: ", error)
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<{ userId: string } | null> {
    try {
      const decoded = jwt.verify(token, config.refreshTokenSecret) as { userId: string }
      return decoded;
    } catch (error) {
      console.log("Refresh token verification error: ", error)
      return null;
    }
  }
}