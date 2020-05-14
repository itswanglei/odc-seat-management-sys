<template>
  <div>
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
    <seat-info-form ref="dialog"></seat-info-form>
  </div>
</template>

<script>
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

  methods: {
    openEditDialog(seatInfo) {
      this.$refs["dialog"].handleOpen(seatInfo);
    }
  }
};
</script>

<style>
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