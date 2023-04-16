import express from "express";
import authRoutes from '../middleware/auth'
import { changePassword, cleanPage, logoutPage, mainPage, perfilPage, updatePerfil } from "../controllers/main.controller";

const mainRouter = express.Router();

// paginas
mainRouter.get("/", mainPage);
mainRouter.get('/clean', authRoutes, cleanPage)
// mainRouter.get('/perfil/:userid', authRoutes, perfilPage)
// mainRouter.get("/logout", logoutPage)

// procedures
// mainRouter.post('/cambio', authRoutes, changePassword)
// mainRouter.post('/perfil', authRoutes, updatePerfil)

export default mainRouter;
