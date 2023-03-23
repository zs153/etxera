import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  usuariosPage,
  usuariosAddPage,
  insert,
  update,
  remove,
  insertUsuario,
  deleteUsuario,
} from "../controllers/matricula.controller";

const matriculaRouter = express.Router();

// paginas matriculas
matriculaRouter.get("/matriculas", authRoutes, mainPage);
matriculaRouter.get("/matriculas/add", authRoutes, addPage);
matriculaRouter.get("/matriculas/edit/:id", authRoutes, editPage);

// paginas usuarios
matriculaRouter.get("/matriculas/usuarios/:id", authRoutes, usuariosPage);
matriculaRouter.get("/matriculas/usuarios/add/:id", authRoutes, usuariosAddPage);

// proc matriculas
matriculaRouter.post("/matriculas/insert", authRoutes, insert);
matriculaRouter.post("/matriculas/update", authRoutes, update);
matriculaRouter.post("/matriculas/delete", authRoutes, remove);

// proc usuarios
matriculaRouter.post("/matriculas/usuarios/insert", authRoutes, insertUsuario);
matriculaRouter.post("/matriculas/usuarios/delete", authRoutes, deleteUsuario);

export default matriculaRouter;