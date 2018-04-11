import Vue from 'vue'
import Vuex from 'vuex'
import news from './modules/news'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    news
  },
  strict: debug,
})
