import { NextFunction, Request, Response } from "express";
import { UserDocument, UserModel } from "../models/user.model";
import { hashText } from "../utils/hash";

export const apiAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { apikey } = req.query;

    if (apikey === undefined || apikey === "") {
      return res.status(401).json({ message: "API Key is missing" });
    }

    const hashedApiKey = hashText(apikey as string);

    const user = (await UserModel.findOne({
      apikey: hashedApiKey,
    })) as UserDocument;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
