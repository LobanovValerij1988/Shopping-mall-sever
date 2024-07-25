import {Schema, model, Types, Document} from 'mongoose';

export interface IProduct {
  name: string;
  quantity: number;
  price: number;
  category: Types.ObjectId;
}

export interface IMongoProduct extends IProduct, Document{}

const productSchema = new Schema<IMongoProduct>({
  name: {
    type: String,
    required: [true, "name can not be empty"],
    unique: true,
    index: true,
  },
  quantity: {
    type: Number,
    required: [true, "quantity can not be empty"],
    min: [0, "Quantity cannot be negative"],
  },
  price: {
    type: Number,
    required: [true, "price can not be empty"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const products= model<IMongoProduct>("Product", productSchema);
