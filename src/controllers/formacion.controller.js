import * as DAL from '../models/formacion.model'

// matriculas
export const matricula = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findM(context)

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
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findM(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: {} })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}

// cursos
export const curso = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findC(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data[0] })
    } else {
      res.status(400).json({ stat: null, data: 'Curso no encontrado' })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
export const cursos = async (req, res) => {
  // context
  const context = req.body.context

  // proc
  try {
    const result = await DAL.findC(context)

    if (result.stat) {
      res.status(200).json({ stat: 1, data: result.data })
    } else {
      res.status(400).json({ stat: null, data: {} })
    }
  } catch (err) {
    res.status(500).json({ stat: null, data: 'Conexión no estableciada' })
  }
}
