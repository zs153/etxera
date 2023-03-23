import express from 'express'
import {
  festivo,
  festivos,
  crear,
  actualizar,
  borrar,
  festivosOficina,
  festivosLocal,
} from '../controllers/festivo.controller'

const apiFestivoRouter = express.Router()

// festivos
apiFestivoRouter.post('/festivo', festivo)
apiFestivoRouter.post('/festivos', festivos)
apiFestivoRouter.post('/festivos/insert', crear)
apiFestivoRouter.post('/festivos/delete', borrar)
apiFestivoRouter.post('/festivos/update', actualizar)

// proc
apiFestivoRouter.post('/festivos/oficinas', festivosOficina)
apiFestivoRouter.post('/festivos/locales', festivosLocal)

export default apiFestivoRouter
