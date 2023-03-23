import * as DAL from '../models/historico.model'

const activarFromRec = (req) => {

}

export const historico = async (req, res) => {
  // context
  const context = req.body.usuario

  // proc
  try {
    const result = await DAL.find(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no encontrado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const historicos = async (req, res) => {
  // context
  const context = req.body.usuario

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
export const activar = async (req, res) => {
  // context
  const usuario = {
    IDUSUA: req.body.usuario.IDUSUA,
    OFIUSU: req.body.usuario.OFIUSU,
    ROLUSU: req.body.usuario.ROLUSU,
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
    const result = await DAL.activar(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Usuario no activado' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
