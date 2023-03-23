import http from 'http'
import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { port } from '../config/settings'
// routes
import apiOficinaRouter from '../routes/oficina.router'
import apiUsuarioRouter from '../routes/usuario.router'
import apiMatriculaRouter from '../routes/matricula.router'
import apiCursoRouter from '../routes/curso.router'
import apiEstadoRouter from '../routes/estado.router'
import apiFestivoRouter from '../routes/festivo.router'
import apiHistoricoRouter from '../routes/historico.router'
import apiFormacionRouter from '../routes/formacion.router'

let httpServer

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express()
    httpServer = http.createServer(app)

    // middleware
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors())
    // app.use(express.static(path.join(__dirname, '/public')))

    // routes
    app.use('/api', apiOficinaRouter)
    app.use('/api', apiUsuarioRouter)
    app.use('/api', apiMatriculaRouter)
    app.use('/api', apiCursoRouter)
    app.use('/api', apiEstadoRouter)
    app.use('/api', apiFestivoRouter)
    app.use('/api', apiHistoricoRouter)
    app.use('/api', apiFormacionRouter)

    // server
    httpServer
      .listen(port)
      .on('listening', () => {
        console.log(`Web server listening on conexion: port:${port} `)

        resolve()
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

module.exports.initialize = initialize

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

module.exports.close = close

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value)
  } else {
    return value
  }
}
