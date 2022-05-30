import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { Role } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.resource";
import { UserDocument, UserModel } from "../models/user.model";
import { loginSchema, userSchema } from "../schema/user.schema";
import { hashText, randomString } from "../utils/hash";
import { createdToken } from "../utils/jwt";

const router = Router();

router.get(
  "/add-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("pages/user", { title: "User", apikey: undefined });
    } catch (error) {
      return res.redirect("/error");
    }
  }
);

router.get(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("pages/login", { title: "Login", error: undefined });
    } catch (error) {
      return res.redirect("/error");
    }
  }
);

router.get(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("pages/logout", { title: "Logout" });
    } catch (error) {
      return res.redirect("/error");
    }
  }
);

router.post(
  "/add-users",
  authMiddleware,
  Role("user_create"),
  validate(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, domain } = req.body;

      let user = (await UserModel.findOne({ email })) as UserDocument;
      if (user) {
        return res.render("pages/user", { title: "User", apikey : user.apikey });
      }

      const apikey = randomString();

      user = await UserModel.create({
        email,
        domain,
        apikey: hashText(apikey),
      });

      return res.render("pages/user", { title: "User", apikey });
    } catch (Error) {
      return res.redirect("/error");
    }
  }
);

router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, apikey } = req.body;
      const hashedApiKey = hashText(apikey);

      const user = await UserModel.findOne({ email, apikey: hashedApiKey });

      if (!user) {
        return res.redirect("/login");
      }

      const token = await createdToken(user.email);

      res.cookie("secret", token, { maxAge: 1000 * 60 * 60 * 24 });

      return res.redirect("/");
    } catch (error) {
      return res.render('pages/login', { error });
    }
  }
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("secret");
      return res.redirect("/");
    } catch (error) {
      return res.redirect("/error");
    }
  }
);

export default router;
