import 'normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
Vue.config.productionTip = false

Vue.use(ElementUI);
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
