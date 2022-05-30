"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
    },
    domain: {
        type: String,
        required: [true, "Domain is required."],
    },
    roles: {
        type: [String],
        enum: [
            "user_create",
            "user_delete",
            "user_view",
            "url_create",
            "url_view",
        ],
    },
    apikey: {
        type: String,
    },
    limit: {
        type: Number,
        default: 1000,
    },
    usages: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)("users", userSchema);
