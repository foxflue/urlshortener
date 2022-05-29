import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { mongoConnect } from "./db/connect";
import urlRouter from "./routers/url";
import userRouter from "./routers/user";

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

console.log(path.join(__dirname, "../public"));

mongoConnect();

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.render('pages/home', { title: 'Home' });
  } catch (error) {
    return res.redirect('/error');
  }
})
 
app.use(userRouter);
app.use(urlRouter);

app.get('/error',async (req: Request, res: Response, next: NextFunction) => {
    return res.render('pages/error', { title: 'Error' });
  
})
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
