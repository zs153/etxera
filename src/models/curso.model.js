import { BIND_OUT, NUMBER } from 'oracledb'
import { simpleExecute } from '../services/database.js'

const cursoSql = `SELECT 
  cc.*
FROM cursos cc
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTCURSO(
  :descur,
  :durcur,
  :poncur,
  :notcur,
  :stacur,
  :usumov,
  :tipmov,
  :idcurs
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATECURSO(
  :idcurs,
  :descur,
  :durcur,
  :poncur,
  :notcur,
  :stacur,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETECURSO(
  :idcurs,
  :usumov,
  :tipmov 
); END;
`
// turnos
const turnoSql = `SELECT 
  tt.idturn, tt.destur, tt.loctur, tt.initur, tt.fintur,
  TO_CHAR(tt.initur, 'DD/MM/YYYY') "STRINI",
  TO_CHAR(tt.fintur, 'DD/MM/YYYY') "STRFIN",
  LPAD(EXTRACT(HOUR FROM tt.inihor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.inihor), 2, '0') AS "INIHOR",
  LPAD(EXTRACT(HOUR FROM tt.finhor), 2, '0')||':'||LPAD(EXTRACT(MINUTE FROM tt.finhor), 2, '0') AS "FINHOR"
FROM turnos tt
INNER JOIN turnoscurso tc ON tc.idturn = tt.idturn
`
const insertTurnoSql = `BEGIN OPORRAK_PKG.INSERTTURNOCURSO(
  :idcurs,
  :destur,
  TO_DATE(:initur,'YYYY-MM-DD'),
  TO_DATE(:fintur,'YYYY-MM-DD'),
  :inihor,
  :finhor,
  :loctur,
  :usumov,
  :tipmov,
  :idturn
); END;
`
const updateTurnoSql = `BEGIN OPORRAK_PKG.UPDATETURNOCURSO(
  :idturn,
  :destur,
  TO_DATE(:initur,'YYYY-MM-DD'),
  TO_DATE(:fintur,'YYYY-MM-DD'),
  :inihor,
  :finhor,
  :loctur,
  :usumov,
  :tipmov
); END;
`
const removeTurnoSql = `BEGIN OPORRAK_PKG.DELETETURNOCURSO(
  :idcurs,
  :idturn,
  :usumov,
  :tipmov
); END;
`
// matriculas
const matriculaSql = `SELECT 
  mm.idmatr, mm.desmat, mm.notmat, mm.stamat,
  TO_CHAR(mm.inimat, 'YYYY-MM-DD') "INIMAT",
  TO_CHAR(mm.finmat, 'YYYY-MM-DD') "FINMAT",
  TO_CHAR(mm.inimat, 'DD/MM/YYYY') "STRINI",
  TO_CHAR(mm.finmat, 'DD/MM/YYYY') "STRFIN"
FROM matriculas mm
INNER JOIN matriculascurso mc ON mc.idmatr = mm.idmatr
`
const insertMatriculaSql = `BEGIN OPORRAK_PKG.INSERTMATRICULACURSO(
  :idcurs,
  :desmat,
  TO_DATE(:inimat,'YYYY-MM-DD'),
  TO_DATE(:finmat,'YYYY-MM-DD'),
  :notmat,
  :stamat,
  :usumov,
  :tipmov,
  :idmatr
); END;
`
const updateMatriculaSql = `BEGIN OPORRAK_PKG.UPDATEMATRICULA(
  :idmatr,
  :desmat,
  TO_DATE(:inimat,'YYYY-MM-DD'),
  TO_DATE(:finmat,'YYYY-MM-DD'),
  :notmat,
  :stamat,
  :usumov,
  :tipmov
); END;
`
const removeMatriculaSql = `BEGIN OPORRAK_PKG.DELETEMATRICULACURSO(
  :idcurs,
  :idmatr,
  :usumov,
  :tipmov
); END;
`
// usuarios
const usuariosSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuarioscurso uc ON uc.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`
const usuariosPendientesSql = `SELECT
  uu.idusua, uu.nomusu
FROM turnoscurso tc
INNER JOIN usuariosturno ut ON ut.idturn = tc.idturn
LEFT JOIN usuarioscurso uc ON uc.idusua = ut.idusua AND uc.idcurs = :idcurs
INNER JOIN usuarios uu ON uu.idusua = ut.idusua
`
const insertUsuarioSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOCURSO(
  :idcurs,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOCURSO(
  :idcurs,
  :idusua,
  :usumov,
  :tipmov
); END;
`
// usuarios turno
const usuariosTurnoSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuariosturno ut ON ut.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`
const usuariosTurnoPendientesSql = `SELECT 
  uu.idusua, uu.nomusu, oo.idofic, oo.desofi
FROM matriculascurso mc
INNER JOIN usuariosmatricula um ON um.idmatr = mc.idmatr
LEFT JOIN (
  SELECT 
    ut.idusua
  FROM turnoscurso tc
  INNER JOIN usuariosturno ut ON ut.idturn = tc.idturn
  WHERE tc.idcurs = :idcurs
) pp ON pp.idusua = um.idusua
INNER JOIN usuarios uu ON uu.idusua = um.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
WHERE mc.idcurs = :idcurs
  AND pp.idusua IS NULL
`
const insertUsuarioTurnoSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOTURNO(
  :idturn,
  :tipest,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioTurnoSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOTURNO(
  :idturn,
  :idusua,
  :usumov,
  :tipmov
); END;
`
// usuarios matricula
const usuariosMatriculaSql = `SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  oo.desofi
FROM usuarios uu
INNER JOIN usuariosmatricula um ON um.idusua = uu.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`
const insertUsuarioMatriculaSql = `BEGIN OPORRAK_PKG.INSERTUSUARIOMATRICULA(
  :idmatr,
  :arrusu,
  :usumov,
  :tipmov
); END;
`
const removeUsuarioMatriculaSql = `BEGIN OPORRAK_PKG.DELETEUSUARIOMATRICULA(
  :idmatr,
  :idusua,
  :usumov,
  :tipmov
); END;
`

// cursos
export const find = async (context) => {
  // bind
  let query = cursoSql
  let bind = {}

  if (context.IDCURS) {
    bind.IDCURS = context.IDCURS
    query += `WHERE cc.idcurs = :idcurs`
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
  bind.IDCURS = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDCURS = ret.outBinds.IDCURS
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

// turnos
export const turno = async (context) => {
  // bind
  let query = turnoSql
  let bind = {}

  if (context.IDCURS) {
    bind.IDCURS = context.IDCURS
    query += `WHERE tc.idcurs = :idcurs`
  } else if (context.IDTURN) {
    bind.IDTURN = context.IDTURN
    query += `WHERE tc.idturn = :idturn`
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
export const insertTurno = async (bind) => {
  // bind
  bind.IDTURN = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertTurnoSql, bind)

  if (ret) {
    bind.IDTURN = ret.outBinds.IDTURN
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const updateTurno = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(updateTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const removeTurno = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}

// matricula
export const matricula = async (context) => {
  // bind
  let query = matriculaSql
  let bind = {}

  if (context.IDCURS) {
    bind.IDCURS = context.IDCURS
    query += `WHERE mc.idcurs = :idcurs`
  } else if (context.IDMATR) {
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
export const insertMatricula = async (bind) => {
  // bind
  bind.IDMATR = {
    dir: BIND_OUT,
    type: NUMBER,
  }

  // proc
  const ret = await simpleExecute(insertMatriculaSql, bind)

  if (ret) {
    bind.IDMATR = ret.outBinds.IDMATR
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const updateMatricula = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(updateMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const removeMatricula = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}

// usuarios
export const usuarios = async (context) => {
  // bind
  let query = usuariosSql
  let bind = {}

  if (context.IDCURS) {
    bind.IDCURS = context.IDCURS
    query += `WHERE uc.idcurs = :idcurs`
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

  if (context.IDCURS) {
    bind.IDCURS = context.IDCURS
    query += `WHERE tc.idcurs = :idcurs
      AND uc.idusua IS NULL
    `
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

// usuarios turno
export const usuariosTurno = async (context) => {
  // bind
  let query = usuariosTurnoSql
  let bind = {}

  if (context.IDTURN) {
    bind.IDTURN = context.IDTURN
    query += `WHERE ut.idturn = :idturn`
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
export const usuariosTurnoPendientes = async (context) => {
  // bind
  let query = usuariosTurnoPendientesSql
  let bind = context

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
}
export const insertUsuarioTurno = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(insertUsuarioTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const removeUsuarioTurno = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeUsuarioTurnoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}

// usuarios matricula
export const usuariosMatricula = async (context) => {
  // bind
  let query = usuariosMatriculaSql
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
export const insertUsuarioMatricula = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(insertUsuarioMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}
export const removeUsuarioMatricula = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeUsuarioMatriculaSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}