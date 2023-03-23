import express from "express";
import authRoutes from "../middleware/auth";
import {
  calendario,
  mainPage,
  update,
} from "../controllers/traspaso.controller";

const traspasoRouter = express.Router();

// pages
traspasoRouter.get("/traspasos/:idofic", authRoutes, mainPage);

// proc 
traspasoRouter.post("/traspasos/calendario", authRoutes, calendario);
traspasoRouter.post("/traspasos/update", authRoutes, update);

export default traspasoRouter;
