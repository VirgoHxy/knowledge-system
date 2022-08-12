const ftp = require("basic-ftp");

class FTPClient {
  /**
   * 实例化参数
   * @param {Object} param 参数
   * @param {ftp.AccessOptions} param.opt 连接配置
   */
  constructor({ opt }) {
    this.opt = opt;
    /** @type {ftp.Client} 连接 */
    this.client = null;

    this.create();
  }

  /**
   * 创建ftp 客户端连接
   */
  create() {
    this.client = new ftp.Client();
    // 是否开启日志 false不开启
    this.client.ftp.verbose = false;
    this.access();
  }

  /**
   * 获取连接权限
   * @async
   */
  async access() {
    if (this.client.closed) {
      await this.client.access(this.opt);
    }
  }

  /**
   * 上传文件
   * @async
   * @param {Object} param
   * @param {String | Readable} param.localPath 本地地址
   * @param {String} param.ftpPath ftp地址
   * @param {String} param.fileName 文件名称
   */
  async uploadToFTP({ localPath, ftpPath, fileName }) {
    await this.access();
    // 创建文件夹/工作路径切换到文件夹
    await this.client.ensureDir(ftpPath);
    // 上传文件到ftp服务器
    await this.client.uploadFrom(localPath, fileName);
  }
}

module.exports = FTPClient;
