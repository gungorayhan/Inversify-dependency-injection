import { Connection, Model } from "mongoose";
import { getDatabaseConnection, connectToDatabases } from "../db";
import { UserEntity } from "../entities";
import { userSchema } from "./user";

// export { UserModel } from "./user";

export let UserModel: Model<UserEntity>
// let userDB: Connection
// export async function connectionDBToCreatModel(){
//     await connectToDatabases()

//     userDB = getDatabaseConnection('userDB')

//     UserModel = userDB.model<UserEntity>("User",userSchema)
// }


export function createModel<T>(dbName: string, modelName: string, schema: any): Model<T> {
    const db: Connection = getDatabaseConnection(dbName);
    return db.model<T>(modelName, schema);
}

export async function initializeModels() {
    await connectToDatabases();


    UserModel = createModel<UserEntity>('userDB', "User", userSchema)
}