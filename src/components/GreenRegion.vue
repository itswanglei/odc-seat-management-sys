<template>
  <div>
    <div>
      <seat-group @edit-seat-info="openEditDialog"></seat-group>
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