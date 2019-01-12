import * as types from '../../mutation-types'
export default {
  [types.DEMO_TEST] (state, message) {
    state.toastShow = true
    state.message = message
  }
}
