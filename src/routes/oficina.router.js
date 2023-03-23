import express from 'express'
import {verifyTokenAndAdmin} from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/oficina.controller'

const oficinaRouter = express.Router()

// paginas
oficinaRouter.get('/oficinas', verifyTokenAndAdmin, mainPage)
oficinaRouter.get('/oficinas/add', verifyTokenAndAdmin, addPage)
oficinaRouter.get('/oficinas/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
oficinaRouter.post('/oficinas/insert', verifyTokenAndAdmin, insert)
oficinaRouter.post('/oficinas/update', verifyTokenAndAdmin, update)
oficinaRouter.post('/oficinas/delete', verifyTokenAndAdmin, remove)

export default oficinaRouter
