import Vue from 'vue'
import App from './Demo.vue'
import router from './router/index.js'
import store from './store/store.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#demo')
