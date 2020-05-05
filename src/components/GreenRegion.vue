<template>
  <div>
    <div class="odc-region">
      <div class="horizontal-region">
        <seat-group
          v-for="(seatGroup, index) in 6"
          :key="index"
          @edit-seat-info="openEditDialog"
          orientation="horizontal"
        ></seat-group>
      </div>
      <div class="vertical-region">
        <seat-group v-for="(seatGroup, index) in 10" :key="index" @edit-seat-info="openEditDialog"></seat-group>
      </div>
      <div class="vertical-region">
        <seat-group v-for="(seatGroup, index) in 9" :key="index" @edit-seat-info="openEditDialog"></seat-group>
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
  data() {
    return {
      currentSeatInfo: {
        seatId: "",
        monitor1: "",
        monitor2: "",
        monitor3: "",
        macmini: "",
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
      console.log(this.currentSeatInfo);
    },
    saveSeatInfo(seatInfo) {
      Message.success("保存成功");
      console.log(seatInfo);
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