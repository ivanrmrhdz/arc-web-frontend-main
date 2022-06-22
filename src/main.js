import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import services from './services'
import {VueMaskDirective} from 'v-mask'

// register VueFusionCharts component

Vue.directive('mask', VueMaskDirective);

Vue.use(function(Vue, install) {
  Vue.prototype.$services = services;
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
