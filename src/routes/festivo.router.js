import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  update,
  calendario,
} from "../controllers/festivo.controller";

const festivoRouter = express.Router();

// paginas
festivoRouter.get("/festivos", authRoutes, mainPage);

// proc 
festivoRouter.post("/festivos/calendario", authRoutes, calendario);
festivoRouter.post("/festivos/update", authRoutes, update);

export default festivoRouter;