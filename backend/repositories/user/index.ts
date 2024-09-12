import {  injectable } from "inversify";
import { IUserRepository } from "../../interfaces";
import { UserEntity } from "../../entities";
import { UserModel } from "../../models";
import { ErrorMessages } from "../../utils/Enum/httpCodes";
import { AppError } from "../../utils/Error";
import { BaseRepository } from "../base";


@injectable()
export class UserRepository extends BaseRepository<UserEntity> implements IUserRepository{
    constructor(){
        super(UserModel)
    }

    // UserEntity'ye özel methodlar
  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await UserModel.findOne({ email }).exec();
    } catch (error) {
      console.error("Database error finding user by email:", error);
      throw new AppError(500, 'Database error');
    }
  }
}