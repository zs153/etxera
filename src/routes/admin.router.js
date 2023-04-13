import express from 'express'
import authRoutes from '../middleware/auth'
import {
  addPage,
  cartasPage,
  editPage,
  insert,
  remove,
  update,
} from '../controllers/admin.controller'

const adminRouter = express.Router()

// paginas
adminRouter.get('/cartas', authRoutes, cartasPage)
adminRouter.get('/cartas/add', authRoutes, addPage)
adminRouter.get('/cartas/edit/:id', authRoutes, editPage)

// procedures
adminRouter.post('/cartas/insert', authRoutes, insert)
adminRouter.post('/cartas/update', authRoutes, update)
adminRouter.post('/cartas/delete', authRoutes, remove)

export default adminRouter
