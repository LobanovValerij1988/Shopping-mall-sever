import {Schema, model, Types, Document} from 'mongoose';

export interface IProductForOrder  {
    name: string;
    quantity: number;
    price: number;
}
interface IProductForOrderMongo extends Document, IProductForOrder {}

const productSchema = new Schema<IProductForOrderMongo >(
  {
    _id: false,
    name: {
      type: String,
      required: [true, "there isn't name of product"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is the necessary field"],
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "price is the necessary field"],
      min: [0, "Price cannot be negative"],
    },
  },
  { excludeIndexes: true }
);

export interface IOrder {
    orderDate?: Date;
    user: Types.ObjectId;
    products: IProductForOrder[];
}

export interface IMongoOrder extends Document, IOrder{}

const orderSchema = new Schema<IMongoOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is the necessary field"],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: productSchema,
      required: true,
    },
  ],
});

export const orders = model<IOrder>("Order", orderSchema);
