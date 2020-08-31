<template>
  <div class="region-wrapper">
    <device-statistics-table class="device-statistics-table" :data="allSeatsData" ref="table"></device-statistics-table>
    <div class="blue-region">
      <div class="vertical-region">
        <seat-group
            :seats="seatsData.tableA"
            @edit-seat-info="openEditDialog"
            order="counterclockwise"
            firstSeatPosition="northwest"
            class="row-1"
        ></seat-group>
        <seat-group
            v-for="(seats, index) in seatsData.subRegion1"
            :key="'r1'+index"
            :seats="seats"
            @edit-seat-info="openEditDialog"
        ></seat-group>
      </div>
      <div class="vertical-region">
        <div class="group">
          <seat-group
              v-for="(seats, index) in seatsData.subRegion3"
              :key="'r3'+index"
              :seats="seats"
              @edit-seat-info="openEditDialog"
              orientation="horizontal"
              order="counterclockwise"
          ></seat-group>
        </div>
        <seat-group
            v-for="(seats, index) in seatsData.subRegion2"
            :key="'r2'+index"
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
          tableA: [],
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
        this.$route.name,
        "monitor"
      );
      const macmini = getDeviceStatistics(
        this.allSeatsData,
        this.$route.name,
        "macmini"
      );
      const tc = getDeviceStatistics(this.allSeatsData, this.$route.name, "tc");

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
        deviceType: "TC",
        ...tc
      });
    }
  }
};
</script>

<style>
.region-wrapper {
  position: relative;
}

.device-statistics-table {
  position: absolute;
  left: 10px;
}

.blue-region {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
}

.vertical-region{
  margin: 20px;
}

.row-1 {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}

.group{
  margin-right: 40px;
}
</style>
