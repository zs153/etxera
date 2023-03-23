import axios from 'axios'
import { serverAPI, puertoAPI } from '../config/settings'
import { arrEstadosCurso, arrEstadosMatricula, tiposMovimiento, tiposEstado } from '../public/js/enumeraciones'

// page cursos
export const mainPage = async (req, res) => {
  const user = req.user
  const context = {}

  try {
    const cursos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos`, {
      context
    })
    const datos = {
      cursos: cursos.data.data,
      arrEstadosCurso: arrEstadosCurso,
    }

    res.render('admin/cursos', { user, datos })
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
export const addPage = async (req, res) => {
  const user = req.user
  const datos = {
    arrEstadosCurso,
  }

  try {
    res.render('admin/cursos/add', { user, datos })
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
    IDCURS: req.params.id,
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    })
    const datos = {
      curso: curso.data.data,
      arrEstadosCurso,
    }

    res.render('admin/cursos/edit', { user, datos })
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

// pages turnos
export const turnosPage = async (req, res) => {
  const user = req.user;
  const context = {
    IDCURS: req.params.id,
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    });
    const turnos = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos`, {
      context,
    });
    const datos = {
      curso: curso.data.data,
      turnos: turnos.data.data,
    };

    res.render("admin/cursos/turnos", { user, datos });
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
export const addTurnoPage = async (req, res) => {
  const user = req.user;
  const fecha = dateISOToUTCString(new Date())
  const context = {
    IDCURS: req.params.id,
  };
  const turno = {
    INITUR: fecha,
    FINTUR: fecha,
    INIHOR: '08:00',
    FINHOR: '14:00',
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    });
    const datos = {
      curso: curso.data.data,
      turno,
    };

    res.render("admin/cursos/turnos/add", { user, datos });
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
export const editTurnoPage = async (req, res) => {
  const user = req.user;
  const context = {
    IDCURS: req.params.idcurs,
  };

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    });

    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context,
    });

    turno.data.data.INITUR = dateISOToUTCString(turno.data.data.INITUR)
    turno.data.data.FINTUR = dateISOToUTCString(turno.data.data.FINTUR)

    const datos = {
      curso: curso.data.data,
      turno: turno.data.data,
    };

    res.render("admin/cursos/turnos/edit", { user, datos });
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

// pages matriculas
export const matriculasPage = async (req, res) => {
  const user = req.user;
  const context = {
    IDCURS: req.params.id,
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    });
    const matriculas = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas`, {
      context,
    });
    const datos = {
      curso: curso.data.data,
      matriculas: matriculas.data.data,
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas", { user, datos });
  } catch (error) {
    if (error.response.status === 400) {
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
export const addMatriculaPage = async (req, res) => {
  const user = req.user;
  const fecha = dateISOToUTCString(new Date())
  const context = {
    IDCURS: req.params.id,
  };
  const matricula = {
    STRINI: fecha,
    STRFIN: fecha,
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    });
    const datos = {
      curso: curso.data.data,
      matricula,
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas/add", { user, datos });
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
export const editMatriculaPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  };
  const context = {
    IDMATR: req.params.idmatr,
  };

  try {
    const retCurso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    });
    const retMatricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context,
    });

    const datos = {
      curso: retCurso.data.data,
      matricula: retMatricula.data.data,
      arrEstadosMatricula,
    };

    res.render("admin/cursos/matriculas/edit", { user, datos });
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

// pages usuarios curso
export const usuariosPage = async (req, res) => {
  const user = req.user;
  const context = {
    IDCURS: req.params.id,
  };

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    });
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios`, {
      context,
    });
    const datos = {
      curso: curso.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/usuarios", { user, datos });
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
export const usuariosAddPage = async (req, res) => {
  const user = req.user;
  const context = {
    IDCURS: req.params.idcurs,
  }

  try {
    const curso = await axios.post(`http://${serverAPI}:${puertoAPI}/api/curso`, {
      context,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/pendientes`, {
      context,
    });
    const datos = {
      curso: curso.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/usuarios/add", { user, datos });
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

// pages usuarios turno
export const usuariosTurnoPage = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.params.idcurs,
  }
  const context = {
    IDTURN: req.params.idturn,
  }

  try {
    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios`, {
      context,
    })
    const datos = {
      curso,
      turno: turno.data.data,
      usuarios: usuarios.data.data,
    }

    res.render('admin/cursos/turnos/usuarios', { user, datos })
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
export const usuariosTurnoAddPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }
  let context = {
    IDTURN: req.params.idturn,
  }

  try {
    const turno = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turno`, {
      context,
    })
    context = curso
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/pendientes`, {
      context,
    });
    const datos = {
      curso,
      turno: turno.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/turnos/usuarios/add", { user, datos });
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

// pages usuarios matricula
export const usuariosMatriculaPage = async (req, res) => {
  const user = req.user
  const curso = {
    IDCURS: req.params.idcurs,
  }
  const context = {
    IDMATR: req.params.idmatr,
  }

  try {
    const matricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context,
    })
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios`, {
      context,
    })
    const datos = {
      curso,
      matricula: matricula.data.data,
      usuarios: usuarios.data.data,
    }

    res.render('admin/cursos/matriculas/usuarios', { user, datos })
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
export const usuariosMatriculaAddPage = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.params.idcurs,
  }
  let context = {
    IDMATR: req.params.idmatr,
  }

  try {
    const matricula = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matricula`, {
      context,
    })
    context = {}
    const usuarios = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios`, {
      context,
    });
    const datos = {
      curso,
      matricula: matricula.data.data,
      usuarios: usuarios.data.data,
    };

    res.render("admin/cursos/matriculas/usuarios/add", { user, datos });
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

// proc cursos
export const insert = async (req, res) => {
  const user = req.user
  const curso = {
    DESCUR: req.body.descur.toUpperCase(),
    DURCUR: req.body.durcur,
    PONCUR: req.body.poncur,
    NOTCUR: req.body.notcur,
    STACUR: req.body.stacur,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/insert`, {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
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
  const curso = {
    IDCURS: req.body.idcurs,
    DESCUR: req.body.descur.toUpperCase(),
    DURCUR: req.body.durcur,
    PONCUR: req.body.poncur,
    NOTCUR: req.body.notcur,
    STACUR: req.body.stacur,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/update`, {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
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
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/delete`, {
      curso,
      movimiento,
    })

    res.redirect('/admin/cursos')
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

// proc turnos
export const insertTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    DESTUR: req.body.destur.toUpperCase(),
    INITUR: req.body.initur,
    FINTUR: req.body.fintur,
    INIHOR: '+00 ' + req.body.inihor + ':00',
    FINHOR: '+00 ' + req.body.finhor + ':00',
    LOCTUR: req.body.loctur.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearTurno,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/insert`, {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
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
export const updateTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
    DESTUR: req.body.destur.toUpperCase(),
    INITUR: req.body.initur,
    FINTUR: req.body.fintur,
    INIHOR: '+00 ' + req.body.inihor + ':00',
    FINHOR: '+00 ' + req.body.finhor + ':00',
    LOCTUR: req.body.loctur.toUpperCase(),
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarTurno,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/update`, {
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
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
export const deleteTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarTurno,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/delete`, {
      curso,
      turno,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/${curso.IDCURS}`);
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

// proc matricula
export const insertMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/insert`, {
      curso,
      matricula,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/${curso.IDCURS}`);
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
export const updateMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs
  }
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
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/update`, {
      matricula,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/${curso.IDCURS}`);
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
export const deleteMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    IDMATR: req.body.idmatr,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarMatricula,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/delete`, {
      curso,
      matricula,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/${curso.IDCURS}`);
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

// proc usuarios curso
export const insertUsuario = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const usuarios = {
    //ARRUSU: req.body.arrusu.split(',').map(itm => +itm)
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.crearUsuarioCurso,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/insert`, {
      curso,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.IDCURS}`);
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
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuarioCurso,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/usuarios/delete`, {
      curso,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/usuarios/${curso.IDCURS}`);
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

// proc usuarios turno
export const insertUsuarioTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
  }
  const tipo = {
    TIPEST: tiposEstado.formacion.ID,
  }
  const usuarios = {
    ARRUSU: JSON.parse(req.body.arrusu)
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.insertarUsuarioTurno,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/insert`, {
      turno,
      tipo,
      usuarios,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/usuarios/${curso.IDCURS}/${turno.IDTURN}`);
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
export const deleteUsuarioTurno = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const turno = {
    IDTURN: req.body.idturn,
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuarioTurno,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/turnos/usuarios/delete`, {
      turno,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/turnos/usuarios/${curso.IDCURS}/${turno.IDTURN}`);
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

// proc usuarios matricula
export const insertUsuarioMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuarios = {
    ARRUSU: JSON.parse(req.body.arrusu)
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

    res.redirect(`/admin/cursos/matriculas/usuarios/${curso.IDCURS}/${matricula.IDMATR}`);
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
export const deleteUsuarioMatricula = async (req, res) => {
  const user = req.user;
  const curso = {
    IDCURS: req.body.idcurs,
  }
  const matricula = {
    IDMATR: req.body.idmatr,
  }
  const usuario = {
    IDUSUA: req.body.idusua,
  };
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.borrarUsuarioTurno,
  };

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/cursos/matriculas/usuarios/delete`, {
      matricula,
      usuario,
      movimiento,
    });

    res.redirect(`/admin/cursos/matriculas/usuarios/${curso.IDCURS}/${matricula.IDMATR}`);
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
