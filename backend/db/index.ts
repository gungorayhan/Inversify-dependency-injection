export {connectToUserDatabase} from "./user";

import mongoose, { Connection, ConnectOptions } from 'mongoose';
import config from '../config';

const connections: { [key: string]: Connection } = {};

export async function connectToDatabases() {
    for (const [dbName, uri] of Object.entries(config.DatabaseURL)) {
        if (!connections[dbName]) {
            try {
                const connection = mongoose.createConnection(uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                } as ConnectOptions);

                connection.on('open', () => {
                    console.log(`Connected to ${dbName}`);
                });

                connection.on('error', (error) => {
                    console.error(`Failed to connect to ${dbName}:`, error);
                });

                connections[dbName] = connection;
            } catch (error) {
                console.error(`Failed to connect to ${dbName}:`, error);
                throw error;
            }
        }
    }
}

export async function closeConnections() {
    for (const [dbName, connection] of Object.entries(connections)) {
        if (connection.readyState === 1) { // Bağlıysa kapat
            try {
                await connection.close();
                console.log(`Connection to ${dbName} closed successfully.`);
            } catch (error) {
                console.error(`Failed to close connection to ${dbName}:`, error);
            }
        }
    }
}

export function getDatabaseConnection(dbName: string): Connection {
    const connection = connections[dbName];
    if (!connection) {
        throw new Error(`No connection found for database: ${dbName}`);
    }
    return connection;
}

