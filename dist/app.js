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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const connect_1 = require("./db/connect");
const url_1 = __importDefault(require("./routers/url"));
const user_1 = __importDefault(require("./routers/user"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname + "/views"));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
console.log(path_1.default.join(__dirname, "../public"));
(0, connect_1.mongoConnect)();
app.use(user_1.default);
app.use(url_1.default);
app.get('/error', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.render('pages/error', { title: 'Error' });
}));
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
