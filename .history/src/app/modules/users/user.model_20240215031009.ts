import {  Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'


export const userSchema = new Schema<IUser>({
    password: {
        type: String, 
        required: true, 
    }, 
   
    role: {
        type: String, 
        enum: ["seller", 'buyer'],
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId, 
        ref: 'Seller', 
    }, 
    buyer: {
        type: Schema.Types.ObjectId, 
        ref: 'Buyer',
    }
})

export const User = model<IUser, UserModel >("User", userSchema);
