import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

import "./js/element-ui";

import App from "./App.vue";
import GreenRegion from "./components/GreenRegion.vue";
import BlueRegion from "./components/BlueRegion.vue";

import { getSeatsIdByKeywords } from "./js/processData";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/green-region", component: GreenRegion },
    { path: "/blue-region", component: BlueRegion },
    { path: "/", redirect: "/green-region" },
  ],
});

Vue.use(Vuex);

const store = new Vuex.Store({
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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
