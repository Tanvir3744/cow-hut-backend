/* import { ISeller } from "../seller/seller.interface"
import { Types } from "mongoose" */

import { Model, Types } from "mongoose"

export type ICow = {
    name: string, 
    age: number, 
    price: number, 
    location: 'Dhaka' | 'Chattogram' | 'Barishal' | 'Rajshahi' | 'Sylhet' | 'Comilla' | 'Rangpur' | 'Mymensingh',
    breed: 'Brahman' | 'Nellore' | 'Sahiwal' | 'Gir' | 'Indigenous' | 'Tharparkar' | 'Kankrej',
    weight: number, 
    label: 'for sale' | 'sold out',
    category: 'dairy' | 'Beef' | 'DualPurpose',
   seller: Types.ObjectId | ISeller,
}

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
    searchTerm?: string, 
    weight?: number, 
    label?: string, 
    price?: number, 
    age?: number, 
    location?: string, 
    category?: string
}

