import express from 'express'
import {
  estado,
  estados,
  crear,
  actualizar,
  borrar,
  estadosUsuario,
  estadosFechaUsuario,
  estadosOficinaPerfil,
  crearTraspaso,
  borrarTraspaso,
  estadosFechaPerfil,
  actualizarTraspaso,
} from '../controllers/estado.controller'

const apiEstadoRouter = express.Router()

// estados
apiEstadoRouter.post('/estado', estado)
apiEstadoRouter.post('/estados', estados)
apiEstadoRouter.post('/estados/insert', crear)
apiEstadoRouter.post('/estados/delete', borrar)
apiEstadoRouter.post('/estados/update', actualizar)

// usuario
apiEstadoRouter.post('/estados/usuario', estadosUsuario)
apiEstadoRouter.post('/estados/usuarios/fechas', estadosFechaUsuario)
apiEstadoRouter.post('/estados/usuarios/perfiles', estadosFechaPerfil)
apiEstadoRouter.post('/estados/oficinas/perfiles', estadosOficinaPerfil)

// traspaso
apiEstadoRouter.post('/estados/insert/traspaso', crearTraspaso)
apiEstadoRouter.post('/estados/delete/traspaso', borrarTraspaso)
apiEstadoRouter.post('/estados/update/traspasos', actualizarTraspaso)

export default apiEstadoRouter
