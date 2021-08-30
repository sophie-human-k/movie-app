import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store, // 모든 파일에서 store 사용할 수 있게 등록
  render: h => h(App)
}).$mount('#app')
