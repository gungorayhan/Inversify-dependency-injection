import { UserEntity } from "../../entities";

export interface IUserRepository{
    findById(id:string):Promise<UserEntity | null>
    findByEmail(email:string): Promise<UserEntity | null>
    createUser(user:UserEntity):Promise<UserEntity>
    updateUser(id:string, user:Partial<UserEntity>):Promise<UserEntity>
    removeUser(id:string):Promise<void>
    getAllUser():Promise<UserEntity[]>
}
