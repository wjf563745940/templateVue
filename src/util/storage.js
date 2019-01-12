export class localStorageUtil{
    static _preKey = 'xy-';
    static setItem(key, value) {
        key = `${this._preKey}${key}`;
        if(value instanceof Object){
            value = JSON.stringify(value);
        }
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            console.log('请将浏览器设置非隐私模式!!');
        }
    }
    static getItem(key) {
        return window.localStorage.getItem(`${this._preKey}${key}`);
    }
}

export class cookieUtil {

    static init() {
        this._defaultExpSec = 7*24*60*60*1000;
        this._equalSyb = '=';
    }

    /**
     *
     *
     * @static
     * @param {*String} key
     * @param {*String} value
     * @param {*number} expSec 时长 单位毫秒 默认7天
     * @returns
     * @memberof cookieUtil
     */
    static setCookie(key,value,expSec) {

        if(!expSec){
            if(expSec == 0) {
                return ;
            }
            expSec = this._defaultExpSec;
        }
        let deadline = new Date();
        deadline.setTime(deadline.getTime() + expSec);
        document.cookie = `${key}=${value};expires=${deadline.toGMTString};path=/`;
    }
    static getCookie(key) {
        const reg = new RegExp(`${key}=*;|${key}=.*$`);
        const keyValue =document.cookie.match(reg);
        if(keyValue && keyValue[0]){
            return decodeURIComponent(keyValue[0].split(this._equalSyb)[1]);
        }
    }
}