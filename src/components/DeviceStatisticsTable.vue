<template>
  <div class="device-statistics-table-wrapper">
    <el-table :data="tableData" style="width: 420px">
      <el-table-column prop="deviceType" label="设备类型" width="80"></el-table-column>
      <el-table-column prop="total" label="总数" width="80" align="right"></el-table-column>
      <el-table-column prop="availiable" label="空闲" width="80" align="right"></el-table-column>
      <el-table-column prop="occupied" label="使用中" width="80" align="right"></el-table-column>
      <el-table-column prop="utilization" label="利用率" width="100" align="right"></el-table-column>
    </el-table>
    <div class="switch-seat">
      <span>换座位</span>
      <el-input v-model="switchFrom" placeholder="要交换的座位编号"></el-input>
      <el-input v-model="switchTo" placeholder="被交换的座位编号"></el-input>
      <el-button type="primary" @click="switchAction">交换</el-button>
    </div>
  </div>
</template>

<script>
import { getDeviceStatistics } from "../js/dataProcessor";
import { Notification } from "element-ui";

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    const monitor = getDeviceStatistics(this.data, this.$route.name, "monitor");
    const macmini = getDeviceStatistics(this.data, this.$route.name, "macmini");
    const tcpc = getDeviceStatistics(
      this.data,
      this.$route.name,
      this.$route.name === "greenRegion" ? "tc" : "pc"
    );

    return {
      tableData: [
        {
          deviceType: "显示器",
          ...monitor
        },
        {
          deviceType: "Mac mini",
          ...macmini,
        },
        {
          deviceType: this.$route.name === "greenRegion" ? "TC" : "PC",
          ...tcpc,
        },
      ],
      switchFrom: "",
      switchTo: "",
    };
  },
  methods: {
    switchAction() {
      this.$store
        .dispatch("switchSeat", {
          from: this.switchFrom,
          to: this.switchTo,
          region: this.$route.name,
        })
        .then((res) => {
          if (res) {
            Notification.success({
              title: "交换成功",
            });
          }
        });
    },
    updateDeviceStatistics(seatsData, region) {
      const monitor = getDeviceStatistics(seatsData, region, "monitor");
      const macmini = getDeviceStatistics(seatsData, region, "macmini");
      const tcpc = getDeviceStatistics(seatsData, region, region === "greenRegion" ? "tc" : "pc");

      this.tableData = [
        {
          deviceType: "显示器",
          ...monitor
        },
        {
          deviceType: "Mac mini",
          ...macmini,
        },
        {
          deviceType: this.$route.name === "greenRegion" ? "TC" : "PC",
          ...tcpc,
        },
      ];
    }
  },
};
</script>

<style>
.switch-seat .el-input {
  width: auto;
}
</style>

<style scoped>
.device-statistics-table-wrapper {
  display: flex;
  z-index: 999;
}
.switch-seat {
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  color: #909399;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 0;
}

.switch-seat > * {
  margin-bottom: 10px;
}
</style>
