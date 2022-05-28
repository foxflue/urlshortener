import { NextFunction, Request, Response, Router } from "express";
import { nanoid } from "nanoid";
import { authMiddleware } from "../middleware/auth.middleware";
import { UrlModel } from "../models/url.model";

const router = Router();

router.post(
  "/short",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
      const { longUrl } = req.body;

      const user = res.locals.user;

      if (user.usages >= user.limit) {
        return res.status(406).json("Your limit is Over.Get Prime right now.");
      }

      const url = await UrlModel.create({
        longUrl,
        userId: user._id,
        shortId: nanoid(),
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
  "/get-url-details",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
      const { longUrl } = req.body;

      const user = res.locals.user;

      const urlDetails = await UrlModel.findOne({ longUrl, userId: user._id });
      if (!urlDetails) {
        return res.status(404).json("Not Found.");
      }

      return res.status(200).json(urlDetails);
    } catch (Error) {
      console.log({ Error });
      return res.status(500).json({ message: "Server Error." });
    }
  }
);

export default router;
