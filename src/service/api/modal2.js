import api from './api.js'
const DEBUG_MODE = global.DEBUGMODE//
var URL_PREFIX = DEBUG_MODE ? ' /api' + global.webSite : (global.IPPORT + global.webSite)
export default{
  getCreditList (data) {
    return api.post(URL_PREFIX + '/h5/credit/list', data)
  }
}
