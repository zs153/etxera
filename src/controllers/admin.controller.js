import axios from 'axios'
import fs from "fs";
import { puertoAPI, serverAPI } from '../config/settings'
import { tiposMovimiento } from '../public/js/enumeraciones'

export const cartasPage = async (req, res) => {
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
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas`, {
      context,
    })

    let cartas = result.data.data
    let hasNextCartas = cartas.length === limit + 1
    let nextCursor = 0
    let prevCursor = 0

    if (hasNextCartas) {
      const nextCursorCarta = dir === 'next' ? cartas[limit - 1] : cartas[0]
      const prevCursorCarta = dir === 'next' ? cartas[0] : cartas[limit - 1]
      nextCursor = nextCursorCarta.IDCART
      prevCursor = prevCursorCarta.IDCART

      cartas.pop()
    } else {
      if (dir === 'prev') {
        context = {
          limit: limit + 1,
          direction: 'next',
          cursor: {
            next: 0,
            prev: 0
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
          nextCursor = nextCursorCarta.IDCART
          prevCursor = prevCursorCarta.IDCART

          cartas.pop()
        }

        hasPrevCartas = false
      } else {
        if (cursor) {
          const prevCursorCarta = cartas[0]
          prevCursor = prevCursorCarta.IDCART
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
      cartas,
      hasPrevCartas,
      hasNextCartas,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }


    res.render('admin/cartas', { user, datos })
  } catch (error) {
    console.log('error....',error);
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}
export const addPage = async (req, res) => {
  const user = req.user

  try {
    const datos = {
    }

    res.render('admin/cartas/add', { user, datos })
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.msg }],
      });
    }
  }
}
export const editPage = async (req, res) => {
  const user = req.user
  const context = {
    IDCART: req.params.id,
  }

  try {
    const carta = await axios.post(`http://${serverAPI}:${puertoAPI}/api/carta`, {
      context,
    })
    const datos = {
      carta: carta.data.data,
    }

    res.render('admin/cartas/edit', { user, datos })
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.msg }],
      });
    }
  }
}

// proc
export const insert = async (req, res) => {
  const user = req.user

  try {
    const carta = {
      NOMCAR: req.body.nomcar.toUpperCase(),
      FICCAR: req.body.ficcar.toLowerCase(),
      CONCAR: req.body.concar,
    }
    const movimiento = {
      USUMOV: user.id,
      TIPMOV: tiposMovimiento.crearCarta,
    }

    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas/insert`, {
      carta,
      movimiento,
    })

    let html = `<%- include('./includes/header.ejs') %>`
    html += carta.CONCAR
    html += `<%- include('./includes/footer.ejs') %>`

    fs.writeFile(`./src/public/templates/${carta.FICCAR}.ejs`, html, "utf8", (error, data) => { console.log("Write comple"); console.log(error); console.log(data); });

    res.redirect('/admin/cartas')
  } catch (error) {
    if (error.response.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.data }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.data }],
      });
    }
  }
}
export const update = async (req, res) => {
  const user = req.user
  const carta = {
    IDCART: req.body.idcart,
    NOMCAR: req.body.nomcar.toUpperCase(),
    FICCAR: req.body.ficcar.toLowerCase(),
    CONCAR: req.body.concar,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarCarta,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas/update`, {
      carta,
      movimiento,
    })

    fs.writeFile(`./src/public/templates/${carta.FICCAR}.ejs`, carta.CONCAR, "utf8", (error, data) => { console.log("Write comple"); console.log(error); console.log(data); });

    res.redirect('/admin/cartas')
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error.response.data.msg }],
      });
    }
  }
}
export const remove = async (req, res) => {
  const user = req.user
  const file = req.body.ficcar.toLowerCase()
  const carta = {
    IDCART: req.body.idcart,
  }  
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarCarta,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas/delete`, {
      carta,
      movimiento,
    })
    
    fs.stat(`./src/public/templates/${file}.ejs`, function (err, stats) {
      if (err) {
        return console.error(err);
      }

      fs.unlink(`./src/public/templates/${file}.ejs`, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    });

    res.redirect('/admin/cartas')
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("admin/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("admin/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}
