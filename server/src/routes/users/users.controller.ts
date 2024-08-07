import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import {addNewUser, deleteUser, getAllUsers, getUserBy, getUserById, updateUser} from "../../models/users.model";
import {getErrorObject} from "../../helpers/errorHelpers";
import {createAccessToken} from "../../helpers/jwtHelpers";
import {IUser} from "../../models/users.mongo";

 export async function httpGetAllUsers(req:Request, res:Response) {
    try {
        res.status(200).json(await getAllUsers());
    } catch (err) {
        return res.status(500).json(getErrorObject(err));
    }
}

 export async function httpGetUserByID(req:Request, res:Response) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: "user was not found",
            });
        } else {
            return res.status(200).json(user);
        }
    } catch (err) {
        return res.status(500).json(getErrorObject(err));
    }
}

interface  IAddUser {
     nickName: string;
     password: string;
     passwordConfirmed :string;
}

 export async function httpAddUser(req:Request<{},{},IAddUser>, res:Response) {
    try {
        const {nickName, password,  passwordConfirmed } = req.body;
        if(!nickName || !password ) {
            return res.status(400).json({message: 'All fields are required'})
        }

        if(password !== passwordConfirmed )  {
            return res.status(400).send({
                error: "Password does not match password required"
            })
        }
        const duplicate = await getUserBy({nickName})
        if(duplicate){
            return res.status(409).json({error: 'Duplicate username'})
        }
        if(password.length < 3){
            return res.status(400).json({error: 'Password should be longer that 3'})
        }
        const hashedPwd = await bcrypt.hash(password, 10)
        const user = await addNewUser({nickName, password:hashedPwd, roles:["customer"], activeStatus: true});
        if(user){
            const accessToken =  createAccessToken(user);
            res.status(201).json({accessToken})
        }
        else {
            res.status(400).json({error: 'Invalid user data received'});
        }
    } catch (err) {
        return res.status(500).json(getErrorObject(err));
    }
}

 export async function httpUpdateUser(req:Request<{id:string},{},IUser>, res:Response) {
    try {
        const id = req.params.id;
        const { nickName, password, roles, activeStatus } = req.body;
        if( !nickName || !Array.isArray(roles) || !roles.length || !id ) {
            return res.status(400).json({error: 'All fields are required'})
        }

        const user = await getUserById(id);

        if(!user){
            return res.status(404).json({error: 'User was not found'});
        }

        const duplicate = await getUserBy({nickName})
        if(duplicate && duplicate?._id.toString() !== id){
            return res.status(409).json({error: 'Duplicate username'})
        }
        user.nickName = nickName;
        user.roles = roles;
        user.activeStatus = activeStatus;
         if(password) {
             user.password = await bcrypt.hash(password,10)
         }

        const updatedUser = await updateUser(user);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(getErrorObject(err));
    }
}

export async function httpDeleteUser(req:Request, res:Response) {
    try {
        const deletedUser = await deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                error: "user was not found",
            });
        } else {
            return res.status(200).json(deletedUser);
        }
    } catch (err) {
        return res.status(500).json(getErrorObject(err));
    }
}
