import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    idusua,
    nomusu,
    userid,
    emausu,
    perusu
  FROM historicos
`
const activarSql = `BEGIN OPORRAK_PKG.ACTIVARHISTORICO(
    :idusua,
    :ofiusu,
    :rolusu,
    :stausu,
    :pwdusu,
    :seed,
    :usumov,
    :tipmov
  ); END;
`

export const find = async (context) => {
  // bind
  let query = baseQuery;
  let bind = {};

  if (context.IDUSUA) {
    bind.IDUSUA = context.IDUSUA;
    query += "WHERE idusua = :idusua";
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
};
export const activar = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(activarSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}