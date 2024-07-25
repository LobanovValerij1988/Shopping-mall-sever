import { Request, Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import bcrypt from "bcrypt";
require("dotenv").config();

import {getUserBy} from "../../models/users.model";
import {createAccessToken, userAuth} from "../../helpers/jwtHelpers";
import {IUser} from "../../models/users.mongo";

 export async function login(req: Request<{},{},Pick<IUser, 'nickName' | 'password'>>,   res: Response) {
  const { nickName, password } = req.body;
  if(!nickName || !password){
      return res.status(400).send({
          error: 'All fields are required'
      })
  }
  const foundUser = await getUserBy({nickName});

  if(!foundUser || !foundUser.activeStatus){
      return res.status(401).send({error: 'Unauthorized'});
  }
  const  isPasswordsMatch = await bcrypt.compare(password, foundUser.password);
  if(!isPasswordsMatch){
      return res.status(401).send({error: 'Unauthorized'})
  }
  const accessToken = await userAuth(res, foundUser);
  res.status(200).json({accessToken})
}

export async function refresh(req: Request , res: Response) {
  const cookies = req.cookies;
  if(!cookies?.jwt){
      return res.status(401).json({error: 'Unauthorized'});
  }

  const refreshToken: string = cookies.jwt;

  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async (err: Error | null, decodedToken) => {
          if(err || !decodedToken) {
              return res.status(401).send({error: 'Forbidden'});
          }
          const foundUser = await getUserBy({nickName: (decodedToken as JwtPayload ).UserInfo.nickName});

          if(!foundUser){
              return res.status(401).json({error: 'Unauthorized'});
          }

          const accessToken =  createAccessToken(foundUser)

          res.json({accessToken});
      }
  );

}

export async function logout(req: Request , res: Response) {
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }

    res.clearCookie('jwt',
            {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }
        );

    res.json({message: "Cookie cleared"});
}
