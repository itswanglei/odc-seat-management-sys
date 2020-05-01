<template>
  <div id="app">
    <el-menu default-active="green-region" mode="horizontal" router>
      <el-menu-item index="green-region">ODC 绿区</el-menu-item>
      <el-menu-item index="blue-region">ODC 蓝区</el-menu-item>
      <el-menu-item>
        <el-input
          placeholder="搜索座位编号、设备编号、使用人"
          prefix-icon="el-icon-search"
          v-model="keywords"
          @keyup.enter.native="search"
        ></el-input>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Menu, MenuItem, Input } from "element-ui";

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);

export default {
  name: "App",
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    search() {
      console.log(this.keywords);
    }
  }
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

.el-input {
  width: 280px;
}
</style>
