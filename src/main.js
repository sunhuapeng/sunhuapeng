// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mavonEditor from 'mavon-editor'
import axios from 'axios'
import VueResource from 'vue-resource'
import 'mavon-editor/dist/css/index.css'
import '@/common/css/clear-style.css'
import '@/common/css/common.css'
import store from "@/store"
import global from './global'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(global)
/* eslint-disable no-new */
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
