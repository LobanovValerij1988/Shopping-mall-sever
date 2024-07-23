import { Schema, model } from 'mongoose';

type role = "customer" | 'manager' | 'admin';

export interface IUser {
  nickName: string;
  password: string;
  roles: role[];
  activeStatus: boolean;
}

const userSchema = new Schema<IUser>({
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

export const users = model("User", userSchema);
