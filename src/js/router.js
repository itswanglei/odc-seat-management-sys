import Vue from "vue";
import VueRouter from "vue-router";

import GreenRegion from "../components/GreenRegion.vue";
import YellowRegion from "../components/YellowRegion.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/green-region", name: "greenRegion", component: GreenRegion },
    { path: "/yellow-region", name: "yellowRegion", component: YellowRegion },
    { path: "/", redirect: "/green-region" },
  ],
});
