import { Schema, model, Document } from 'mongoose';

export type role = "customer" | 'manager' | 'admin';

export interface IUser {
  nickName: string;
  password: string;
  roles: role[];
  activeStatus: boolean;
}

export interface IMongoUser extends Document,IUser{}

const userSchema = new Schema< IMongoUser>({
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    enum: { values: ["customer",'manager',"admin"], messages: "{VALUE} is not supported" },
    default: ["customer"],
  }],
  activeStatus: {
    type: Boolean,
    default: true,
  },
});

export const users = model<IMongoUser>("User", userSchema);
