import { Schema, model } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, "category should not be empty"],
    unique: true,
  },
});

export  const  categories = model<ICategory>("Category", categorySchema);
