import {IUser, users} from "./users.mongo";
import {HydratedDocument} from "mongoose";

export async  function getUserBy (queryParam:{nickName?:string}) {
   return users.findOne(queryParam).lean().exec();
}

 export async  function getUserById (id:string) {
   return users.findById(id).exec();
}

export async function getAllUsers (){
   return users.find().select('-password').lean();
}

export async function addNewUser (newUser: Omit<IUser,"_id">){
   return users.create(newUser);
}

export async function updateUser(updatedUser: HydratedDocument<IUser>) {
    const savedUser = await updatedUser.save();
    return  getUserById(savedUser._id.toString() );
}

export function deleteUser(userID:string) {
   return  users.findByIdAndDelete(userID);
}

