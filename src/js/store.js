import Vue from "vue";
import Vuex from "vuex";

import {
  initalizeData,
  getSeatsIdByKeywords,
  updateData,
  validateImportedDataFormat,
} from "./dataProcessor";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allSeatsData: initalizeData(),
    pickedSeats: [],
    isReset: false,
  },
  mutations: {
    searchSeats(state, { keywords, region }) {
      state.pickedSeats = getSeatsIdByKeywords(
        keywords,
        state.allSeatsData,
        region
      );
      state.isReset = false;
    },
    resetSeatsState(state) {
      state.isReset = true;
    },
    updateSeatsData(state, { region, seat }) {
      state.allSeatsData = updateData(state.allSeatsData, region, seat);
    },
    importSeatsData(state, seatsData) {
      if (validateImportedDataFormat(seatsData)) {
        state.allSeatsData = Object.assign({}, seatsData);
      }
    },
  },
  actions: {
    searchSeats({ commit }, payload) {
      commit("searchSeats", payload);
    },
    resetSeatsState({ commit }) {
      commit("resetSeatsState");
    },
    updateSeatsData({ commit }, payload) {
      commit("updateSeatsData", payload);
    },
    importSeatsData({ commit }, seatsData) {
      commit("importSeatsData", seatsData);
    },
  },
  plugins: [localStoragePlugin],
});

function localStoragePlugin(store) {
  store.subscribe((mutation, state) => {
    if (["updateSeatsData", "importSeatsData"].includes(mutation.type)) {
      localStorage.setItem(
        "odc-seats-management-sys",
        JSON.stringify(state.allSeatsData)
      );
    }
  });
}
