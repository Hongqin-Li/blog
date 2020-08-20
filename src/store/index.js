import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scrollspy: { headers: [], scrolli: -1 }
  },
  mutations: {
    updateScrollspy(state, data) {
      state.scrollspy = data;
    }
  },
  actions: {},
  modules: {}
});
