// import {
//   ADD_USER
// } from '../mutation-types'
import * as actions from './demo/actions'
import mutations from './demo/mutation'
import getters from './demo/getters'

let state = {
  toastShow: false,
  message: ''
}
export default {
  state,
  getters,
  actions,
  mutations
}
