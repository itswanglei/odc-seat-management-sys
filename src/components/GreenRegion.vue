<template>
  <div>
    <div class="odc-region">
      <div class="horizontal-region">
        <seat-group
          v-for="(seats, index) in seatsData.subRegion3"
          :key="index"
          :seats="seats"
          @edit-seat-info="openEditDialog"
          orientation="horizontal"
        ></seat-group>
      </div>
      <div class="vertical-region">
        <seat-group
          v-for="(seats, index) in seatsData.subRegion2"
          :key="index"
          :seats="seats"
          @edit-seat-info="openEditDialog"
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
    <seat-info-form ref="dialog" v-bind="currentSeatInfo" @submit="saveSeatInfo"></seat-info-form>
  </div>
</template>

<script>
import { Message } from "element-ui";
import SeatGroup from "./SeatGroup";
import SeatInfoForm from "./SeatInfoForm";

export default {
  components: {
    "seat-group": SeatGroup,
    "seat-info-form": SeatInfoForm
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
  data() {
    return {
      currentSeatInfo: {
        seatId: "",
        monitor1: "",
        monitor2: "",
        monitor3: "",
        macmini1: "",
        macmini2: "",
        tc: "",
        user: "",
        phone: ""
      }
    };
  },
  methods: {
    openEditDialog(seatInfo) {
      this.currentSeatInfo = seatInfo;
      this.$refs["dialog"].handleOpen();
    },
    saveSeatInfo(seatInfo) {
      Message.success("保存成功");
      this.$store.dispatch("updateSeatsData", {
        region: "greenRegion",
        seat: seatInfo
      });
    }
  }
};
</script>

<style>
.odc-region {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.horizontal-region {
  width: 20%;
  margin: 20px 20px 20px 200px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
}

.vertical-region {
  width: 70%;
  margin: 20px;
  display: flex;
}
</style>