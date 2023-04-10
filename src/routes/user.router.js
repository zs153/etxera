import express from 'express'
import authRoutes from '../middleware/auth'
import {
  mainPage, sendEmail,
} from '../controllers/user.controller'

const userRouter = express.Router()

// paginas
userRouter.get('/', authRoutes, mainPage)

// proc
userRouter.post('/email', authRoutes, sendEmail)

export default userRouter
