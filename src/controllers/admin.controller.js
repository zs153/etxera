import axios from 'axios'
import { puertoAPI, serverAPI } from '../config/settings'

export const mainPage = async (req, res) => {
  const user = req.user

  try {
    const perfiles = await axios.post(`http://${serverAPI}:${puertoAPI}/api/estados/usuarios/perfiles`, {
      estado,
    })
    const matriculas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formacion/matriculas`, {
      context,
    })

    let userid = ''
    let data = []
    perfiles.data.data.map(itm => {
      if (itm.TIPEST === 2) {
        const hora = new Date().toTimeString().slice(0, 5)
        if (!(hora >= itm.DESHOR && hora <= itm.HASHOR)) {
          itm.TIPEST = 1
        }

        if (itm.USERID === userid) {
          if (itm.TIPEST === 1) {
            itm = data.slice(-1)[0]
          }
          data.splice(-1)
        }
        userid = itm.USERID
      }
      data.push(itm)
    })

    const datos = {
      estados: data,
      hayMatricula: matriculas.data.data.length > 0 ? true : false,
    }

    res.render('admin', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('user/error400', {
      alerts: [{ msg }],
    })
  }
}
