import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from 'path'

// main
import mainRouter from "./routes/main.router";
// user
import userRouter from "./routes/user.router";
// admin
import adminRouter from "./routes/admin.router";
import usuarioRouter from "./routes/usuario.router";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
//app.use('/templates', express.static(process.cwd() + "/templates"));

// main route
app.use("/", mainRouter);

// user routes
app.use("/user", userRouter);

// admin routes
app.use("/admin", adminRouter);
app.use("/admin", usuarioRouter);

export default app;
