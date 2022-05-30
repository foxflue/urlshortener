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
exports.apiAuth = void 0;
const user_model_1 = require("../models/user.model");
const hash_1 = require("../utils/hash");
const apiAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { apikey } = req.query;
        if (apikey === undefined || apikey === "") {
            return res.status(401).json({ message: "API Key is missing" });
        }
        const hashedApiKey = (0, hash_1.hashText)(apikey);
        const user = (yield user_model_1.UserModel.findOne({
            apikey: hashedApiKey,
        }));
        if (!user) {
            return res.status(401).json({ message: "Unauthorized User" });
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.apiAuth = apiAuth;
