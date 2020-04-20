
/*
 *
 *    工具库
 *    支持es6 import {} 引入
 *    author: liusm
 *    version: 1.0.7
 *    remarks: 加入getQuery方法，修改isType为getType，更加贴近语义。
 *
 *    isEmpty         用于判断value是否为空
 *    isEmptyObj      用于判断对象是否为空
 *    getType         用于精准判断数据类型
 *    getQuery        用于获取url参数， 默认返回Object格式全部参数， 支持传入key查询单个参数
 *    getToDay        获取当前日期
 *    getTimes        获取本地时间戳
 *    getNumber       返回number类型 默认返回2位小数点
 *    to...           用于类型转换
 *
 */

'use strict'

const kit = {

    version: '1.0.7',
    author : 'liusm',

    isEmpty(value = '') {
        if (typeof value === 'object') {
            return this.isEmptyObj(value);
        }
        return ('' + value) === '' ? true : false;
    },
    isEmptyObj(obj = '') {
        if (typeof obj !== 'object') {
            throw `isEmptyObj 's params not Object or Array`;
        } else {
            let name;
            for (name in obj) return false;
            return true;
        }
    },
    getType(value = undefined) {
        const types = Object.prototype.toString.call(value);

        if (types) return types.slice(8, -1);
        throw `unknown type: ${types},value: ${value}`;
    },
    getQuery(key = '') {
        const url = location.search;
        let query = {};
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            strs = str.split("&");
            for(let i = 0; i < strs.length; i ++) {
                query[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }

        let result = key ? query[key] : query;
        return result;
    },
    getTimes(d = new Date()) {
        return Math.round(d / 1000);
    },
    getNumber(value = 0) {
        return Math.round(value * 100) / 100;
    },
    toBoolean(value) {
        return Boolean(value);
    },
    toString(value = '') {
        let result = '';
        let vType = this.getType(value);

        switch (vType) {
        case 'Object ':
            result = JSON.stringify(value);
            break;
        default:
            result = String(value);
        }
        return result;
    },
    toNumber(value = 0) {
        let result = '';
        let vType = this.getType(value);

        switch (vType) {
        case 'String ':
            result = Number(value);
            break;
        case 'Boolean ':
            result = Number(value);
            break;
        default:
            console.warn('params is not a convertible ');
            result = value;
        }
        return result;
    },
    toArray(value = '') {
        let result = '';
        let vType = this.getType(value);

        switch (vType) {
        case 'Null ':
            result = value;
            break;
        case 'Number ':
            result = Array.from(this.toString(value));
            break;
        case 'Object ':
            let _array = [];
            for (let item in value) {
                _array.push({
                    'key ': item,
                    'value ': value[item]
                });
            }
            result = _array;
            break;
        default:
            result = Array.from(value);
        }
        return result;
    },
    toObject(value = '') {
        let result = '';
        let vType = this.getType(value);

        switch (vType) {
        case 'Null ':
            result = value;
            break;
        case 'Number ':
            try {
                JSON.parse(this.toString(value));
            } catch (err) {
                console.warn('params is not a convertible ');
                result = value;
            }
            break;
        case 'String ':
            try {
                JSON.parse(value);
            } catch (err) {
                console.warn('params is not a convertible ');
                result = value;
            }
            break;
        case 'Array ':
            let _object = {};
            for (let [index, item] of value.entries()) {
                _object[index] = item
            }
            result = _object;
            break;
        default:
        }
        return result;
    }
};

export { kit };