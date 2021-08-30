// store의 핵심인 index.js만 export default new Vuex.Store
import Vue from 'vue'
import Vuex from 'vuex'
import movie from './movie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movie
  }
})