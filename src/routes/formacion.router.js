import express from 'express'
import {
  matriculas,
  matricula,
  cursos,
  curso,
} from '../controllers/formacion.controller'

const apiFormacionRouter = express.Router()

// cursos
apiFormacionRouter.post('/formacion/curso', curso)
apiFormacionRouter.post('/formacion/cursos', cursos)
apiFormacionRouter.post('/formacion/matricula', matricula)
apiFormacionRouter.post('/formacion/matriculas', matriculas)

export default apiFormacionRouter
