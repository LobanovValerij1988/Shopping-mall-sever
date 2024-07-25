import { IUser } from "../models/users.mongo";
import { Response } from 'express';
import jwt from "jsonwebtoken";
export async function  userAuth(res:Response, user: IUser) {
    const accessToken = createAccessToken(user)

    const refreshToken = jwt.sign(
        {
            "UserInfo": {
                "nickName": user.nickName,
                "roles": user.roles
            }
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: "5d"}
    )
    res.cookie('jwt',refreshToken,{
        httpOnly: true,
        // secure: true,
        // sameSite: 'none',
        maxAge: 24*60*60*1000
    });
    return accessToken
}

export function createAccessToken(user: IUser) {
    return  jwt.sign(
        {
            "UserInfo": {
                "nickName": user.nickName,
                "roles": user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn: "1d"}
    );
}