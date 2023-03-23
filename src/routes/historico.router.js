import express from 'express'
import {verifyTokenAndResp} from "../middleware/auth";
import {
  mainPage,
  activar,
} from '../controllers/historico.controller'

const historicoRouter = express.Router()

// pages
historicoRouter.get('/historicos', verifyTokenAndResp, mainPage)

// procedures
historicoRouter.post('/historicos/activar', verifyTokenAndResp, activar)

export default historicoRouter
