import {Schema, model, Types} from 'mongoose';

interface IProduct {
    _id: boolean;
    name: string;
    quantity: number;
    price: number;
}

const productSchema = new Schema<IProduct>(
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
    _id: string;
    orderDate?: Date;
    user: Types.ObjectId;
    price: number;
    products: IProduct[];
}

const orderSchema = new Schema<IOrder>({
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
