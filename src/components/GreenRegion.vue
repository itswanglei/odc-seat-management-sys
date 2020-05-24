<template>
  <div class="green-region-wrapper">
    <device-statistics-table class="device-statistics-table" :data="allSeatsData" ref="table"></device-statistics-table>
    <div class="green-region">
      <div class="horizontal-region">
        <seat-group
          v-for="(seats, index) in seatsData.subRegion3"
          :key="index"
          :seats="seats"
          @edit-seat-info="openEditDialog"
          orientation="horizontal"
          order="counterclockwise"
        ></seat-group>
      </div>
      <div class="vertical-region">
        <seat-group
          v-for="(seats, index) in seatsData.subRegion2"
          :key="index"
          :seats="seats"
          @edit-seat-info="openEditDialog"
          order="counterclockwise"
          firstSeatPosition="northwest"
        ></seat-group>
      </div>
      <div class="vertical-region">
        <seat-group
          v-for="(seats, index) in seatsData.subRegion1"
          :key="index"
          :seats="seats"
          @edit-seat-info="openEditDialog"
        ></seat-group>
      </div>
    </div>
    <seat-info-form ref="dialog" @update-device-statistics="updateDeviceStatistics"></seat-info-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SeatGroup from "./SeatGroup";
import SeatInfoForm from "./SeatInfoForm";
import DeviceStatisticsTable from "./DeviceStatisticsTable";
import { getDeviceStatistics } from "../js/dataProcessor";

export default {
  components: {
    "seat-group": SeatGroup,
    "seat-info-form": SeatInfoForm,
    "device-statistics-table": DeviceStatisticsTable
  },
  props: {
    seatsData: {
      type: Object,
      default() {
        return {
          subRegion1: [],
          subRegion2: [],
          subRegion3: []
        };
      }
    }
  },
  computed: {
    ...mapState(["allSeatsData"])
  },
  methods: {
    openEditDialog(seatInfo) {
      this.$refs["dialog"].handleOpen(seatInfo);
    },
    updateDeviceStatistics() {
      const monitor = getDeviceStatistics(
        this.allSeatsData,
        "greenRegion",
        "monitor"
      );
      const macmini = getDeviceStatistics(
        this.allSeatsData,
        "greenRegion",
        "macmini"
      );
      const tc = getDeviceStatistics(this.allSeatsData, "greenRegion", "tc");

      const table = this.$refs["table"];
      table.$set(table.tableData, 0, {
        deviceType: "显示器",
        ...monitor
      });
      table.$set(table.tableData, 1, {
        deviceType: "Mac mini",
        ...macmini
      });
      table.$set(table.tableData, 2, {
        deviceType: "tc",
        ...tc
      });
    }
  }
};
</script>

<style>
.green-region-wrapper {
  position: relative;
}

.device-statistics-table {
  position: absolute;
  left: 10px;
}

.green-region {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.horizontal-region {
  width: 320px;
  margin: 20px 20px 20px 200px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
}

.vertical-region {
  width: 1000px;
  margin: 20px;
  display: flex;
}
</style>