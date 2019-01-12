import * as types from '../../mutation-types'
export default {
  [types.IFRAME_SHOW] (state, message) {
    state.iframeShow = message
  },
  [types.IS_DOMAIN] (state, message) {
    // console.log('isdomian', message)
    state.isDomain = message
  }
}
