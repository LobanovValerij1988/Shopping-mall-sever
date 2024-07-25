import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
import {IUser, role} from "../models/users.mongo";

declare module "jsonwebtoken" {
    export interface JwtPayload {
        UserInfo: Pick<IUser,"nickName"|"roles">
    }
}

export interface RequestCustom extends Request
{
    nickName: string;
    roles: role[]
}

export const verifyJWT = async (req:Request, res:Response, next:  NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization?.toString();
  if(!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
          error: 'not Authorized',
      });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        async (err:any, decodedToken ) => {
            if(err || !decodedToken) {
                return res.status(401).json({
                    error: "expired",
                });
            }
            (req as RequestCustom).nickName = (decodedToken as JwtPayload).UserInfo.nickName;
            (req as RequestCustom).roles = (decodedToken as JwtPayload).UserInfo.roles;
            next();
        }
    );
}
