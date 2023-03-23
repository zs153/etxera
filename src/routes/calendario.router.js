import express from "express";
import authRoutes from "../middleware/auth";
import {
  userPage,
  adminPage,
  calendarioUser,
  updateUser,
  calendarioAdmin,
  updateAdmin,
} from "../controllers/calendario.controller";

const calendarioRouter = express.Router();

// paginas
calendarioRouter.get("/calendario", authRoutes, userPage);
calendarioRouter.get("/calendarios", authRoutes, adminPage);
calendarioRouter.get("/calendarios/calendarios", authRoutes, calendarioAdmin);

// proc
calendarioRouter.post("/calendarios/calendario", authRoutes, calendarioUser);
calendarioRouter.post("/calendarios/updateUser", authRoutes, updateUser);
calendarioRouter.post("/calendarios/updateAdmin", authRoutes, updateAdmin);

export default calendarioRouter;