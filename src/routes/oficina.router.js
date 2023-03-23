import express from 'express'
import {
  oficina,
  oficinas,
  crear,
  modificar,
  borrar,
} from '../controllers/oficina.controller'

const apiOficinaRouter = express.Router()

// oficinas
apiOficinaRouter.post('/oficina', oficina)
apiOficinaRouter.post('/oficinas', oficinas)
apiOficinaRouter.post('/oficinas/insert', crear)
apiOficinaRouter.post('/oficinas/update', modificar)
apiOficinaRouter.post('/oficinas/delete', borrar)

export default apiOficinaRouter
