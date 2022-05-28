import dotenv from "dotenv";
import express from "express";
import { mongoConnect } from "./db/connect";
import urlRouter from "./routers/url";
import userRouter from "./routers/user";

const app = express();

dotenv.config();
app.use(express.json());

mongoConnect();

app.use(userRouter);
app.use(urlRouter);

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
