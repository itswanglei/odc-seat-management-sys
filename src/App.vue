<template>
  <div id="app">
    <el-menu default-active="green-region" mode="horizontal" router>
      <el-menu-item index="green-region">ODC 绿区</el-menu-item>
      <el-menu-item index="blue-region">ODC 蓝区</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Menu, MenuItem } from "element-ui";

Vue.use(Menu);
Vue.use(MenuItem);

export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
