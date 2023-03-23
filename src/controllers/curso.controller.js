import * as DAL from '../models/curso.model'

// cursos
export const curso = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      return res.status(400).json({ stat: null, msg: 'No existen datos' })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const cursos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crear = async (req, res) => {
  // context
  const curso = {
    DESCUR: req.body.curso.DESCUR,
    DURCUR: req.body.curso.DURCUR,
    PONCUR: req.body.curso.PONCUR,
    NOTCUR: req.body.curso.NOTCUR,
    STACUR: req.body.curso.STACUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Curso no insertado' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificar = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
    DESCUR: req.body.curso.DESCUR,
    DURCUR: req.body.curso.DURCUR,
    PONCUR: req.body.curso.PONCUR,
    NOTCUR: req.body.curso.NOTCUR,
    STACUR: req.body.curso.STACUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Curso no actualizado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Curso no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// turnos
export const turno = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.turno(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      return res.status(400).json({ stat: null, msg: 'No existen datos' })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const turnos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.turno(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearTurno = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const turno = {
    DESTUR: req.body.turno.DESTUR,
    INITUR: req.body.turno.INITUR,
    FINTUR: req.body.turno.FINTUR,
    INIHOR: req.body.turno.INIHOR,
    FINHOR: req.body.turno.FINHOR,
    LOCTUR: req.body.turno.LOCTUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, turno, movimiento)

  // proc
  try {
    const result = await DAL.insertTurno(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Turno no insertado' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificarTurno = async (req, res) => {
  // context
  const turno = {
    IDTURN: req.body.turno.IDTURN,
    DESTUR: req.body.turno.DESTUR,
    INITUR: req.body.turno.INITUR,
    FINTUR: req.body.turno.FINTUR,
    INIHOR: req.body.turno.INIHOR,
    FINHOR: req.body.turno.FINHOR,
    LOCTUR: req.body.turno.LOCTUR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(turno, movimiento)

  // proc
  try {
    const result = await DAL.updateTurno(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Turno no actualizado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarTurno = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const turno = {
    IDTURN: req.body.turno.IDTURN,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, turno, movimiento)

  // proc
  try {
    const result = await DAL.removeTurno(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Turno no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// matriculas
export const matricula = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.matricula(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      return res.status(400).json({ stat: null, msg: 'No existen datos' })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const matriculas = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.matricula(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearMatricula = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const matricula = {
    DESMAT: req.body.matricula.DESMAT,
    INIMAT: req.body.matricula.INIMAT,
    FINMAT: req.body.matricula.FINMAT,
    NOTMAT: req.body.matricula.NOTMAT,
    STAMAT: req.body.matricula.STAMAT,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, matricula, movimiento)

  // proc
  try {
    const result = await DAL.insertMatricula(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Matrícula no insertado' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificarMatricula = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
    DESMAT: req.body.matricula.DESMAT,
    INIMAT: req.body.matricula.INIMAT,
    FINMAT: req.body.matricula.FINMAT,
    NOTMAT: req.body.matricula.NOTMAT,
    STAMAT: req.body.matricula.STAMAT,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, movimiento)

  // proc
  try {
    const result = await DAL.updateMatricula(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Matrícula no actualizado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarMatricula = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, matricula, movimiento)

  // proc
  try {
    const result = await DAL.removeMatricula(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Matrícula no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios
export const usuarios = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuarios(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const usuariosPendientes = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosPendientes(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearUsuario = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const usuarios = {
    ARRUSU: req.body.usuarios.ARRUSU,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, usuarios, movimiento)

  // proc
  try {
    const result = await DAL.insertUsuario(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no insertado' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarUsuario = async (req, res) => {
  // context
  const curso = {
    IDCURS: req.body.curso.IDCURS,
  }
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(curso, usuario, movimiento)

  // proc
  try {
    const result = await DAL.removeUsuario(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios turno
export const usuariosTurno = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosTurno(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const usuariosTurnoPendientes = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosTurnoPendientes(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearUsuarioTurno = async (req, res) => {
  // context
  const turno = {
    IDTURN: req.body.turno.IDTURN,
  }
  const usuarios = {
    ARRUSU: {
      type: 'USRTYPE',
      val: req.body.usuarios.ARRUSU,
    }
  }
  const tipo = {
    TIPEST: req.body.tipo.TIPEST,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(turno, tipo, usuarios, movimiento)

  // proc
  try {
    const result = await DAL.insertUsuarioTurno(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuarios no insertados' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarUsuarioTurno = async (req, res) => {
  // context
  const turno = {
    IDTURN: req.body.turno.IDTURN,
  }
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(turno, usuario, movimiento)

  // proc
  try {
    const result = await DAL.removeUsuarioTurno(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// usuarios matricula
export const usuariosMatricula = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.usuariosMatricula(context)

    if (result.stat) {
      return res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(200).json({ stat: null, data: {} })
    }
  } catch (err) {
    return res.status(500).json({ stat: null, msg: 'Sin conexión con el servidor' })
  }
}
export const crearUsuarioMatricula = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const usuarios = {
    ARRUSU: {
      val: req.body.usuarios.ARRUSU,
    }
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, usuarios, movimiento)

  // proc
  try {
    const result = await DAL.insertUsuarioMatricula(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuarios no insertados' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarUsuarioMatricula = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, usuario, movimiento)

  // proc
  try {
    const result = await DAL.removeUsuarioMatricula(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
