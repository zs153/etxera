import * as DAL from '../models/matricula.model'

export const matricula = async (req, res) => {
  // context
  const context = req.body.matricula

  // proc
  try {
    const result = await DAL.find(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      res.status(400).json({ stat: null, data: 'Matrícula no encontrado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const matriculas = async (req, res) => {
  // context
  const context = req.body.matricula

  // proc
  try {
    const result = await DAL.find(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: {} })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crear = async (req, res) => {
  // context
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
  const context = Object.assign(matricula, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Matrícula no insertado' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificar = async (req, res) => {
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
    const result = await DAL.update(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Matrícula no actualizado' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

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
export const usuariosMatricula = async (req, res) => {
  // context
  const context = req.body.matricula

  // proc
  try {
    const result = await DAL.usuariosMatricula(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: {} })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const usuariosPendientes = async (req, res) => {
  // context
  const context = req.body.matricula

  // proc
  try {
    const result = await DAL.usuariosPendientes(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: {} })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const crearUsuario = async (req, res) => {
  // context
  const matricula = {
    IDMATR: req.body.matricula.IDMATR,
  }
  const usuarios = {
    ARRUSU: req.body.usuarios.ARRUSU,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(matricula, usuarios, movimiento)

  // proc
  try {
    const result = await DAL.insertUsuario(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuarios no insertados' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrarUsuario = async (req, res) => {
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
