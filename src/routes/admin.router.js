import express from 'express'
import { verifyTokenAndResp } from "../middleware/auth";
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
adminRouter.get('/cartas', verifyTokenAndResp, cartasPage)
adminRouter.get('/cartas/add', verifyTokenAndResp, addPage)
adminRouter.get('/cartas/edit/:id', verifyTokenAndResp, editPage)

// procedures
adminRouter.post('/cartas/insert', verifyTokenAndResp, insert)
adminRouter.post('/cartas/update', verifyTokenAndResp, update)
adminRouter.post('/cartas/delete', verifyTokenAndResp, remove)

export default adminRouter
