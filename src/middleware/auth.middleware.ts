import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { hashText } from "../utils/hash";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { apikey } = req.body;
  const hashApiKey = await hashText(apikey);

  const user = await UserModel.findOne({ apikey: hashApiKey });

  if (!user) {
    return res.status(400).json("UnAuthorized User.");
  }

  res.locals.user = user;

  next();
};
