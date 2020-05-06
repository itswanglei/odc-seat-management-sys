import Vue from "vue";

import "./js/element-ui";

import router from "./js/router";
import store from "./js/store";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
