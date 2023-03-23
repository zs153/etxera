import {BIND_OUT, NUMBER} from 'oracledb'
import { simpleExecute } from '../services/database.js'

const baseSql = `SELECT 
  mm.idmatr,
  mm.desmat,
  mm.idcurs,
  mm.stamat,
  TO_CHAR(mm.inimat, 'DD/MM/YYYY') AS STRINI,
  TO_CHAR(mm.finmat, 'DD/MM/YYYY') AS STRFIN
FROM matriculas mm
INNER JOIN matriculascurso mc ON mc.idmatr = mm.idmatr
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTMATRICULA(
  :desmat,
  TO_DATE(:inimat, 'YYYY-MM-DD'),
  TO_DATE(:finmat, 'YYYY-MM-DD'),
  :notmat,
  :stamat,
  :usumov,
  :tipmov,
  :idmatr
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATEMATRICULA(
  :idmatr,
  :desmat,
  TO_DATE(:inimat, 'YYYY-MM-DD'),
  TO_DATE(:finmat, 'YYYY-MM-DD'),
  :notmat,
  :stamat,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETEMATRICULA(
  :idmatr,
  :usumov,
  :tipmov 
); END;
`
const usuariosMatriculaSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuariosmatricula um ON um.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`
const usuariosPendientesSql = `SELECT 
  uu.idusua, uu.nomusu, oo.desofi FROM usuarios uu
LEFT JOIN usuariosmatricula um ON uu.idusua = um.idusua AND
  um.idmatr= :idmatr
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE um.idusua IS NULL AND 
  uu.stausu = 1
ORDER BY oo.idofic, uu.nomusu
`
const insertUsuarioSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOMATRICULA(
  :idmatr,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOMATRICULA(
  :idmatr,
  :idusua,
  :usumov,
  :tipmov
); END;
`

// matriculas
export const find = async (context) => {
  let query = baseSql
  let bind = {}

  if (context.IDMATR) {
    bind.IDMATR = context.IDMATR
    query += `WHERE mm.idmatr = :idmatr`
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
export const insert = async (bind) => {
  // bind
  bind.IDMATR = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDMATR = ret.outBinds.IDMATR
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const update = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const remove = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}

// usuarios
export const usuariosMatricula = async (context) => {
  // bind
  let query = usuariosMatriculaSql
  let bind = {}

  if (context.IDMATR) {
    bind.IDMATR = context.IDMATR
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
export const usuariosPendientes = async (context) => {
  // bind
  let query = usuariosPendientesSql
  let bind = {}

  if (context.IDMATR) {
    bind.IDMATR = context.IDMATR
    query += `WHERE um.idmatr = :idmatr`
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
export const insertUsuario = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(insertUsuarioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const removeUsuario = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeUsuarioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
