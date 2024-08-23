import mongoose, { Document, Schema } from "mongoose";
import { UserEntity } from "../../entities";


export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,

}

const userSchema = new mongoose.Schema<UserEntity>({
    username: { type: String, required: true,unique:true },
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
}, {
    timestamps: true
})

export const UserModel = mongoose.model<UserEntity>("User", userSchema); 