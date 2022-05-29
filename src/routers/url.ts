import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { UrlModel } from "../models/url.model";
import { createShortId } from "../utils/createShortId";

const router = Router();

router.post(
  "/short",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
      const { longUrl } = req.body;

      const user = res.locals.user;

      if (user.usages >= user.limit) {
        return res.status(406).json("Limit Exceeded.");
      }

      let shortId = createShortId();

      while (await UrlModel.findOne({ shortId })) {
        shortId = createShortId();
      }

      const url = await UrlModel.create({
        longUrl,
        userId: user._id,
        domain: user.domain,
        shortId,
      });

      user.usages += 1;
      await user.save();

      return res.status(201).json(`${url.domain}/${url.shortId}`);
    } catch (Error) {
      console.log(Error);
      return res.status(500).json({ message: "Server Error." });
    }
  }
);

router.get(
  "/:shortId",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | object> => {
    try {
      const { shortId } = req.params;

      const urlDetails = await UrlModel.findOne({ shortId });
      if (!urlDetails) {
        return res.status(404).json("URL not found.");
      }
      // Redirect to long url
      return res.redirect(urlDetails.longUrl);
    } catch (Error) {
      return res.status(500).json({ message: "Server Error." });
    }
  }
);

export default router;
