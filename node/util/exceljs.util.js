'use strict';

const fs = require('fs');
const path = require('path');

const { Workbook } = require('exceljs');

module.exports = class ExcelJSUtil {
  constructor() {
    this.workbook = null;
  }

  /**
   * 初始化 workbook
   * @param {string} path 文件路径
   * @returns {Promise<Workbook>}
   */
  async initWorkbook(path) {
    this.workbook = new Workbook();
    await this.workbook.xlsx.readFile(path);
    // 打开workbook就重新计算公式 需要放在读取文件后生效
    this.workbook.calcProperties.fullCalcOnLoad = true;
    return this.workbook;
  }

  /**
   * 获取 worksheet
   * @param {string} workbook 工作表
   * @param {string} sheetName 表格页名称
   * @returns {import("exceljs").Worksheet}
   */
  getWorksheet(sheetName) {
    return this.workbook.getWorksheet(sheetName);
  }

  _mkdirSync(dirPath) {
    if (!path.isAbsolute(dirPath)) {
      dirPath = path.resolve(__dirname, dirPath);
    }
    let match = dirPath.match(/^.+[\\/]([^\\/]+)$/);
    // 清除文件名
    match && match[1].includes('.') && match[1].includes('.', 1) && (dirPath = dirPath.replace(match[1], ''));
    if (fs.existsSync(dirPath)) {
      return true;
    } else {
      if (this._mkdirSync(path.dirname(dirPath))) {
        fs.mkdirSync(dirPath);
        return true;
      }
    }
  }

  /**
   * 输出文件
   * @param {string} outputPath  文件路径
   */
  async output(outputPath) {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
    this._mkdirSync(outputPath);
    await this.workbook.xlsx.writeFile(outputPath);
  }

  /**
   * 设置单元格样式
   * @param {import("exceljs").Worksheet} worksheet worksheet
   * @param {string} cell 单元格位置字符串
   * @param {import("exceljs").Style} style 样式
   */
  static setCellStyle(worksheet, cell, style) {
    const oldStyle = worksheet.getCell(cell).style;
    worksheet.getCell(cell).style = { ...oldStyle, ...style };
  }

  /**
   * 获取移动后的列字母
   * @param {string} col 表格列字母
   * @param {number} num 移动位数
   * @returns {string}
   */
  static getAddedCol(col, num) {
    const flag = col.length > 1;
    const codeOfA = 'A'.charCodeAt(0);
    const codeOfZ = 'Z'.charCodeAt(0);
    let fisrtOldCode = col.charCodeAt(0);
    let fisrtNewCode = fisrtOldCode;
    let lastOldCode = flag ? col.charCodeAt(1) : fisrtOldCode;
    let lastNewCode = lastOldCode + num;
    if (lastNewCode / 90 > 1) {
      let count = Math.ceil((lastNewCode - 90) / 25);
      fisrtNewCode = flag ? fisrtNewCode + count : codeOfA;
      lastNewCode = codeOfA + (lastNewCode % 90) - 1;
      return `${String.fromCharCode(fisrtNewCode)}${String.fromCharCode(lastNewCode)}`;
    } else {
      if (lastNewCode >= codeOfA) {
        return flag
          ? `${String.fromCharCode(fisrtNewCode)}${String.fromCharCode(lastNewCode)}`
          : String.fromCharCode(lastNewCode);
      } else {
        return String.fromCharCode(codeOfZ - (codeOfA - lastNewCode) + 1);
      }
    }
  }

  /**
   * 折叠/展示单元行
   * @param {import("exceljs").Worksheet} worksheet worksheet
   * @param {Array} rows 行号数组，第一个元素是起始行，第二个元素是终止行，第三个元素是过滤数组
   * @param {boolean} showFlag 是否显示
   */
  static showHideRow(worksheet, rows, showFlag) {
    const [startRow, endRow, filterArr = []] = rows;
    if (startRow === endRow) {
      worksheet.getRow(startRow).hidden = !showFlag;
    } else if (endRow > startRow) {
      for (let row = startRow; row <= endRow; row++) {
        if (filterArr.indexOf(row) === -1) {
          worksheet.getRow(row).hidden = !showFlag;
        }
      }
    }
  }
};
