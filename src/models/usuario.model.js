import { BIND_OUT, NUMBER } from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    uu.*,
    oo.desofi
  FROM usuarios uu
  INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`;
const estadosSql = `WITH datos AS (
  SELECT uu.idusua,
    SUM(CASE WHEN ee.tipest = 2 THEN 1 ELSE 0 END) "VACAS",
    SUM(CASE WHEN ee.tipest = 5 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "F",
    SUM(CASE WHEN ee.tipest = 6 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "C",
    SUM(CASE WHEN ee.tipest = 8 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "H",
    SUM(CASE WHEN ee.tipest = 9 THEN EXTRACT(DAY FROM (hashor-deshor)*24*60) ELSE 0 END) "T"
  FROM usuarios uu
  LEFT JOIN estados ee ON ee.usuest = uu.idusua
  WHERE uu.idusua = :idusua
  GROUP BY uu.idusua
)
SELECT 
  uu.idusua,
  uu.nomusu,
  uu.userid,
  uu.ofiusu,
  uu.telusu,
  uu.stausu,
  dd.vacas,
  TO_CHAR(TRUNC(dd.f/60), 'FM00') || ':' || TO_CHAR(mod(dd.f, 60), 'FM00') "FORMA",
  TO_CHAR(TRUNC(dd.c/60), 'FM00') || ':' || TO_CHAR(mod(dd.c, 60), 'FM00') "CONCI",
  TO_CHAR(TRUNC(dd.h/60), 'FM00') || ':' || TO_CHAR(mod(dd.h, 60), 'FM00') "HORAS",
  TO_CHAR(TRUNC(dd.t/60), 'FM00') || ':' || TO_CHAR(mod(dd.t, 60), 'FM00') "TELEF",
  oo.desofi
FROM datos dd
INNER JOIN usuarios uu ON uu.idusua = dd.idusua
INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
`
const insertSql = `BEGIN OPORRAK_PKG.INSERTUSUARIO(
    :nomusu,
    :ofiusu,
    :rolusu,
    :userid,
    :emausu,
    :perusu,
    :telusu,
    :stausu,
    :pwdusu,
    :seed,
    :usumov,
    :tipmov,
    :idusua
  ); END;
`;
const updateSql = `BEGIN OPORRAK_PKG.UPDATEUSUARIO(
    :idusua,
    :nomusu, 
    :ofiusu, 
    :rolusu, 
    :emausu, 
    :perusu, 
    :telusu, 
    :stausu, 
    :usumov, 
    :tipmov
  ); END;
`;
const removeSql = `BEGIN OPORRAK_PKG.DELETEUSUARIO(
  :idusua,
  :usumov,
  :tipmov
); END;
`;
const cambioSql = `BEGIN OPORRAK_PKG.CHANGEPASSWORD(
  :idusua,
  :pwdusu,
  :usumov,
  :tipmov
); END;
`;
const olvidoSql = `BEGIN OPORRAK_PKG.FORGOTPASSWORD(
  :emausu,
  :pwdusu, 
  :tipmov,
  :saltus
); END;
`;
const perfilSql = `BEGIN OPORRAK_PKG.UPDATEPERFILUSUARIO(
  :idusua,
  :nomusu,
  :emausu,
  :telusu, 
  :usumov,
  :tipmov
); END;
`;

export const find = async (context) => {
  // bind
  let query = baseQuery;
  let bind = {};

  if (context.IDUSUA) {
    bind.IDUSUA = context.IDUSUA;
    query += `WHERE uu.idusua = :idusua`;
  } else if (context.USERID) {
    bind.USERID = context.USERID;
    query += `WHERE uu.userid = :userid`;
  } else if (context.EMAUSU) {
    bind.EMAUSU = context.EMAUSU;
    query += `WHERE uu.emausu = :emausu`;
  } else if (context.OFIUSU) {
    bind.OFIUSU = context.OFIUSU;
    query += `WHERE uu.ofiusu = :ofiusu`;
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
    bind.NOMUSU = context.cursor.next === '' ? null : context.cursor.next;
    query = `WITH datos AS (
      SELECT uu.idusua, uu.userid, uu.nomusu, uu.telusu, uu.stausu, oo.desofi FROM usuarios uu
      INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
      WHERE
        uu.nomusu LIKE '%' || :part || '%' OR
        oo.desofi LIKE '%' || :part || '%' OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE nomusu > :nomusu OR :nomusu IS NULL
    ORDER BY nomusu ASC
    FETCH NEXT :limit ROWS ONLY
    `
  } else {
    bind.NOMUSU = context.cursor.prev === '' ? null : context.cursor.prev;
    query = `WITH datos AS (
      SELECT uu.idusua, uu.userid, uu.nomusu, uu.telusu, uu.stausu, oo.desofi FROM usuarios uu
      INNER JOIN oficinas oo ON oo.idofic = uu.ofiusu
      WHERE
        (uu.nomusu LIKE '%' || :part || '%') OR
        (oo.desofi LIKE '%' || :part || '%') OR
        :part IS NULL
    )
    SELECT * FROM datos
    WHERE nomusu < CONVERT(:nomusu, 'US7ASCII') OR :nomusu IS NULL
    ORDER BY nomusu DESC
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
export const findEstados = async (context) => {
  // bind
  let query = estadosSql
  let bind = {
    idusua: context.IDUSUA,
  };

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
  bind.IDUSUA = {
    dir: BIND_OUT,
    type: NUMBER,
  };

  // proc
  const ret = await simpleExecute(insertSql, bind)

  if (ret) {
    bind.IDUSUA = ret.outBinds.IDUSUA
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
export const change = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(cambioSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const forgot = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(olvidoSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
};
export const profile = async (bind) => {
  // bind
  // proc
  const ret = await simpleExecute(perfilSql, bind)

  if (ret) {
    return ({ stat: 1, data: bind })
  } else {
    return ({ stat: null, data: err })
  }
}