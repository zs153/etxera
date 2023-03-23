import axios from 'axios'
import { serverAPI, puertoAPI } from '../config/settings'
import { tiposRol, tiposEstado, arrTiposPerfil } from '../public/js/enumeraciones'

// pages
export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = user.rol === tiposRol.admin ? {} : { IDOFIC: user.oficina }
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const lastDayMonth = new Date(currentYear, currentMonth, 0).getDate()
  const desde = yearMonthDayToUTCString(currentYear, currentMonth, 1)
  const hasta = yearMonthDayToUTCString(currentYear, currentMonth, lastDayMonth)
  
  try {
    let oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })

    const datos = {
      oficinas: oficinas.data.data,
      arrTiposPerfil,
      desde,
      hasta,
    }
    res.render('admin/estados', { user, datos })
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
export const estadosPage = async (req, res) => {
  const user = req.user
  const oficina = {}
  const periodo = {
    DESDE: req.body.desde,
    HASTA: req.body.hasta,
  }
  const festivo = {
    OFIFES: req.body.ofiest,
    DESDE: periodo.DESDE,
    HASTA: periodo.HASTA,
  }
  const descripcionOficina = req.body.desofi
  const descripcionPerfil = req.body.desper
  const diasPeriodo = Math.ceil(Date.parse(periodo.HASTA) - Date.parse(periodo.DESDE)) / (1000 * 60 * 60 * 24) + 1
  const estado = {
    PERUSU: req.body.perusu,
    DESDE: periodo.DESDE,
    HASTA: periodo.HASTA,
  }
  
  if (req.body.ofiest !== '0') {
    estado.OFIEST = req.body.ofiest
  }

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina,
    })
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/oficinas`, {
      festivo,
    })
    const estados = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/oficinas/perfiles`, {
      estado,
    })

    const datos = {
      oficinas: oficinas.data.data,
      estados: estados.data.data,
      festivos: festivos.data.data.map(itm => itm.FECFES),
      tiposEstado,
      tiposRol,
      arrTiposPerfil,
      periodo,
      diasPeriodo,
      strDesde: new Date(periodo.DESDE).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      strHasta: new Date(periodo.HASTA).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }),
      descripcionOficina,
      descripcionPerfil,
    }

    if (req.body.format === '1') {
      res.render('admin/estados/mensual', { user, datos })
    } else {
      res.render('admin/estados/semanal', { user, datos })
    }
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
const yearMonthDayToUTCString = (year, month, day) => {
  const yearCDM = ('000' + year).slice(-4)
  const monthCDM = ('0' + month).slice(-2)
  const dayCDM = ('0' + day).slice(-2)

  const fecha = new Date(`${yearCDM}-${monthCDM}-${dayCDM}T00:00:00`)
  const userTimezoneOffset = fecha.getTimezoneOffset() * 60000

  return new Date(fecha.getTime() - userTimezoneOffset).toISOString().slice(0, 10)
}