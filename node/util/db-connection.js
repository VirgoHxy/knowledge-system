const mysql = require("mysql");
const oracledb = require("oracledb");

class DBConnection {
  /**
   * 实例化参数
   * @param {Object} param 参数
   * @param {"MARIADB" | "ORACLE"} param.type db类型
   * @param {mysql.PoolConfig | oracledb.PoolAttributes} param.opt 连接配置
   */
  constructor({ type, opt }) {
    this.type = type;
    this.opt = opt;
    /** @type {mysql.Pool | oracledb.Pool} 连接池 */
    this.pool;

    this.createPool();
  }

  /**
   * 创建连接池
   * @async
   */
  async createPool() {
    switch (this.type) {
      case "MARIADB":
        this.pool = mysql.createPool(this.opt);
        break;
      case "ORACLE":
        this.pool = await oracledb.createPool(this.opt);
        break;

      default:
        throw new Error("unknow db type");
    }
  }

  /**
   * 获取连接
   * @async
   * @returns {Promise<mysql.PoolConnection | oracledb.Connection>} 连接
   */
  async getConnection() {
    switch (this.type) {
      case "MARIADB":
        return await this.getConnectionOfMariaDB();
      case "ORACLE":
        return this.pool.getConnection();

      default:
        throw new Error("unknow db type");
    }
  }

  /**
   * 执行语句
   * @async
   * @param {mysql.PoolConnection | oracledb.Connection} conn 连接
   * @param {String} sql sql语句
   * @returns {Promise<Object>} 结果
   */
  async query(conn, sql) {
    switch (this.type) {
      case "MARIADB":
        return await this.queryOfMariaDB(conn, sql);
      case "ORACLE":
        return await conn.execute(sql, [], { resultSet: true });

      default:
        throw new Error("unknow db type");
    }
  }

  /**
   * 获取MariaDB连接
   * @async
   * @returns {Promise<mysql.PoolConnection>} 连接
   */
  async getConnectionOfMariaDB() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function (error, connection) {
        if (error) {
          return reject(error);
        }
        connection.beginTransaction(function (error) {
          if (error) {
            return reject(error);
          }
          resolve(connection);
        });
      });
    });
  }

  /**
   * 执行MariaDB语句
   * @async
   * @param {mysql.PoolConnection} 连接
   * @param {String} sql sql语句
   * @returns {Promise<Object>} 结果
   */
  async queryOfMariaDB(conn, sql) {
    return new Promise((resolve, reject) => {
      conn.query(sql, function (error, result) {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

module.exports = DBConnection;
