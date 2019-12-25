/*
 *
 *    小程序工具库
 *    支持es6 import {} 引入
 *    author: liusm
 *    version: 1.0.2
 *    remarks: 修改注释
 *
 *    isType          用于精准判断数据类型
 *    isEmpty         用于判断value是否为空
 *    isEmptyObj      用于判断对象是否为空
 *    getToDay        获取当前日期
 *    getTimes        获取本地时间戳
 *    getNumber       返回number类型 默认返回2位小数点
 * 
 */

const util = {
  isType(value = undefined) {
    try {
      if (typeof value !== "object") {
        return typeof value;
      } else {
        const types = Object.prototype.toString.call(value);

        if (types) return types.slice(8, -1);
        throw `unknown type: ${types}, value:"${value}"`;
      }
    } catch {
      throw `unknown type, value:"${value}"`;
    }
  },
  isEmpty(value = "") {
    if (typeof value === "object") {
      return this.isEmptyObj(value);
    }
    return "" + value === "" ? true : false;
  },
  isEmptyObj(obj = "") {
    if (typeof obj !== "object") {
      throw "isEmptyObj's parameter not Object or Array";
    } else {
      let name;
      for (name in obj) return false;
      return true;
    }
  },
  getToDay(d = new Date()) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  },
  getTimes(d = new Date()) {
    return Math.round(d / 1000);
  },
  getNumber(value = 0) {
    return Math.round(value * 100) / 100;
  }
};

export {
  util
};