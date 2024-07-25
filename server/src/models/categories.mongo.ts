import { Schema, model, Document } from 'mongoose';
import {role} from "./users.mongo";

export interface ICategory  {
  name: string;
}

export interface IMongoCategory extends Document, ICategory{}

const categorySchema = new Schema<IMongoCategory>({
  name: {
    type: String,
    required: [true, "category should not be empty"],
    unique: true,
  },
});

export  const  categories = model<IMongoCategory>("Category", categorySchema);
