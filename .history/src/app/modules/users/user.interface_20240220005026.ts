import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';
import { IBuyer } from '../buyer/buyer.interface';

export type IUser = {
    password: string, 
    role: "seller" | "buyer", 
    seller?: Types.ObjectId | ISeller,
    buyer?: Types.ObjectId | IBuyer,
}

export type IUserFilters = {
    searchTerm? : string;
}

export type UserModel = Model<IUser, object>