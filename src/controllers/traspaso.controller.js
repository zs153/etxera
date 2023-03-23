import axios from 'axios'
import { serverAPI, puertoAPI, serverWEB, puertoWEB } from "../config/settings";
import { tiposRol, tiposEstado, tiposMovimiento } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: req.params.idofic }
  const context = user.rol === tiposRol.usuario ? { IDUSUA: user.id } : { OFIUSU: req.params.idofic }

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    })
    const datos = {
      oficina: parseInt(req.params.idofic),
      oficinas: oficinas.data.data,
      usuarios: usuarios.data.data,
      serverWEB,
      puertoWEB,
    }

    res.render('admin/traspasos', { user, datos })
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
export const calendario = async (req, res) => {  
  const user = req.user
  const currentYear = new Date().getFullYear()
  const estado = {
    USUEST: req.body.idusua,
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
  }
  const oficina = {}
  const festivo = {
    OFIFES: undefined,
    DESDE: estado.DESDE,
    HASTA: estado.HASTA,
  }
  const usuario = {
    IDUSUA: req.body.idusua,    
    NOMUSU: req.body.nomusu,
    OFIUSU: req.body.idofic,
  }

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos`, {
      festivo,
    })
    const festivosComun = festivos.data.data.filter(itm => itm.OFIFES === 0)
    const festivosLocal = festivos.data.data.filter(itm => itm.OFIFES > 0)
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios`, {
      estado,
    })
    
    let dataSource = []
    estados.data.data.map(itm => {
      if (itm.TIPEST === tiposEstado.traspaso.ID) {
        itm.TIPEST = tiposEstado.traspasado.ID
        const estado = estados.data.data[estados.data.data.indexOf(itm)]
        const rec = {
          idesta: itm.IDESTA,
          ofiest: estado.OFIEST,
          startDate: estado.STRFEC,
          endDate: estado.STRFEC,
          rangoH: `${estado.DESOFI}\n(${estado.DESHOR} a ${estado.HASHOR})`,
          color: `${tiposEstado.traspaso.COLOR}`
        }
        dataSource.push(rec)
      }
    })

    const datos = {
      oficinas: oficinas.data.data,
      festivosComun: JSON.stringify(festivosComun),
      festivosLocal: JSON.stringify(festivosLocal),
      tiposEstado,
      usuario: JSON.stringify(usuario),
      dataSource: JSON.stringify(dataSource),
    }

    res.render(`admin/traspasos/calendario`, { user, datos })
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
export const update = async (req, res) => {
  const user = req.user
  const usuario = JSON.parse(req.body.usuario)
  const eventos = JSON.parse(req.body.eventos)
  let estados = []

  eventos.map(itm => {
    if (itm.idesta === 0) {
      // traspaso
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: tiposEstado.traspaso.ID,
        OFIEST: usuario.OFIUSU,
      })
      //traspasado
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: tiposEstado.traspasado.ID,
        OFIEST: itm.ofiest,
      })
    } else {
      // borrado (el IDESTA borra el traspaso y FECEST, USUEST y TIPOEST borra el traspasado)
      estados.push({
        IDESTA: itm.idesta,
        FECEST: itm.fecest,
        USUEST: usuario.IDUSUA,
        TIPEST: tiposEstado.traspasado.ID,
        OFIEST: 0,
      })
    }
  })

  const traspasos = {
    ARRTRA: estados // importante!! los campos del array estados tienen que ir en mayusculas
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTraspaso,
    TIPMOZ: tiposMovimiento.borrarTraspaso,
  }

  try {
    if (traspasos.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/update/traspasos`, {
        traspasos,
        movimiento,
      });
    }

    mainPage(req, res)
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

// helpers
const dateISOToUTCString = (dateISO) => {
  const fecha = new Date(dateISO);
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000;
  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10);
}