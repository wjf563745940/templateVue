export default class UrlInfogUtil{
    static _urlIfo={};
    static _EQ = '=';
    static _init() {
        this._initParams();
        this.getInitUrlParams = (key) =>{
            return this._urlInfo[key];
        };
    }

    static _initParams() {
        const paramsStr = window.localtion.search.substr(1);
        const keyValuesStrs = parmasStr.split("&");
        for (let i = 0; i < keyValuesStrs.length;i++){
            const keyValue = keyValuesStrs[i].split(this._EQ);
            if(keyValue.length > 1) {
                const key =window.decodeURIComponent(keyValue[0]);
                const value = window.decodeURLComponent(keyValue[1]);
                this._urlInfo[key] = value;
            }
        }
        this._rulInfo = JSON.parse(paramStr);
    }
}