// import {
//   IFRAME_SHOW
// } from '../mutation-types'
import * as actions from './page/actions'
import mutations from './page/mutation'
import getters from './page/getters'

let state = {
  iframeShow: false,
  isDomain: false
}
export default {
  state,
  getters,
  actions,
  mutations
}
