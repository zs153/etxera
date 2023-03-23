import express from 'express'
import authRoutes from "../middleware/auth";
import { matriculasPage, cursosPage, quieroMatricularme } from '../controllers/formacion.controller';

const formacionRouter = express.Router()

// pages
formacionRouter.get('/formacion/matriculas', authRoutes, matriculasPage)
formacionRouter.get('/formacion/cursos', authRoutes, cursosPage)

// proc
formacionRouter.post('/formacion/matriculas/usuarios/insert', authRoutes, quieroMatricularme)

export default formacionRouter