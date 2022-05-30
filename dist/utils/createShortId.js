"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortId = void 0;
const nanoid_1 = require("nanoid");
const createShortId = (size) => (0, nanoid_1.customAlphabet)("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-", size || 7)();
exports.createShortId = createShortId;
