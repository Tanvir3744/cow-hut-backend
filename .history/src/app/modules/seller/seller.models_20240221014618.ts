import { Schema, model } from 'mongoose'
import { ISeller, SellerModel } from './seller.interface'

const sellerSchema = new Schema<ISeller>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: false,
        },
      },
    },
    address: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
    },
    budget: {
      type: Number,
      required: false,
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
