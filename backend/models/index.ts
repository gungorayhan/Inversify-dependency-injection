import { Connection, Model } from "mongoose";
import { getDatabaseConnection, connectToDatabases } from "../db";
import { UserEntity } from "../entities";
import { userSchema } from "./user";
import { databaseManager } from "../db/connection";
import { createModel } from "../db/connection/createModel";

export { UserModel } from "./user";


//---------------multiple------------
// export let UserModel: Model<UserEntity>

export async function initializeModels() {
    // await databaseManager.connectToDatabases();
    //  UserModel = createModel('userDB', 'User', userSchema);

}


//----------------------------------------multiple old-----------------------------------------------------------------------------------------------------------
// export function createModel<T>(dbName: string, modelName: string, schema: any): Model<T> {
//     const db: Connection = getDatabaseConnection(dbName);
//     return db.model<T>(modelName, schema);
// }

// export async function initializeModels() {
//     // await connectToDatabases();



//     // UserModel = createModel<UserEntity>('userDB', "User", userSchema)
// }


// // let userDB: Connection
// // export async function connectionDBToCreatModel(){
// //     await connectToDatabases()

// //     userDB = getDatabaseConnection('userDB')

// //     UserModel = userDB.model<UserEntity>("User",userSchema)
// // }

