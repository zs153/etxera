import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from 'path'

// import rutas
import adminRouter from "./routes/admin.router";
import calendarioRouter from "./routes/calendario.router";
import cursoRouter from "./routes/curso.router";
import estadoRouter from "./routes/estado.router";
import festivoRouter from "./routes/festivo.router";
import historicoRouter from "./routes/historico.router";
import mainRouter from "./routes/main.router";
import matriculaRouter from "./routes/matricula.router";
import oficinaRouter from "./routes/oficina.router";
import traspasoRouter from "./routes/traspaso.router";
import usuarioRouter from "./routes/usuario.router";
import formacionRouter from "./routes/formacion.route";

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

// admin routes
app.use("/", mainRouter);
app.use("/admin", adminRouter);
app.use("/admin", calendarioRouter);
app.use("/admin", cursoRouter);
app.use("/admin", estadoRouter);
app.use("/admin", festivoRouter);
app.use("/admin", historicoRouter);
app.use("/admin", matriculaRouter);
app.use("/admin", oficinaRouter);
app.use("/admin", traspasoRouter);
app.use("/admin", usuarioRouter);
app.use("/admin", formacionRouter);

export default app;
