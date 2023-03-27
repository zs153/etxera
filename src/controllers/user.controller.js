import axios from 'axios'
import { puertoAPI, serverAPI } from '../config/settings'

export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let hasPrevCartas = false
  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let context = {}

  if (cursor) {
    hasPrevCartas = true
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: '',
        prev: '',
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas`, {
      context,
    })

    let cartas = result.data.data
    let hasNextCartas = cartas.length === limit +1
    let nextCursor = ''
    let prevCursor = ''
    
    if (hasNextCartas) {
      const nextCursorCarta = dir === 'next' ? cartas[limit - 1] : cartas[0]
      const prevCursorCarta = dir === 'next' ? cartas[0] : cartas[limit - 1]
      nextCursor = nextCursorCarta.DESCAR
      prevCursor = prevCursorCarta.DESCAR

      cartas.pop()
    } else {
      if (dir === 'prev') {
        context = {
          limit: limit + 1,
          direction: 'next',
          cursor: {
            next: '',
            prev: ''
          },
          part,
        }
        
        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas`, {
          context,
        })
        
        cartas = result.data.data
        hasNextCartas = cartas.length === limit + 1
        
        if (hasNextCartas) {
          const nextCursorCarta = cartas[limit - 1]
          const prevCursorCarta = cartas[0]
          nextCursor = nextCursorCarta.DESCAR
          prevCursor = prevCursorCarta.DESCAR
          
          cartas.pop()
        }
        
        hasPrevCartas = false
      } else {
        if (cursor) {
          const prevCursorCarta = cartas[0]
          prevCursor = prevCursorCarta.DESCAR
          hasPrevCartas = true
        } else {
          hasPrevCartas = false
        }
        
        hasNextCartas = false
      }
    }
    
    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      user,
      limit,
      cartas: dir === 'next' ? cartas : cartas.sort((a,b) => a.DESCAR > b.DESCAR ? 1:-1),
      hasPrevCartas,
      hasNextCartas,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }

    console.log(datos);
    res.render('user/', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// helpers
const hash = async (password) => {
  return new Promise((resolve, reject) => {
    scrypt(password, secreto, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'))
    });
  })
}
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}