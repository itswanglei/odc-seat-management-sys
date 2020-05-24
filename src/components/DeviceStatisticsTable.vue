<template>
  <el-table :data="tableData" style="width: 420px">
    <el-table-column prop="deviceType" label="设备类型" width="80"></el-table-column>
    <el-table-column prop="total" label="总数" width="80" align="right"></el-table-column>
    <el-table-column prop="availiable" label="空闲" width="80" align="right"></el-table-column>
    <el-table-column prop="occupied" label="使用中" width="80" align="right"></el-table-column>
    <el-table-column prop="utilization" label="利用率" width="100" align="right"></el-table-column>
  </el-table>
</template>

<script>
import { getDeviceStatistics } from "../js/dataProcessor";

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    const monitor = getDeviceStatistics(this.data, this.$route.name, "monitor");
    const macmini = getDeviceStatistics(this.data, this.$route.name, "macmini");
    const tc = getDeviceStatistics(this.data, this.$route.name, "tc");

    return {
      tableData: [
        {
          deviceType: "显示器",
          ...monitor
        },
        {
          deviceType: "Mac mini",
          ...macmini
        },
        {
          deviceType: "TC",
          ...tc
        }
      ]
    };
  }
};
</script>