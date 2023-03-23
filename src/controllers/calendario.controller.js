import axios from 'axios'
import { serverAPI, puertoAPI } from '../config/settings'
import { tiposRol, tiposMovimiento, estadosUsuario, tiposEstado, arrTiposEstadoUsuario, arrTiposEstado, arrColoresEstado } from '../public/js/enumeraciones'

export const userPage = async (req, res) => {
  const user = req.user
  const context = {
    IDUSUA: user.id,
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/stats`, {
      context,
    })

    const datos = {
      estadosUsuario,
      usuario: usuario.data.data[0],
    }

    res.render(`admin/calendarios/user`, { user, datos })
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
export const adminPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : null

  let hasPrevUsers = false
  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let context = user.rol === tiposRol.admin ? {} : { OFIUSU: user.oficina }

  if (cursor) {
    hasPrevUsers = true
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
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    })

    let usuarios = result.data.data
    let hasNextUsers = usuarios.length === limit + 1
    let nextCursor = ''
    let prevCursor = ''

    if (hasNextUsers) {
      const nextCursorUser = dir === 'next' ? usuarios[limit - 1] : usuarios[0]
      const prevCursorUser = dir === 'next' ? usuarios[0] : usuarios[limit - 1]
      nextCursor = nextCursorUser.NOMUSU
      prevCursor = prevCursorUser.NOMUSU

      usuarios.pop()
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

        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
          context,
        })

        usuarios = result.data.data
        hasNextUsers = usuarios.length === limit + 1

        if (hasNextUsers) {
          const nextCursorUser = usuarios[limit - 1]
          const prevCursorUser = usuarios[0]
          nextCursor = nextCursorUser.NOMUSU
          prevCursor = prevCursorUser.NOMUSU

          usuarios.pop()
        }

        hasPrevUsers = false
      } else {
        if (cursor) {
          const prevCursorUser = usuarios[0]
          prevCursor = prevCursorUser.NOMUSU
          hasPrevUsers = true
        } else {
          hasPrevUsers = false
        }

        hasNextUsers = false
      }
    }

    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      limit,
      usuarios: dir === 'next' ? usuarios : usuarios.sort((a, b) => a.NOMUSU > b.NOMUSU ? 1 : -1),
      hasPrevUsers,
      hasNextUsers,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
      estadosUsuario,
    }

    res.render('admin/calendarios/admin', { user, datos })
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
export const calendarioUser = async (req, res) => {
  const user = req.user
  const currentYear = new Date().getFullYear()
  const usuario = JSON.parse(req.body.usuario)
  const estado = {
    USUEST: usuario.IDUSUA,
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
  }
  const festivo = {
    OFIFES: usuario.OFIUSU,
    DESDE: estado.DESDE,
    HASTA: estado.HASTA,
  }

  try {
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuario`, {
      estado,
    })
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/oficinas`, {
      festivo,
    })
    
    let dataSource = []
    estados.data.data.map(itm => {
      if (itm.TIPEST !== tiposEstado.traspasado.ID &&
        itm.TIPEST !== tiposEstado.traspaso.ID) {
        const rec = {
          idesta: itm.IDESTA,
          tipest: itm.TIPEST,
          startDate: itm.STRFEC,
          endDate: itm.STRFEC,
          rangoH: `${arrColoresEstado[itm.TIPEST].DES} (${itm.DESHOR} a ${itm.HASHOR})`,
          color: `${arrColoresEstado[itm.TIPEST].COLOR}`,
          deshor: itm.DESHOR,
          hashor: itm.HASHOR,
        }
        dataSource.push(rec)
      }
    })

    const datos = {
      arrTiposEstado: user.rol === tiposRol.usuario ? arrTiposEstadoUsuario : arrTiposEstado,
      arrColoresEstado,
      tiposEstado,
      festivos: JSON.stringify(festivos.data.data),
      usuario,
      dataSource: JSON.stringify(dataSource),
    }

    res.render(`admin/calendarios/calendarioUser`, { user, datos })
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
export const calendarioAdmin = async (req, res) => {
  const user = req.user
  const currentYear = new Date().getFullYear()
  const context = {
    IDUSUA: req.query.id,
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context,
    })
    const estado = {
      USUEST: usuario.data.data.IDUSUA,
      DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
      HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
    }
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuario`, {
      estado,
    })
    const festivo = {
      OFIFES: usuario.data.data.OFIUSU,
      DESDE: estado.DESDE,
      HASTA: estado.HASTA,
    }
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/oficinas`, {
      festivo,
    })
    
    let dataSource = []
    estados.data.data.map(itm => {
      if (itm.TIPEST !== tiposEstado.traspasado.ID &&
        itm.TIPEST !== tiposEstado.traspaso.ID) {
        const rec = {
          idesta: itm.IDESTA,
          tipest: itm.TIPEST,
          startDate: itm.STRFEC,
          endDate: itm.STRFEC,
          rangoH: `${arrColoresEstado[itm.TIPEST].DES} (${itm.DESHOR} a ${itm.HASHOR})`,
          color: `${arrColoresEstado[itm.TIPEST].COLOR}`,
          deshor: itm.DESHOR,
          hashor: itm.HASHOR,
        }
        dataSource.push(rec)
      }
    })

    const datos = {
      arrTiposEstado: user.rol === tiposRol.usuario ? arrTiposEstadoUsuario : arrTiposEstado,
      arrColoresEstado,
      tiposEstado,
      festivos: JSON.stringify(festivos.data.data),
      usuario: usuario.data.data,
      dataSource: JSON.stringify(dataSource),
    }

    res.render(`admin/calendarios/calendarioAdmin`, { user, datos })
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

// proc
export const updateUser = async (req, res) => {
  const user = req.user
  const usuario = JSON.parse(req.body.usuario)
  const eventos = JSON.parse(req.body.eventos)
  let estados = []

  eventos.map(itm => {
    if (itm.idesta < 0) {
      // insertar
      estados.push({
        IDESTA: 0,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: itm.tipest,
        OFIEST: usuario.OFIUSU,
        DESHOR: itm.deshor,
        HASHOR: itm.hashor,
      })
    } else {
      // borrar
      estados.push({
        IDESTA: itm.idesta,
        FECEST: '',
        USUEST: 0,
        TIPEST: 0,
        OFIEST: 0,
        DESHOR: '',
        HASHOR: '',
      })
    }
  })

  const context = {
    ARREST: estados // importante!! los campos del array estados tienen que ir en mayusculas
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEstado,
    TIPMOZ: tiposMovimiento.borrarEstado,
  }

  try {
    if (estados.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/update`, {
        context,
        movimiento,
      });
    }

    res.redirect("/admin/calendario")
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
export const updateAdmin = async (req, res) => {
  const user = req.user
  const usuario = JSON.parse(req.body.usuario)
  const eventos = JSON.parse(req.body.eventos)
  let estados = []

  eventos.map(itm => {
    if (itm.idesta < 0) {
      // insertar
      estados.push({
        IDESTA: 0,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: itm.tipest,
        OFIEST: usuario.OFIUSU,
        DESHOR: itm.deshor,
        HASHOR: itm.hashor,
      })
    } else {
      // borrar
      estados.push({
        IDESTA: itm.idesta,
        FECEST: '',
        USUEST: 0,
        TIPEST: 0,
        OFIEST: 0,
        DESHOR: '',
        HASHOR: '',
      })
    }
  })

  const context = {
    ARREST: estados // importante!! los campos del array estados tienen que ir en mayusculas
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEstado,
    TIPMOZ: tiposMovimiento.borrarEstado,
  }

  try {
    if (estados.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/update`, {
        context,
        movimiento,
      });
    }

    res.redirect("/admin/calendarios")
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
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}