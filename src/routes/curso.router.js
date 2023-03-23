import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  turnosPage,
  addTurnoPage,
  editTurnoPage,
  usuariosPage,
  usuariosTurnoPage,
  usuariosTurnoAddPage,
  insert,
  update,
  remove,
  insertTurno,
  updateTurno,
  deleteTurno,
  insertUsuario,
  deleteUsuario,
  insertUsuarioTurno,
  deleteUsuarioTurno,
  matriculasPage,
  addMatriculaPage,
  editMatriculaPage,
  insertMatricula,
  updateMatricula,
  deleteMatricula,
  usuariosMatriculaPage,
  usuariosMatriculaAddPage,
  insertUsuarioMatricula,
  deleteUsuarioMatricula,
  usuariosAddPage,
} from "../controllers/curso.controller";

const cursoRouter = express.Router();

// paginas cursos
cursoRouter.get("/cursos", authRoutes, mainPage);
cursoRouter.get("/cursos/add", authRoutes, addPage);
cursoRouter.get("/cursos/edit/:id", authRoutes, editPage);

// paginas turnos
cursoRouter.get("/cursos/turnos/:id", authRoutes, turnosPage);
cursoRouter.get("/cursos/turnos/add/:id", authRoutes, addTurnoPage);
cursoRouter.get("/cursos/turnos/edit/:idcurs/:idturn", authRoutes, editTurnoPage);

// paginas matriculas
cursoRouter.get("/cursos/matriculas/:id", authRoutes, matriculasPage);
cursoRouter.get("/cursos/matriculas/add/:id", authRoutes, addMatriculaPage);
cursoRouter.get("/cursos/matriculas/edit/:idcurs/:idmatr", authRoutes, editMatriculaPage);

// paginas usuarios
cursoRouter.get("/cursos/usuarios/:id", authRoutes, usuariosPage);
cursoRouter.get("/cursos/usuarios/add/:idcurs", authRoutes, usuariosAddPage);

// paginas usuarios turno
cursoRouter.get("/cursos/turnos/usuarios/:idcurs/:idturn", authRoutes, usuariosTurnoPage);
cursoRouter.get("/cursos/turnos/usuarios/add/:idcurs/:idturn", authRoutes, usuariosTurnoAddPage);

// paginas usuarios matricula
cursoRouter.get("/cursos/matriculas/usuarios/:idcurs/:idmatr", authRoutes, usuariosMatriculaPage);
cursoRouter.get("/cursos/matriculas/usuarios/add/:idcurs/:idmatr", authRoutes, usuariosMatriculaAddPage);

// proc cursos
cursoRouter.post("/cursos/insert", authRoutes, insert);
cursoRouter.post("/cursos/update", authRoutes, update);
cursoRouter.post("/cursos/delete", authRoutes, remove);

// proc turnos
cursoRouter.post("/cursos/turnos/insert", authRoutes, insertTurno);
cursoRouter.post("/cursos/turnos/update", authRoutes, updateTurno);
cursoRouter.post("/cursos/turnos/delete", authRoutes, deleteTurno);

// proc matriculas
cursoRouter.post("/cursos/matriculas/insert", authRoutes, insertMatricula);
cursoRouter.post("/cursos/matriculas/update", authRoutes, updateMatricula);
cursoRouter.post("/cursos/matriculas/delete", authRoutes, deleteMatricula);

// proc usuarios curso
cursoRouter.post("/cursos/usuarios/insert", authRoutes, insertUsuario);
cursoRouter.post("/cursos/usuarios/delete", authRoutes, deleteUsuario);

// proc usuarios turno
cursoRouter.post("/cursos/turnos/usuarios/insert", authRoutes, insertUsuarioTurno);
cursoRouter.post("/cursos/turnos/usuarios/delete", authRoutes, deleteUsuarioTurno);

// proc usuarios matricula
cursoRouter.post("/cursos/matriculas/usuarios/insert", authRoutes, insertUsuarioMatricula);
cursoRouter.post("/cursos/matriculas/usuarios/delete", authRoutes, deleteUsuarioMatricula);

export default cursoRouter;