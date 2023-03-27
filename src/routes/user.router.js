import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage,
} from '../controllers/user.controller'

const userRouter = express.Router()

// paginas
userRouter.get('/', authRoutes, mainPage)

export default userRouter
