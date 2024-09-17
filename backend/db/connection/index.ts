import mongoose, { Connection, ConnectOptions, Model } from 'mongoose';
import config from '../../config';

class DatabaseManager {
    private static instance: DatabaseManager;
    private connections: { [key: string]: Connection } = {};

    private constructor() {}

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    public async connectToDatabases() {
        for (const [dbName, uri] of Object.entries(config.DatabaseURL)) {
            if (!this.connections[dbName]) {
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

                    this.connections[dbName] = connection;
                } catch (error) {
                    console.error(`Failed to connect to ${dbName}:`, error);
                    throw error;
                }
            }
        }
    }

    public getDatabaseConnection(dbName: string): Connection {
        const connection = this.connections[dbName];
        if (!connection) {
            throw new Error(`No connection found for database: ${dbName}`);
        }
        return connection;
    }

    public async closeConnections() {
        for (const [dbName, connection] of Object.entries(this.connections)) {
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
}

export const databaseManager = DatabaseManager.getInstance();