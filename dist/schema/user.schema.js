"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userSchema = void 0;
const yup_1 = require("yup");
exports.userSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .trim()
            .required("Email is required.")
            .email("Must be a valid Email."),
        domain: (0, yup_1.string)().required("Domain is required."),
    }),
});
exports.loginSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .trim()
            .required("Email is required.")
            .email("Must be a valid Email."),
        apikey: (0, yup_1.string)().required("Api Key is required."),
    }),
});
