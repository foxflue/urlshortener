import { NextFunction, Request, Response, Router } from "express";
import { UserModel } from "../models/user.model";
import { hashText, reandomText } from "../utils/hash";

const router = Router();

router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
      const { siteUrl } = req.body;

      let user = await UserModel.findOne({ siteUrl });
      if (user) {
        return res.status(200).json(user);
      }

      const apikey = reandomText();

      user = await UserModel.create({
        siteUrl,
        apikey: await hashText(apikey),
      });

      return res.status(200).json({
        apikey,
      });
    } catch (Error) {
      return res.status(500).json({ message: "Server Error." });
    }
  }
);

export default router;
