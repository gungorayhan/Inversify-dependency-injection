import { inject, injectable } from "inversify";
import { IUserRepository } from "../../interfaces";
import { UserEntity } from "../../entities";
import { INTERFACE_TYPE } from "../../utils";
import { UserModel } from "../../models";

@injectable()
export class UserRepository implements IUserRepository{

    async findById(id: string): Promise<UserEntity | null> {
      try {
        const user= await UserModel.findById(id)
        return user
      } catch (error) {
        console.log("Error users:" , error)
        return null
      }
    }
    async getAllUser():Promise<UserEntity[] | null>{
        try {
            const users = await UserModel.find()
            return users
        } catch (error) {
            return null;
        }
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null; // or throw error based on your error-handling strategy
        }
    }
    async createUser(user: UserEntity): Promise<UserEntity> {
        return UserModel.create(user);
    }
    async updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }
    async removeUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    

}