import { Schema } from 'mongoose'
import { IUser } from './user.interface'

export const userSchema = new Schema<IUser>({
    phoneNumber: {
        type: String, 
        required: true,
        unique: true
    },
    role: {
        type: String, 
        enum: []
    }
})
