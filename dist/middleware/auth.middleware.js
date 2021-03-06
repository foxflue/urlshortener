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
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const user_model_1 = require("./../models/user.model");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.secret;
    if (!token) {
        return res.redirect('/login');
    }
    const payload = yield (0, jwt_1.tokenVerification)(token);
    const user = yield user_model_1.UserModel.findOne({ email: payload.email });
    if (!user) {
        return res.render("pages/user", { title: "User", apikey: undefined, error: 'Unauthorized User' });
    }
    res.locals.user = user;
    next();
});
exports.authMiddleware = authMiddleware;
