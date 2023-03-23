import axios from 'axios'
import { serverAPI, puertoAPI } from "../config/settings";
import { estadosMatricula, tiposMovimiento } from '../public/js/enumeraciones'

export const matriculasPage = async (req, res) => {
  const user = req.user
  const context = {
    IDUSUA: user.id,
    STAMAT: estadosMatricula.abierta,
  }

  try {
    const matriculas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formacion/matriculas`, {
      context
    })
    const datos = {
      matriculas: matriculas.data.data,
    }

    res.render('admin/formacion/matriculas', { user, datos })
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
export const cursosPage = async (req, res) => {
  const user = req.user
  const context = {
    IDUSUA: req.user.id
  }

  try {
    const cursos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/formacion/cursos`, {
      context,
    })

    const datos = {
      cursos: cursos.data.data,
    }

    res.render('admin/formacion/cursos', { user, datos })
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
export const quieroMatricularme = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuarios = {
    ARRUSU: [parseInt(req.body.idusua)]
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.insertarUsuarioMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios/insert`, {
      matricula,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/formacion/matriculas`);
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