import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from '../services/database.js'

const baseQuery = `SELECT 
  oo.*
FROM oficinas oo
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTOFICINA(
  :desofi, 
  :codofi,
  :usumov,
  :tipmov,
  :idofic
); END;
`
const updateSql = `BEGIN OPORRAK_PKG.UPDATEOFICINA(
  :idofic,
  :desofi, 
  :codofi,
  :usumov,
  :tipmov
); END;
`
const removeSql = `BEGIN OPORRAK_PKG.DELETEOFICINA(
  :idofic,
  :usumov,
  :tipmov 
); END;
`

export const find = async (context) => {
  // bind
  let query = baseQuery
  let bind = {}

  if (context.IDOFIC) {
    bind.IDOFIC = context.IDOFIC
    query += `WHERE oo.idofic = :idofic`
  }
  if (context.CODOFI) {
    bind.CODOFI = context.CODOFI
    query += `WHERE oo.codofi = :codofi`
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
  bind.IDOFIC = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDOFIC = ret.outBinds.IDOFIC
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
