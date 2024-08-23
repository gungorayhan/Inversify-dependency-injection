import { UserEntity } from "../entities";

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserEntity; // Kullanıcı modeline uygun bir tipi belirtin
  }
}