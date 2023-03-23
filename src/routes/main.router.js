import express from "express";
import { logoutPage, mainPage } from "../controllers/main.controller";

const mainRouter = express.Router();

// acciones
mainRouter.get("/", mainPage);
mainRouter.get("/logout", logoutPage)

export default mainRouter;
