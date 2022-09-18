import express from "express";
import morgan from "morgan";
import session from "express-session";
import { localsMiddleware } from "./localsMiddleware";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import "./db";
import recipeRouter from "./routers/recipeRouter";

const app = express();
const PORT = 4002;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "annyeong",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/recipes", recipeRouter);

app.listen(PORT, () =>
  console.log(`🍰 server listening: http://localhost:${PORT}`)
);
