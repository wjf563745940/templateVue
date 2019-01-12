import api from './api.js';
const DEBUG_MODE = global.DEBUGMODE; //
var URL_PREFIX = DEBUG_MODE ? ' /api' + global.webSite : (global.IPPORT + global.webSite);
export default {
  login: function (data) { //
    return api.post(URL_PREFIX + '/h5/user/login', data);
  },
  home: function (data) { //
    return api.post(URL_PREFIX + '/h5/user/home', data);
  },
  getUser: function () {
    return api.get(URL_PREFIX + '/user');
  }
};
