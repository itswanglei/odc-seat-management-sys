import Vue from "vue";
import Vuex from "vuex";

import { getSeatsIdByKeywords } from "./processData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pickedSeats: [],
    isReset: false,
  },
  mutations: {
    searchSeats(state, keywords) {
      state.pickedSeats = getSeatsIdByKeywords(keywords);
      state.isReset = false;
    },
    resetSeatsState(state) {
      state.isReset = true;
    },
  },
  actions: {
    searchSeats({ commit }, keywords) {
      commit("searchSeats", keywords);
    },
    resetSeatsState({ commit }) {
      commit("resetSeatsState");
    },
  },
});
