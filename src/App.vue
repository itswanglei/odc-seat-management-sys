<template>
  <div id="app">
    <el-menu class="menu" :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="green-region">ODC 绿区</el-menu-item>
      <el-menu-item index="blue-region">ODC 蓝区</el-menu-item>
      <el-menu-item>
        <el-input
          size="medium"
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
          <el-divider direction="vertical"></el-divider>
          <span>利用率 {{statistics.utilization}}</span>
        </div>
      </el-menu-item>
      <el-menu-item class="button-group">
        <input
          type="file"
          ref="fileElem"
          accept="application/json"
          style="display:none"
          @change="handleFiles"
        />
        <a
          :href="downloadUrl"
          ref="downloadElem"
          style="display:none"
          download="odc-seats-data.json"
        ></a>
        <el-button-group>
          <el-button plain size="medium" @click="upload">导 入</el-button>
          <el-button plain size="medium" @click="download">导 出</el-button>
        </el-button-group>
      </el-menu-item>
    </el-menu>
    <router-view :seats-data="seatsData"></router-view>
  </div>
</template>

<script>
import { Notification } from "element-ui";

import { mapState } from "vuex";
import { getRegionData, getStatistics } from "./js/dataProcessor";

export default {
  name: "App",
  data() {
    return {
      activeIndex: this.$route.path.slice(1),
      keywords: "",
      downloadUrl: ""
    };
  },
  computed: {
    ...mapState(["allSeatsData"]),
    statistics() {
      return getStatistics(this.allSeatsData, this.$route.name);
    },
    seatsData() {
      return getRegionData(this.allSeatsData, this.$route.name);
    }
  },
  methods: {
    search() {
      this.keywords
        ? this.$store.dispatch("searchSeats", {
            keywords: this.keywords,
            region: this.$route.name
          })
        : this.$store.dispatch("resetSeatsState");
    },
    upload() {
      const fileElem = this.$refs["fileElem"];
      fileElem && fileElem.click();
    },
    download() {
      const data = localStorage.getItem("odc-seats-management-sys");
      const blob = new Blob([data], { type: "application/json" });
      this.downloadUrl = URL.createObjectURL(blob);
      const downloadElem = this.$refs["downloadElem"];
      downloadElem && setTimeout(() => downloadElem.click(), 1000);
    },
    handleFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        const data = JSON.parse(event.target.result);
        this.$store.dispatch("importSeatsData", data);
        Notification.success({
          title: "导入成功"
        });
      };
      reader.readAsText(file);
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

.el-menu {
  position: relative;
}

.el-input {
  width: 280px;
}

.button-group {
  position: absolute;
  right: 0px;
}
</style>
