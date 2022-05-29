import { NextFunction, Request, Response } from "express";
import { tokenVerification } from "../utils/jwt";
import { UserModel } from './../models/user.model';

type payloadType = {
  email: string,
  iat: number,
  exp: number
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.secret;


  if (!token) {
    return res.status(401).json("Bad Request");
  }

  const payload  = await tokenVerification(token) as payloadType;
 

  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    return res.status(400).json("Unauthorized User.");
  }

  res.locals.user = user;

  next();
};
