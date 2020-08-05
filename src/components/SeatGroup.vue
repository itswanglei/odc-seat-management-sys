<template>
  <div :class="orientation">
    <div class="sub-group" :class="seatsOrder.groupA">
      <seat
        v-for="seat in groupA"
        :key="seat.seatId"
        :orientation="seatOrientation.groupA"
        :seat="seat"
        @edit-seat-info="$emit('edit-seat-info', seat)"
      ></seat>
    </div>
    <div class="table" :class="orientation + '-table'">{{tableId}}</div>
    <div class="sub-group" :class="seatsOrder.groupB">
      <seat
        v-for="seat in groupB"
        :key="seat.seatId"
        :orientation="seatOrientation.groupB"
        :seat="seat"
        @edit-seat-info="$emit('edit-seat-info', seat)"
      ></seat>
    </div>
  </div>
</template>

<script>
import Seat from "./Seat";
import { Seats_Orientation_Map, Seats_Order_Map } from "../js/constants";

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
          pc: "",
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
    },
    firstSeatPosition: {
      type: String,
      default: "southwest",
      validator(value) {
        return ["southwest", "southeast", "northeast", "northwest"].includes(
          value
        );
      }
    }
  },
  computed: {
    tableId() {
      const id = this.seats[0].seatId.slice(0, 1);
      const isValidId = /^[A-Za-z]{1}$/.test(id);
      return isValidId ? id : "";
    },
    seatsNumber() {
      return this.seats.length;
    },
    groupA() {
      return this.seats.slice(0, Math.ceil(this.seatsNumber / 2));
    },
    groupB() {
      return this.seats.slice(Math.ceil(this.seatsNumber / 2));
    },
    seatOrientation() {
      return Seats_Orientation_Map[this.orientation][this.order][
        this.firstSeatPosition
      ];
    },
    seatsOrder() {
      return Seats_Order_Map[this.orientation][this.order][
        this.firstSeatPosition
      ];
    }
  }
};
</script>

<style scoped>
.vertical {
  display: flex;
}

.horizontal {
  display: flex;
  flex-direction: column-reverse;
}

.sub-group {
  display: flex;
  justify-content: center;
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
}

.vertical-table {
  width: 40px;
}
</style>
