import oracledb from 'oracledb'
import { dbPool } from '../config/settings'

const initialize = async () => {
  const pool = await oracledb.createPool(dbPool)
}
module.exports.initialize = initialize

const close = async () => {
  await oracledb.getPool().close(0)  //close(10)
}
module.exports.close = close

const simpleExecute = (sql, binds = [], opts = {}) => {
  return new Promise(async (resolve, reject) => {
    let conn

    oracledb.fetchAsString = [oracledb.CLOB]
    opts.outFormat = oracledb.OBJECT
    opts.autoCommit = true

    try {
      conn = await oracledb.getConnection()
      const result = await conn.execute(sql, binds, opts)

      resolve(result)
    } catch (error) {
      console.log(error)
      reject(null)
    } finally {
      if (conn) {
        try {
          await conn.close()
        } catch (err) {
          console.error(err)
        }
      }
    }
  })
}
module.exports.simpleExecute = simpleExecute
