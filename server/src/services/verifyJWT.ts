import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';
import {IUser, role} from "../models/users.mongo";
import {getUserBy} from "../models/users.model";

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
            const nickName = (decodedToken as JwtPayload).UserInfo.nickName
            const user = await getUserBy({nickName});
            if(!user) {
                return res.status(400).json({
                    error: "unknown user",
                });
            }
            (req as RequestCustom).nickName = user.nickName;
            (req as RequestCustom).roles = user.roles;
            next();
        }
    );
}
