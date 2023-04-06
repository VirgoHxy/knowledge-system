'use strict';

module.exports = class ExcelJSStyleUtil {
  /**
   * @param {import("exceljs").Worksheet} worksheet
   * @param {import("exceljs").Style} defaultStyle
   */
  constructor(worksheet, defaultStyle) {
    const style = {
      numFmt: '0',
      font: {
        // 字体样式
        size: 10,
        name: '微軟正黑體',
        charset: 136,
      },
      fill: {
        // 背景色填充
        type: 'pattern',
        pattern: 'solid',
      },
      alignment: {
        // 居中
        vertical: 'middle',
        wrapText: true,
        horizontal: 'center',
      },
      border: {
        // 边框
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
      },
    };
    /**
     * 初始化样式
     */
    this._defaultStyle = defaultStyle || style;
    /**
     * 操作/返回的样式
     */
    this._style = JSON.parse(JSON.stringify(this._defaultStyle));
    this._worksheet = worksheet;
  }

  /**
   * 设置小数保留位
   * @param {string} fmt 0.00 | 0.000 | 0% | 0.0% ...
   * @returns {ExcelJSStyleUtil}
   */
  numFmt(fmt) {
    if (fmt) {
      this._style.numFmt = fmt;
    }
    return this;
  }

  /**
   * 设置加粗字体
   * @param {boolean} flag 是否设置字体加粗
   * @returns {ExcelJSStyleUtil}
   */
  fontBold(flag = true) {
    this._style.font = {
      ...this._style.font,
      ...{
        bold: Boolean(flag),
      },
    };
    return this;
  }

  /**
   * 设置字体颜色
   * @param {string} argb 颜色代码，注意是argb不是rgba
   * @returns {ExcelJSStyleUtil}
   */
  fontColor(argb) {
    this._style.font = {
      ...this._style.font,
      ...{
        color: { argb: argb || 'FF000000' },
      },
    };
    return this;
  }

  /**
   * 设置背景为solid模式下背景颜色
   * @param {string} argb 颜色代码，注意是argb不是rgba
   * @returns {ExcelJSStyleUtil}
   */
  fillFgColor(argb) {
    this._style.fill = {
      ...this._style.fill,
      ...{
        fgColor: { argb: argb || 'FFFFFFFF' },
      },
    };
    return this;
  }

  /**
   * 完成样式叠加以及设置单元格样式
   * @param {string} cell 单元格
   * @param {import("exceljs").Style} style 样式
   */
  setCellStyle(cell, style) {
    if (style) {
      style = {
        numFmt: style.numFmt || this._style.numFmt,
        font: {
          ...this._style.font,
          ...(style.font || {}),
        },
        fill: {
          ...this._style.fill,
          ...(style.fill || {}),
        },
        alignment: {
          ...this._style.alignment,
          ...(style.alignment || {}),
        },
        border: {
          ...this._style.border,
          ...(style.border || {}),
        },
      };
    } else {
      style = this._style;
    }
    const oldStyle = this._worksheet.getCell(cell).style;
    this._worksheet.getCell(cell).style = { ...oldStyle, ...style };
    this._style = JSON.parse(JSON.stringify(this._defaultStyle));
  }

  /**
   * 返回操作后的样式
   * @return {import("exceljs").Style}
   */
  getStyle() {
    const style = this._style;
    this._style = JSON.parse(JSON.stringify(this._defaultStyle));
    return style;
  }

  /**
   * 返回初始默认的样式
   * @return {import("exceljs").Style}
   */
  getDefaultStyle() {
    return JSON.parse(JSON.stringify(this._defaultStyle));
  }
};
