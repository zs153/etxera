import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT * FROM cartas 
`;
const insertSql = `BEGIN ETXERA_PKG.INSERTCARTA(
    :nomcar,
    :concar,
    :usumov,
    :tipmov,
    :idcart
  ); END;
`;
const updateSql = `BEGIN ETXERA_PKG.UPDATECARTA(
    :idcart,
    :nomcar,
    :concar,
    :usumov,
    :tipmov
  ); END;
`;
const removeSql = `BEGIN ETXERA_PKG.DELETECARTA(
  :idcart,
  :usumov,
  :tipmov
); END;
`;

export const find = async (context) => {
  // bind
  let query = baseQuery;
  let bind = {};

  if (context.IDCART) {
    bind.IDCART = context.IDCART;
    query += `WHERE idcart = :idcart`;
  } 

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({stat: 1, data: ret.rows})
  } else {
    return ({stat: null, data: null})
  }
};
export const findAll = async (context) => {
  // bind
  let query = '';
  let bind = {
    limit: context.limit,
    part: context.part,
  };

  if (context.direction === 'next') {
    bind.IDCART = context.cursor.next;
    query = `WITH datos AS (
      SELECT idcart, nomcar FROM cartas
      WHERE
        nomcar LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE idcart > :idcart
    ORDER BY idcart ASC
    FETCH NEXT :limit ROWS ONLY
    `
  } else {
    bind.IDCART = context.cursor.prev;
    query = `WITH datos AS (
      SELECT idcart, nomcar FROM cartas
      WHERE
        nomcar LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE idcart < :idcart
    ORDER BY idcart DESC
    FETCH NEXT :limit ROWS ONLY
    `
  }

  // proc
  const ret = await simpleExecute(query, bind)

  if (ret) {
    return ({ stat: 1, data: ret.rows })
  } else {
    return ({ stat: null, data: null })
  }
};

export const insert = async (bind) => {
  // bind
  bind.IDCART = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDCART = ret.outBinds.IDCART
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const update = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(updateSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const remove = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(removeSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
