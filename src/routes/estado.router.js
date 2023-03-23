import express from "express";
import authRoutes from "../middleware/auth";
import { estadosPage, mainPage, } from "../controllers/estado.controller";

const estadoRouter = express.Router();

// paginas
estadoRouter.get("/estados", authRoutes, mainPage);

// proc
estadoRouter.post("/estados/estados", authRoutes, estadosPage);

export default estadoRouter;