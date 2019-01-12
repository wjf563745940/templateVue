// user
import * as types from '../../mutation-types'
export const isShowIframe = ({ commit }, message) => {
  commit(types.IFRAME_SHOW, message)
}
export const isDomain = ({ commit }, message) => {
  commit(types.IS_DOMAIN, message)
}
