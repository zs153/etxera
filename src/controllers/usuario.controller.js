import * as DAL from '../models/usuario.model'

export const usuario = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.find(context)

    if (result.stat) {
      if (result.data.length === 1) {
        res.status(200).json({ stat: 1, data: result.data[0] })
      } else {
        res.status(200).json({ stat: null, data: 'La consulta devuelve multiples resultados' })
      }
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no encontrado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const usuarios = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findAll(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: {} })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const conEstados = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findEstados(context)

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
  const usuario = {
    NOMUSU: req.body.usuario.NOMUSU,
    OFIUSU: req.body.usuario.OFIUSU,
    ROLUSU: req.body.usuario.ROLUSU,
    USERID: req.body.usuario.USERID,
    EMAUSU: req.body.usuario.EMAUSU,
    PERUSU: req.body.usuario.PERUSU,
    TELUSU: req.body.usuario.TELUSU,
    STAUSU: req.body.usuario.STAUSU,
  }
  const recurso = {
    PWDUSU: req.body.recurso.PWDUSU,
    SEED: req.body.recurso.SEED,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(usuario, recurso, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no insertado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificiar = async (req, res) => {
  // context
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
    NOMUSU: req.body.usuario.NOMUSU,
    OFIUSU: req.body.usuario.OFIUSU,
    ROLUSU: req.body.usuario.ROLUSU,
    USERID: req.body.usuario.USERID,
    EMAUSU: req.body.usuario.EMAUSU,
    PERUSU: req.body.usuario.PERUSU,
    TELUSU: req.body.usuario.TELUSU,
    STAUSU: req.body.usuario.STAUSU,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(usuario, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no actualizado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  // context
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(usuario, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no eliminado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const perfil = async (req, res) => {
  // context
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
    USERID: req.body.usuario.USERID,
    NOMUSU: req.body.usuario.NOMUSU,
    EMAUSU: req.body.usuario.EMAUSU,
    TELUSU: req.body.usuario.TELUSU,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(usuario, movimiento)

  // proc
  try {
    const result = await DAL.profile(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Perfil no actualizado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}