<template>
  <div class="seat-wrapper" :class="orientation" @click="$emit('edit-seat-info', seatInfo)">
    <img class="seat-img" :src="imgSrc" />
  </div>
</template>

<script>
import availableSeatImg from "../assets/available-seat.svg";
import occupiedSeatImg from "../assets/occupied-seat.svg";
import pickedSeatImg from "../assets/pickedSeat.svg";

export default {
  props: {
    isPicked: {
      type: Boolean,
      default: false
    },
    orientation: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "left", "right", "bottom"].indexOf(value) !== -1;
      }
    },
    seatInfo: {
      type: Object,
      default() {
        return {
          seatId: "",
          monitor1: "",
          monitor2: "",
          monitor3: "",
          macmini: "",
          tc: "",
          user: "",
          phone: ""
        };
      }
    }
  },
  computed: {
    isAvailable() {
      return !this.seatInfo.user;
    },
    imgSrc() {
      return this.isPicked
        ? pickedSeatImg
        : this.isAvailable
        ? availableSeatImg
        : occupiedSeatImg;
    }
  }
};
</script>

<style scoped>
.seat-wrapper {
  width: 40px;
  height: 40px;
}

.seat-img {
  width: 100%;
  height: 100%;
}

.seat-wrapper:hover {
  cursor: pointer;
  width: 42px;
  height: 42px;
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