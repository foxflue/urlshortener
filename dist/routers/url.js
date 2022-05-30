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
const api_middleware_1 = require("../middleware/api.middleware");
const url_model_1 = require("../models/url.model");
const createShortId_1 = require("../utils/createShortId");
const router = (0, express_1.Router)();
router.post("/short", api_middleware_1.apiAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { longUrl } = req.body;
        const user = res.locals.user;
        if (user.usages >= user.limit) {
            return res.status(406).json({ message: "Limit Exceeded." });
        }
        let shortId = (0, createShortId_1.createShortId)();
        while (yield url_model_1.UrlModel.findOne({ shortId })) {
            shortId = (0, createShortId_1.createShortId)();
        }
        const url = yield url_model_1.UrlModel.create({
            longUrl,
            userId: user._id,
            domain: user.domain,
            shortId,
        });
        user.usages += 1;
        yield user.save();
        return res.status(200).json({
            shortUrl: `${url.domain}/${url.shortId}`,
        });
    }
    catch (Error) {
        return res.status(500).json({ Message: "Server Error" });
    }
}));
router.get("/:shortId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortId } = req.params;
        const urlDetails = yield url_model_1.UrlModel.findOne({ shortId });
        if (!urlDetails) {
            return res.status(404).send("URL not found.");
        }
        // Redirect to long url
        return res.redirect(urlDetails.longUrl);
    }
    catch (Error) {
        return res.status(500).json({ Message: "Server Error" });
    }
}));
exports.default = router;
