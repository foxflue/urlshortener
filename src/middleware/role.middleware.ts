import { NextFunction, Request, Response } from "express";

export const Role = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user.roles.includes(role)) {
      return res.status(406).send("Unathorized user.");
    }

    next();
  };
};
