import { NextFunction, Request, Response, Router } from "express";
import { generate } from "shortid";
import { UrlModel } from "../models/url.model";
import { UserModel } from "../models/user.model";
import { hashText } from "../utils/hash";

const router = Router();

router.post(
  "/url-shortner",
  async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
      const { apikey, longUrl } = req.body;
      const hashApiKey = await hashText(apikey);

      const user = await UserModel.findOne({ apikey: hashApiKey });

      if (!user) {
        return res.status(400).json("Bad Request.");
      }

      if (user.usages >= user.limit) {
        return res.status(406).json("Your limit is Over.Get Prime right now.");
      }

      const url = await UrlModel.create({
        longUrl,
        userId: user._id,
        shortId: generate(),
        domain: "http://localhost:1337",
      });

      user.usages += 1;
      await user.save();

      return res.status(201).json(url);
    } catch (Error) {
      console.log({ Error });
      return res.status(500).json({ message: "Server Error." });
    }
  }
);

router.get(
  "/url-shortner",
  async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
      const { apikey, longUrl } = req.body;
      const hashApiKey = await hashText(apikey);

      const user = await UserModel.findOne({ apikey: hashApiKey });

      const urlDetails = await UrlModel.findOne({ longUrl });
      if (!urlDetails) {
        return res.status(404).json("Not Found.");
      }
      if (user._id !== urlDetails.userId) {
        return res.status(406).json("UnAothorized User.");
      }

      return res.status(200).json(urlDetails);
    } catch (Error) {
      console.log({ Error });
      return res.status(500).json({ message: "Server Error." });
    }
  }
);

export default router;
