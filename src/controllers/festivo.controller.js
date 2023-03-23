import axios from 'axios'
import { puertoAPI, serverAPI } from '../config/settings'
import { tiposEstado, tiposMovimiento } from '../public/js/enumeraciones'

export const mainPage = async (req, res) => {
  const user = req.user
  const oficina = {}

  try {
    const oficinas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/oficinas`, {
      oficina
    })
    const datos = {
      oficinas: oficinas.data.data,
    }

    res.render('admin/festivos', { user, datos })
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
  const festivo = {
    OFIFES: req.body.idofic,
    DESDE: dateISOToUTCString(`${currentYear}-01-01T00:00:00`),
    HASTA: dateISOToUTCString(`${currentYear + 1}-12-31T00:00:00`),
  }
  const oficina = {
    IDOFIC: req.body.idofic,
    DESOFI: req.body.desofi,
  }

  console.log(oficina)
  try {
    const festivos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos`, {
      festivo,
    })
  
    const dataSource = festivos.data.data.map(itm => ({
      idfest: itm.IDFEST,
      fecfes: itm.FECFES,
      ofifes: itm.OFIFES,
      startDate: itm.FECFES,
      endDate: itm.FECFES,
      color: tiposEstado.festivo.COLOR,
    }))

    const datos = {
      oficina,
      dataSource: JSON.stringify(dataSource),
      tiposEstado,
    }

    res.render(`admin/festivos/calendario`, { user, datos })
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
  const eventos = JSON.parse(req.body.eventos)
  let festivos = []

  eventos.map(itm => {
    // importante!! los campos del array festivos tienen que ir en mayusculas
    if (itm.idfest < 0) {
      // insertar
      festivos.push({
        IDFEST: 0,
        FECFES: itm.fecfes,
        OFIFES: itm.ofifes,
      })
    } else {
      // borrar
      festivos.push({
        IDFEST: itm.idfest,
        FECEST: '',
        OFIEST: 0,
      })
    }
  })

  const context = {
    ARRFES: festivos
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearEstado,
    TIPMOZ: tiposMovimiento.borrarEstado,
  }

  try {
    if (festivos.length !== 0) {
      await axios.post(`http://${serverAPI}:${puertoAPI}/api/festivos/update`, {
        context,
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