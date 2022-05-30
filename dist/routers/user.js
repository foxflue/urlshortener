"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const isLoggedIn_middleware_1 = require("../middleware/isLoggedIn.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const user_model_1 = require("../models/user.model");
const user_schema_1 = require("../schema/user.schema");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
router.get("/add-users", isLoggedIn_middleware_1.isLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.render("pages/user", {
            title: "User",
            apikey: undefined,
            error: undefined,
        });
    }
    catch (error) {
        return res.redirect("/error");
    }
}));
router.get("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("pages/login", { title: "Login", error: undefined });
    }
    catch (error) {
        return res.redirect("/error");
    }
}));
router.get("/logout", isLoggedIn_middleware_1.isLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("pages/logout", { title: "Logout" });
    }
    catch (error) {
        return res.redirect("/error");
    }
}));
router.post("/add-users", auth_middleware_1.authMiddleware, (0, role_middleware_1.Role)("user_create"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_schema_1.userSchema.validate({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        const { email, domain } = req.body;
        let user = (yield user_model_1.UserModel.findOne({ email }));
        if (user) {
            return res.render("pages/user", {
                title: "User",
                apikey: user.apikey,
                error: undefined,
            });
        }
        const apikey = (0, hash_1.randomString)();
        user = yield user_model_1.UserModel.create({
            email,
            domain,
            apikey: (0, hash_1.hashText)(apikey),
        });
        return res.render("pages/user", {
            title: "User",
            apikey,
            error: undefined,
        });
    }
    catch (error) {
        return res.render("pages/user", {
            title: "User",
            apikey: undefined,
            error,
        });
    }
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_schema_1.loginSchema.validate({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        const { email, apikey } = req.body;
        const hashedApiKey = (0, hash_1.hashText)(apikey);
        const user = yield user_model_1.UserModel.findOne({ email, apikey: hashedApiKey });
        if (!user) {
            return res.render("pages/login", {
                title: "Login",
                error: "User Not Found.",
            });
        }
        const token = yield (0, jwt_1.createdToken)(user.email);
        res.cookie("secret", token, { maxAge: 1000 * 60 * 60 * 24 });
        return res.redirect("/add-users");
    }
    catch (error) {
        return res.render("pages/login", { title: "login", error });
    }
}));
router.post("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("secret");
        return res.redirect("/login");
    }
    catch (error) {
        return res.redirect("/error");
    }
}));
exports.default = router;
