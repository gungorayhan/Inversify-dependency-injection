import { Model, Schema } from 'mongoose';
import { databaseManager } from '../connection';

export function createModel<T>(dbName: string, modelName: string, schema: Schema): Model<T> {
    const db = databaseManager.getDatabaseConnection(dbName);
    return db.model<T>(modelName, schema);
}