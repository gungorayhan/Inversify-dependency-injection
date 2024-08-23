import { injectable } from "inversify";
import bcrypt from "bcrypt"
import { IPasswordService } from "../../interfaces";
@injectable()
export class PasswordService implements IPasswordService {
    private saltRounds: number = 10; 
    // constructor(saltRounds?: number) {
    //     if (saltRounds) {
    //         this.saltRounds = saltRounds;
    //       }
    // } dependency injection sırasında bozulmeye neden olduğundan dolayı yorum satırı yapıldı

    async hashPassword(password:string):Promise<string>{
        return bcrypt.hash(password,this.saltRounds)
    }

    async comparePassword(password:string,hash:string):Promise<boolean>{
        return bcrypt.compare(password,hash)
    }
}