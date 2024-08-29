import { UserEntity } from "../../entities";

export interface IUserService{
    createUser(user:UserEntity):Promise<UserEntity>
    getUserById(id:string):Promise<UserEntity>
    getUserByEmail(email:string):Promise<UserEntity | null>
    updateUser(id:string, user:Partial<UserEntity>):Promise<UserEntity | null>
    deleteUser(id:string):Promise<void>
    getAllUsers():Promise<UserEntity[]>
}