import { NextFunction, Request, Response } from "express";

export const isLoggedIn = async(req: Request, res:Response, next : NextFunction) => {
    try {
        if (!req.cookies.secret) {
            return res.redirect('/login');
        }
        next();
    } catch (error) {
        return res.redirect('/error');
    }
}