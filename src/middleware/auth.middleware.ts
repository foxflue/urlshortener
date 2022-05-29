import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { hashText } from "../utils/hash";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { apikey } = req.query;

  if (!apikey) {
    return res.status(401).json("API Key is required.");
  }

  const hashedApiKey = hashText(apikey as string);

  const user = await UserModel.findOne({ apikey: hashedApiKey });

  if (!user) {
    return res.status(400).json("Unauthorized User.");
  }

  res.locals.user = user;

  next();
};
