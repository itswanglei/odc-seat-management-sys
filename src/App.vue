<template>
  <div id="app">
    <el-menu default-active="green-region" mode="horizontal" router>
      <el-menu-item index="green-region">ODC 绿区</el-menu-item>
      <el-menu-item index="blue-region" disabled>ODC 蓝区</el-menu-item>
      <el-menu-item>
        <el-input
          placeholder="搜索座位编号、设备编号、使用人"
          prefix-icon="el-icon-search"
          v-model="keywords"
          @keyup.enter.native="search"
        ></el-input>
      </el-menu-item>
      <el-menu-item>
        <div>
          <span>座位总数 {{statistics.total}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>空闲 {{statistics.availiable}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>已占用 {{statistics.occupied}}</span>
        </div>
      </el-menu-item>
    </el-menu>
    <router-view :seats-data="seatsData"></router-view>
  </div>
</template>

<script>
import { getRegionData, getStatistics } from "./js/processData";

export default {
  name: "App",
  data() {
    return {
      keywords: "",
      statistics: getStatistics(this.$route.name),
      seatsData: getRegionData(this.$route.name)
    };
  },
  methods: {
    search() {
      this.keywords
        ? this.$store.dispatch("searchSeats", {
            keywords: this.keywords,
            region: this.$route.name
          })
        : this.$store.dispatch("resetSeatsState");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}

.el-input {
  width: 280px;
}
</style>
