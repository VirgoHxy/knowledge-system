const minio = require("minio");
const path = require("path");

class MinIOClient {
  /**
   * 实例化参数
   * @param {Object} param 参数
   * @param {minio.ClientOptions} param.opt 连接配置
   * @param {String} param.defaultBucket 桶名称
   */
  constructor({ opt, defaultBucket }) {
    this.opt = opt;
    this.defaultBucket = defaultBucket;
    /** @type {minio.Client} 连接 */
    this.client = null;

    this.create();
  }

  /**
   * 创建 minio 客户端连接
   */
  create() {
    this.client = new minio.Client(this.opt);
  }

  /**
   * 获取对象流
   * @async
   * @param {String} name object名称
   * @returns {Promise<ReadStream>}
   */
  async getObject(name) {
    name = this.getMinIOPath(name);
    return await this.client.getObject(this.defaultBucket, name);
  }

  /**
   * 推送对象
   * @async
   * @param {String} name object名称
   * @param {String | Buffer} content 文件内容
   * @param {import("minio").ItemBucketMetadata} metaData 文件内容
   * @returns {Promise<Boolean>}
   */
  async putObject(name, content, metaData) {
    name = this.getMinIOPath(name);
    Object.assign(metaData, {
      ctime: new Date().getTime(),
    });
    await this.client.putObject(this.defaultBucket, name, content, metaData);
    return true;
  }

  /**
   * 删除对象
   * @async
   * @param {String} name object名称
   * @returns {Promise<Boolean>}
   */
  async removeObject(name) {
    name = this.getMinIOPath(name);
    await this.client.removeObject(this.defaultBucket, name);
    return true;
  }

  /**
   * 删除过期对象
   * @async
   * @param {String} prefix 前缀
   * @param {Number} days 期限天数
   * @returns {Promise<Boolean>}
   */
  async removeObjectByTime(prefix, days) {
    return new Promise((resolve, reject) => {
      let bucketStream = this.client.extensions.listObjectsV2WithMetadata(
        this.defaultBucket,
        this.getMinIOPath(prefix),
        true
      );
      bucketStream.on("data", async (element) => {
        const stat = await this.client.statObject(this.defaultBucket, element.name);
        if (Number(stat.metaData.ctime) + Number(days) * 24 * 60 * 60 * 1000 < Date.now()) {
          await this.client.removeObject(this.defaultBucket, element.name);
        }
      });
      bucketStream.on("error", function (error) {
        reject(error);
      });
      bucketStream.on("end", function () {
        resolve(true);
      });
    });
  }

  /**
   * 删除同一个前缀的所有对象
   * @param {String} prefix 前缀
   * @returns {Promise<Boolean>}
   */
  removeObjectByPrefix(prefix) {
    return new Promise((resolve, reject) => {
      let bucketStream = this.client.extensions.listObjectsV2WithMetadata(
        this.defaultBucket,
        this.getMinIOPath(prefix)
      );
      bucketStream.on("data", async function (element) {
        await this.client.removeObject(this.defaultBucket, element.name);
      });
      bucketStream.on("error", function (error) {
        reject(error);
      });
      bucketStream.on("end", function () {
        resolve(true);
      });
    });
  }

  /**
   * 拷贝对象
   * @async
   * @param {String} sourceName 源对象路径
   * @param {String} copyName object名称
   * @returns {Promise<Boolean>}
   */
  async copyObject(sourceName, copyName) {
    sourceName = this.getMinIOPath(sourceName);
    copyName = this.getMinIOPath(copyName);
    const stat = await this.client.statObject(this.defaultBucket, sourceName);
    const conds = new minio.CopyConditions();
    conds.setMatchETag(stat.etag);
    await this.client.copyObject(this.defaultBucket, copyName, sourceName, conds);
    return true;
  }

  /**
   * 将fs路径转换为minio object name
   * @param {String} dirPath 文件路径/文件夹路径
   * @returns {String} 路径
   */
  getMinIOPath(dirPath) {
    if (!/^[a-zA-Z]:[\\/]|^[\\/]/.test(dirPath)) {
      dirPath = path.resolve(__dirname, dirPath);
    }
    // 去掉盘符以及转换路径\\为/可让minio识别
    return dirPath.replace(/[a-zA-Z]:[\\/]|^[\\/]/, "").replace(/\\/g, "/");
  }
}

module.exports = MinIOClient;
