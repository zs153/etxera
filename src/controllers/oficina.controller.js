import * as DAL from '../models/oficina.model'

export const oficina = async (req, res) => {
  // context
  const context = req.body.oficina

  // proc
  try {
    const result = await DAL.find(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      res.status(400).json({ stat: null, data: 'Oficina no encontrada' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const oficinas = async (req, res) => {
  // context
  const context = req.body.oficina

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
  const oficina = {
    DESOFI: req.body.oficina.DESOFI,
    CODOFI: req.body.oficina.CODOFI,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(oficina, movimiento)

  // proc
  try {
    const result = await DAL.insert(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Oficina no insertada' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const modificar = async (req, res) => {
  // context
  const oficina = {
    IDOFIC: req.body.oficina.IDOFIC,
    DESOFI: req.body.oficina.DESOFI,
    CODOFI: req.body.oficina.CODOFI,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(oficina, movimiento)

  // proc
  try {
    const result = await DAL.update(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Oficina no actualizada' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const borrar = async (req, res) => {
  // context
  const oficina = {
    IDOFIC: req.body.oficina.IDOFIC,
  }
  const movimiento = {
    USUMOV: req.body.movimiento.USUMOV,
    TIPMOV: req.body.movimiento.TIPMOV,
  }
  const context = Object.assign(oficina, movimiento)

  // proc
  try {
    const result = await DAL.remove(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: 'Oficina no eliminada' })
    }

  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
