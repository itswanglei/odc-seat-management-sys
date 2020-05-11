<template>
  <div :class="orientation + '-wrapper'">
    <div :class="[orientation, seatsOrder.leftGroup]">
      <seat
        v-for="seat in leftGroup"
        :key="seat.seatId"
        :orientation="seatOrientation.leftGroup"
        :seat="seat"
        @edit-seat-info="$emit('edit-seat-info', seat)"
      ></seat>
    </div>
    <div class="table" :class="orientation + '-table'">{{tableId}}</div>
    <div :class="[orientation, seatsOrder.rightGroup]">
      <seat
        v-for="seat in rightGroup"
        :key="seat.seatId"
        :orientation="seatOrientation.rightGroup"
        :seat="seat"
        @edit-seat-info="$emit('edit-seat-info', seat)"
      ></seat>
    </div>
  </div>
</template>

<script>
import Seat from "./Seat";

export default {
  components: {
    Seat
  },
  props: {
    seats: {
      type: Array,
      default() {
        return Array.apply(null, { length: 10 }).map((item, index) => ({
          seatId: String(index),
          monitor1: "",
          monitor2: "",
          monitor3: "",
          macmini1: "",
          macmini2: "",
          tc: "",
          user: "",
          phone: ""
        }));
      }
    },
    orientation: {
      type: String,
      default: "vertical",
      validator(value) {
        return ["horizontal", "vertical"].includes(value);
      }
    },
    order: {
      type: String,
      default: "clockwise",
      validator(value) {
        return ["clockwise", "counterclockwise"].includes(value);
      }
    }
  },
  computed: {
    tableId() {
      const id = this.seats[0].seatId.slice(0, 1);
      const isValidId = /^[A-Za-z]{1}$/.test(id);
      return isValidId ? id : "";
    },
    leftGroup() {
      return this.seats.slice(0, 5);
    },
    rightGroup() {
      return this.seats.slice(5);
    },
    seatOrientation() {
      return this.orientation === "horizontal"
        ? {
            leftGroup: "top",
            rightGroup: "bottom"
          }
        : {
            leftGroup: "right",
            rightGroup: "left"
          };
    },
    seatsOrder() {
      if (this.orientation === "vertical") {
        return this.order === "clockwise"
          ? {
              leftGroup: "bottom-to-top",
              rightGroup: "top-to-bottom"
            }
          : {
              leftGroup: "top-to-bottom",
              rightGroup: "bottom-to-top"
            };
      } else {
        return this.order === "clockwise"
          ? {
              leftGroup: "right-to-left",
              rightGroup: "left-to-right"
            }
          : {
              leftGroup: "left-to-right",
              rightGroup: "right-to-left"
            };
      }
    }
  }
};
</script>

<style scoped>
.vertical-wrapper {
  display: flex;
}

.horizontal-wrapper {
  display: flex;
  flex-direction: column-reverse;
}

.vertical,
.horizontal {
  display: flex;
}

.top-to-bottom {
  flex-direction: column;
}

.bottom-to-top {
  flex-direction: column-reverse;
}

.left-to-right {
  flex-direction: row;
}

.right-to-left {
  flex-direction: row-reverse;
}

.table {
  border-radius: 5px;
  background: rgb(142, 214, 221);
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.horizontal-table {
  height: 40px;
  width: 150px;
}

.vertical-table {
  width: 40px;
  height: 150px;
}
</style>