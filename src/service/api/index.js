import api from './api.js';
// import Qs from 'qs';
// import cookieUtil from 'js-cookie';
import modal1 from './modal1.js';
import modal2 from './modal2.js';
// axios.defaults.timeout = 10000 // 响应时间
// axios.defaults.withCredentialst = true
// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 配置

const DEBUG_MODE = global.DEBUGMODE; //
var URL_PREFIX = DEBUG_MODE ? ' /api' + global.webSite : (global.IPPORT + global.webSite);
export default {
  isLogin(data) {
    if (DEBUG_MODE) {
      return api.post(URL_PREFIX + '/h5/user/home', data);
    }
    return api.post(URL_PREFIX + '/h5/user/home', data);
  },
  ...modal1,
  ...modal2
};
