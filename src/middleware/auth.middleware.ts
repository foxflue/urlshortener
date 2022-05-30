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
    return res.redirect('/login');
  }

  const payload  = await tokenVerification(token) as payloadType;
 

  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    return res.render("pages/user", { title : "User", apikey : undefined, error : 'Unauthorized User'});
  }

  res.locals.user = user;

  next();
};
