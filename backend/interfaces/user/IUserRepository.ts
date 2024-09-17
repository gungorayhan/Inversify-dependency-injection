import { UserEntity } from "../../entities";
import { IBaseRepository } from "../base";

export interface IUserRepository extends IBaseRepository<UserEntity>{
    findByEmail(email:string): Promise<UserEntity | null>
}

