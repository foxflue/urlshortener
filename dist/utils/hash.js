"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashText = exports.randomString = void 0;
const crypto_1 = require("crypto");
const randomString = (size) => (0, crypto_1.randomBytes)(size || 16).toString("hex");
exports.randomString = randomString;
const salt = process.env.SALT;
const hashText = (text) => (0, crypto_1.createHmac)("sha256", salt).update(text).digest("hex");
exports.hashText = hashText;
