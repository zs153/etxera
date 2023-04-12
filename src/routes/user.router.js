import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage, sendEmail, cleanPage,
} from '../controllers/user.controller'

const userRouter = express.Router()

// paginas
userRouter.get('/', authRoutes, mainPage)
userRouter.get('/clean', authRoutes, cleanPage)

// proc
userRouter.post('/email', authRoutes, sendEmail)

export default userRouter
