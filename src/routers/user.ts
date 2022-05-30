import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { isLoggedIn } from "../middleware/isLoggedIn.middleware";
import { Role } from "../middleware/role.middleware";
import { UserDocument, UserModel } from "../models/user.model";
import { loginSchema, userSchema } from "../schema/user.schema";
import { hashText, randomString } from "../utils/hash";
import { createdToken } from "../utils/jwt";

const router = Router();

router.get(
  "/add-users",
  isLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.render("pages/user", { title: "User", apikey: undefined , error : undefined});
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
  isLoggedIn,
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userSchema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      const { email, domain } = req.body;

      let user = (await UserModel.findOne({ email })) as UserDocument;
      if (user) {
        return res.render("pages/user", { title: "User", apikey: user.apikey , error: undefined});
      }

      const apikey = randomString();

      user = await UserModel.create({
        email,
        domain,
        apikey: hashText(apikey),
      });

      return res.render("pages/user", { title: "User", apikey , error : undefined});
    } catch (error) {
      return res.render("pages/user", { title : "User", apikey : undefined, error });
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginSchema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      const { email, apikey } = req.body;
      const hashedApiKey = hashText(apikey);

      const user = await UserModel.findOne({ email, apikey: hashedApiKey });

      if (!user) {
        return res.render("pages/login", { title : 'Login', error : "User Not Found."});
      }

      const token = await createdToken(user.email);

      res.cookie("secret", token, { maxAge: 1000 * 60 * 60 * 24 });

      return res.redirect("/add-users");
    } catch (error) {
      return res.render("pages/login", { title: "login", error });
    }
  }
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("secret");
      return res.redirect("/login");
    } catch (error) {
      return res.redirect("/error");
    }
  }
);

export default router;
