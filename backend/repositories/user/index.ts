import {  injectable } from "inversify";
import { IUserRepository } from "../../interfaces";
import { UserEntity } from "../../entities";
import { UserModel } from "../../models";
import { ErrorMessages } from "../../utils/Enum/httpCodes";
import { AppError } from "../../utils/Error";
import { BaseRepository } from "../base";

// @injectable()
// export class UserRepository implements IUserRepository{

//     async findById(id: string): Promise<UserEntity | null> {
//      try {
//         return await UserModel.findById(id).exec()
//      } catch (error) {
//         console.error("Database error finding user by ID:", error);
//         throw new AppError(500, 'Database error');
//      }
//     }
//     async findAll(): Promise<UserEntity[]> {
//         try {
//             return await UserModel.find().exec();
//         } catch (error) {
//             console.error("UserRepository Error:", error);
//             throw new AppError(500, 'Database error');
//         }
//     }
//     async findByEmail(email: string): Promise<UserEntity | null> {
//         try {
//             return await UserModel.findOne({ email }).exec(); // Veritabanı sorgusu
//         } catch (error) {
//             console.error("Database error finding user by email:", error);
//             throw new AppError(500, 'Database error');
//         }
//     }
//     async create(user: UserEntity): Promise<UserEntity> {
//         try {
//             return await UserModel.create(user); // Veritabanına ekleme
//         } catch (error) {
//             console.error("Database error creating user:", error);
//             throw new AppError(500, 'Database error');
//         }
//     }
//     async update(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
//         throw new Error("Method not implemented.");
//     }
//     async remove(id: string): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
    

// }

@injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository{

  constructor(){
    super(UserModel)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
        try {
            return await this.model.findOne({ email }).exec();
        } catch (error) {
            throw new AppError(500, "Database error");
        }
    }

}