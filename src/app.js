import Vue from 'vue';
import 'babel-polyfill';
// import 'lib-flexible/flexible.js'
import './util/config';
import App from './App.vue';
import router from './router/index.js';
import store from './store/store.js';
import {remInit} from './util/rem-init';

Vue.config.productionTip = false;
remInit(document, window, function() {
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
