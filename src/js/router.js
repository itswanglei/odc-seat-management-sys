import Vue from "vue";
import VueRouter from "vue-router";

import GreenRegion from "@/components/GreenRegion.vue";
import YellowRegion from "@/components/YellowRegion.vue";
import BlueRegion from "@/components/BlueRegion";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/green-region", name: "greenRegion", component: GreenRegion },
    { path: "/yellow-region", name: "yellowRegion", component: YellowRegion },
    { path: "/blue-region", name: "blueRegion", component: BlueRegion },
    { path: "/", redirect: "/green-region" },
  ],
});
