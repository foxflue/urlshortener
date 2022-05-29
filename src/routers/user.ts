import { NextFunction, Request, Response, Router } from "express";
import { UserModel } from "../models/user.model";
import { hashText, randomString } from "../utils/hash";

const router = Router();

router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
      const { email } = req.body;

      let user = await UserModel.findOne({ email });
      if (user) {
        return res.status(200).json(user);
      }

      const apikey = randomString();

      user = await UserModel.create({
        email,
        domain: user.domain,
        apikey: hashText(apikey),
      });

      return res.status(200).json({
        apikey,
      });
    } catch (Error) {
      console.log(Error);
      return res.status(500).json({ message: "Server Error." });
    }
  }
);

export default router;
