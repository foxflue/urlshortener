import { NextFunction, Request, Response } from 'express';
import { UserDocument, UserModel } from '../models/user.model';
import { hashText } from '../utils/hash';



export const validatedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { apikey } = req.body;
        const hashedApiKey = hashText(apikey);

      const user = (await UserModel.findOne({ apikey: hashedApiKey })) as UserDocument;

      if (!user) {
        return res.status(406).json({ message: "UnAuthorized User." });
        }
        
        res.locals.user = user;

        next();
    } catch (error) {
        next(error);
    }
}