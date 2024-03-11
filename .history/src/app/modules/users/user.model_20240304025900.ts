import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

export const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      required: false,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
)

export const User = model<IUser, UserModel>('User', userSchema)
