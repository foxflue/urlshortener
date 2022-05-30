import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { Role } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.resource";
import { UrlModel } from "../models/url.model";
import { getUrlSchema, postUrlSchema } from "../schema/url.schem";
import { createShortId } from "../utils/createShortId";

const router = Router();

router.get(
  "/short",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.render("pages/url", { title: "Url", shortUrl: undefined });
    } catch (error) {
      return res.redirect("/error");
    }
  }
);

router.post(
  "/short",
  authMiddleware,
  Role("url_create"),
  validate(postUrlSchema),
  async (req: Request, res: Response, next: NextFunction) => {
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

      return res.render("pages/url", {
        title: "Url",
        shortUrl: `${url.domain}/${url.shortId}`,
      });
    } catch (Error) {
      return res.redirect('/');
    }
  }
);

router.get(
  "/:shortId",
  authMiddleware,
  Role('url_view'),
  validate(getUrlSchema),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | object> => {
    try {
      const { shortId } = req.params;

      const urlDetails = await UrlModel.findOne({ shortId });
      if (!urlDetails) {
        return res.status(404).send("URL not found.");
      }
      // Redirect to long url
      return res.redirect(urlDetails.longUrl);
    } catch (Error) {
      return res.redirect('/error');
    }
  }
);

export default router;
