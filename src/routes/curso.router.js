import express from "express";
import {
  curso,
  cursos,
  crear,
  modificar,
  borrar,
  turno,
  turnos,
  crearTurno,
  modificarTurno,
  borrarTurno,
  usuarios,
  crearUsuario,
  borrarUsuario,
  usuariosTurno,
  usuariosTurnoPendientes,
  crearUsuarioTurno,
  borrarUsuarioTurno,
  matricula,
  matriculas,
  crearMatricula,
  modificarMatricula,
  borrarMatricula,
  usuariosMatricula,
  crearUsuarioMatricula,
  borrarUsuarioMatricula,
  usuariosPendientes,
} from "../controllers/curso.controller";

const apiCursoRouter = express.Router();

// cursos
apiCursoRouter.post("/curso", curso);
apiCursoRouter.post("/cursos", cursos);
apiCursoRouter.post("/cursos/insert", crear);
apiCursoRouter.post("/cursos/update", modificar);
apiCursoRouter.post("/cursos/delete", borrar);

// turnos
apiCursoRouter.post("/cursos/turno", turno);
apiCursoRouter.post('/cursos/turnos', turnos)
apiCursoRouter.post('/cursos/turnos/insert', crearTurno)
apiCursoRouter.post('/cursos/turnos/update', modificarTurno)
apiCursoRouter.post('/cursos/turnos/delete', borrarTurno)

// matriculas
apiCursoRouter.post("/cursos/matricula", matricula);
apiCursoRouter.post('/cursos/matriculas', matriculas)
apiCursoRouter.post('/cursos/matriculas/insert', crearMatricula)
apiCursoRouter.post('/cursos/matriculas/update', modificarMatricula)
apiCursoRouter.post('/cursos/matriculas/delete', borrarMatricula)

// usuarios curso
apiCursoRouter.post('/cursos/usuarios', usuarios)
apiCursoRouter.post('/cursos/usuarios/pendientes', usuariosPendientes)
apiCursoRouter.post('/cursos/usuarios/insert', crearUsuario)
apiCursoRouter.post('/cursos/usuarios/delete', borrarUsuario)

// usuarios turno
apiCursoRouter.post('/cursos/turnos/usuarios', usuariosTurno)
apiCursoRouter.post('/cursos/turnos/usuarios/pendientes', usuariosTurnoPendientes)
apiCursoRouter.post('/cursos/turnos/usuarios/insert', crearUsuarioTurno)
apiCursoRouter.post('/cursos/turnos/usuarios/delete', borrarUsuarioTurno)

// usuarios matricula
apiCursoRouter.post('/cursos/matriculas/usuarios', usuariosMatricula)
apiCursoRouter.post('/cursos/matriculas/usuarios/insert', crearUsuarioMatricula)
apiCursoRouter.post('/cursos/matriculas/usuarios/delete', borrarUsuarioMatricula)

export default apiCursoRouter;