import { Schema, model } from 'mongoose'
import { ISeller, SellerModel } from './seller.interface'

const sellerSchema = new Schema<ISeller>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

export const Seller = model<ISeller, SellerModel>('Seller', sellerSchema)
