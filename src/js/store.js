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
    searchSeats(state, { keywords, region }) {
      state.pickedSeats = getSeatsIdByKeywords(keywords, region);
      state.isReset = false;
    },
    resetSeatsState(state) {
      state.isReset = true;
    },
  },
  actions: {
    searchSeats({ commit }, payload) {
      commit("searchSeats", payload);
    },
    resetSeatsState({ commit }) {
      commit("resetSeatsState");
    },
  },
});
