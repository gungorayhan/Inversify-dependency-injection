import { BaseEntity } from "../index"

export class UserEntity extends BaseEntity {
    constructor(
      public readonly username: string,
      public readonly email: string,
      public readonly password: string,
      public readonly first_name: string,
      public readonly last_name: string,
      // public readonly roles:string[],
      _id?: string,
      createdAt?: Date,
      updatedAt?: Date
    ) {
        super(_id, createdAt, updatedAt); // BaseEntity constructor'ını çağırır
    }
  }