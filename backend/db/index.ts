export {connectToUserDatabase} from "./user";
import config from "../config";
import mongoose ,{ConnectOptions}from "mongoose"
import { UserModel } from "../models";


const handleConnectionError = (dbName: string) => (error: any) => {
    console.error(`MongoDB connection error for ${dbName}:`, error);
};

const handleConnectionSuccess = (dbName: string) => () => {
    console.log(`MongoDB connection successful for ${dbName}`);
};

const connectToDatabase = (uri: string) => {
    return new Promise<mongoose.Connection>((resolve, reject) => {
        const connection = mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
         } as ConnectOptions);

        connection.once('open', () => {
            handleConnectionSuccess(uri)();
            resolve(connection);
        });

        connection.on('error', (error) => {
            handleConnectionError(uri)(error);
            reject(error);
        });
    });
};

const initDatabases = async () => {
    try {
        const [userDB] = await Promise.all([
            connectToDatabase(config.UserDatabaseURL),
            // connectToDatabase('mongodb://localhost/db2'),
            // connectToDatabase('mongodb://localhost/db3')
        ]);
        UserModel.db=userDB;
        return { userDB };
    } catch (error) {
        console.error('Failed to connect to databases:', error);
        process.exit(1);
    }
};

export { initDatabases };