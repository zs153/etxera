import express from "express";
import {
  matricula,
  matriculas,
  usuariosMatricula,
  usuariosPendientes,
  crear,
  modificar,
  borrar,
  crearUsuario,
  borrarUsuario,
} from "../controllers/matricula.controller";

const apiMatriculaRouter = express.Router();

// matricula
apiMatriculaRouter.post("/matricula", matricula);
apiMatriculaRouter.post("/matriculas", matriculas);
apiMatriculaRouter.post("/matriculas/insert", crear);
apiMatriculaRouter.post("/matriculas/update", modificar);
apiMatriculaRouter.post("/matriculas/delete", borrar);

// usuarios
apiMatriculaRouter.post('/matriculas/usuarios', usuariosMatricula)
apiMatriculaRouter.post('/matriculas/usuarios/pendientes', usuariosPendientes)
apiMatriculaRouter.post('/matriculas/usuarios/insert', crearUsuario)
apiMatriculaRouter.post('/matriculas/usuarios/delete', borrarUsuario)

export default apiMatriculaRouter;