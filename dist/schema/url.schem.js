"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlSchema = exports.postUrlSchema = void 0;
const yup_1 = require("yup");
exports.postUrlSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        longUrl: (0, yup_1.string)().required("Long Url is required."),
    }),
});
exports.getUrlSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        shortId: (0, yup_1.string)().required("shortId is required."),
    }),
});
