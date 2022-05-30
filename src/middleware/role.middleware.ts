import { NextFunction, Request, Response } from "express";

export const Role = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user.roles.includes(role)) {
      return res.render("pages/user", { title : "User", apikey : undefined, error : 'Unauthorized User'});
    }

    next();
  };
};
