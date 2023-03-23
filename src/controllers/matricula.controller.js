import axios from 'axios'
import { serverAPI, puertoAPI } from "../config/settings";
import { tiposRol, arrEstadosMatricula, tiposMovimiento } from '../public/js/enumeraciones'

// page matriculas
export const mainPage = async (req, res) => {
  const user = req.user
  const matricula = {}

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas`, {
      matricula,
    })
    const datos = {
      matriculas: result.data.data,
    }

    res.render('admin/matriculas', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('admin/error400', {
      alerts: [{ msg }],
    })
  }
}
export const addPage = async (req, res) => {
  const user = req.user
  
  try {
    const datos = {
      arrEstadosMatricula,
    }

    res.render('admin/matriculas/add', { user, datos })
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
  const matricula = {
    IDMATR: req.params.id,
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matricula`, {
      matricula,
    })

    const datos = {
      matricula: result.data.data,
      arrEstadosMatricula,
    }

    res.render('admin/matriculas/edit', { user, datos })
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

// pages usuarios
export const usuariosPage = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matricula`, {
      matricula,
    });
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios`, {
      matricula,
    });
    const datos = {
      matricula: result.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/matriculas/usuarios", { user, datos });
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
export const usuariosAddPage = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.params.id,
  };

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matricula`, {
      matricula,
    });
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios/pendientes`, {
      matricula,
    });
    const datos = {
      matricula: result.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/matriculas/usuarios/add", { user, datos });
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

// proc matriculas
export const insert = async (req, res) => {
  const user = req.user
  const matricula = {
    DESMAT: req.body.desmat.toUpperCase(),
    INIMAT: req.body.inimat,
    FINMAT: req.body.finmat,
    NOTMAT: req.body.notmat,
    STAMAT: req.body.stamat,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/insert`, {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
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
  const matricula = {
    IDMATR: req.body.idmatr,
    DESMAT: req.body.desmat.toUpperCase(),
    INIMAT: req.body.inimat,
    FINMAT: req.body.finmat,
    NOTMAT: req.body.notmat,
    STAMAT: req.body.stamat,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/update`, {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
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
export const remove = async (req, res) => {
  const user = req.user
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/delete`, {
      matricula,
      movimiento,
    })

    res.redirect('/admin/matriculas')
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

// proc usuarios
export const insertUsuario = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuarios = {
    //ARRUSU: req.body.arrusu.split(',').map(itm => +itm)
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearUsuarioMatricula,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios/insert`, {
      matricula,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/matriculas/usuarios/${matricula.IDMATR}`);
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
export const deleteUsuario = async (req, res) => {
  const user = req.user;
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuarioMatricula,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/matriculas/usuarios/delete`, {
      matricula,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/matriculas/usuarios/${matricula.IDMATR}`);
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