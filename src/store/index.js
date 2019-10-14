import Vue from 'vue'
import Vuex from 'vuex'
import evidence from './modules/evidence'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    evidence
  },
  plugins: [persistedState()]
})