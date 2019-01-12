import Vue from 'vue'
import Vuex from 'vuex'
// 基本通用
import demo from './modules/demo'
import page from './modules/page'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    demo,
    page
  },
  strict: 'debug'
})
