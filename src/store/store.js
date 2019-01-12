import Vue from 'vue';
import Vuex from 'vuex';
// 基本通用
import user from './modules/user';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user
  },
  strict: 'debug'
});
