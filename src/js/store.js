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
    switchSeat(state, { region, from, to, resolve }) {
      const fromData = state.allSeatsData[region].find(item => item.seatId === from);
      const toData = state.allSeatsData[region].find(item => item.seatId === to);

      const switchData = (fromData, toData, fields) => {
        fields.forEach(field => {
          const tmp = fromData[field]
          fromData[field] = toData[field]
          toData[field] = tmp;
        })
      }

      if (fromData && toData) {
        switchData(fromData, toData, ["user", "seatId", "phone", "tc", "pc", "macmini1", "macmini2"]);
        resolve(true);
      }

      resolve(false);
    }
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
    switchSeat({ commit }, payload) {
      return new Promise(resolve => {
        commit("switchSeat", Object.assign(payload, { resolve }));
      })
    }
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
