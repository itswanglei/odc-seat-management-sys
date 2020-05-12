<template>
  <el-popover placement="right" width="100" trigger="hover">
    <div class="popover-content">
      <p>座位编号：{{seat.seatId}}</p>
      <p>显示器 #1：{{seat.monitor1}}</p>
      <p>显示器 #2：{{seat.monitor2}}</p>
      <p>显示器 #3：{{seat.monitor3}}</p>
      <p>Mac mini #1：{{seat.macmini1}}</p>
      <p>Mac mini #2：{{seat.macmini2}}</p>
      <p v-if="region === 'greenRegion'">TC 盒子：{{seat.tc}}</p>
      <p v-if="region === 'blueRegion'">PC：{{seat.pc}}</p>
      <p>使用人：{{seat.user}}</p>
      <p>联系方式：{{seat.phone}}</p>
    </div>
    <div
      slot="reference"
      class="seat-wrapper"
      :class="orientation"
      @click="$emit('edit-seat-info')"
    >
      <img class="seat-img" :src="imgSrc" />
    </div>
  </el-popover>
</template>

<script>
import { mapState } from "vuex";
import availableSeatImg from "../assets/available-seat.svg";
import occupiedSeatImg from "../assets/occupied-seat.svg";
import pickedSeatImg from "../assets/pickedSeat.svg";

export default {
  props: {
    orientation: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "left", "right", "bottom"].indexOf(value) !== -1;
      }
    },
    seat: {
      type: Object,
      default() {
        return {
          seatId: "",
          monitor1: "",
          monitor2: "",
          monitor3: "",
          macmini1: "",
          macmini2: "",
          tc: "",
          pc: "",
          user: "",
          phone: ""
        };
      }
    }
  },
  computed: {
    ...mapState(["pickedSeats", "isReset"]),
    isAvailable() {
      return !this.seat.user;
    },
    isPicked() {
      return this.pickedSeats.includes(this.seat.seatId);
    },
    imgSrc() {
      return this.isPicked && !this.isReset
        ? pickedSeatImg
        : this.isAvailable
        ? availableSeatImg
        : occupiedSeatImg;
    },
    region() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped>
.popover-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
}

.seat-wrapper {
  width: 30px;
  height: 30px;
}

.seat-img {
  width: 100%;
  height: 100%;
}

.seat-wrapper:hover {
  cursor: pointer;
}

.left {
  transform: rotate(-90deg);
}

.right {
  transform: rotate(90deg);
}

.bottom {
  transform: rotate(180deg);
}
</style>