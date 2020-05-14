<template>
  <div>
    <div class="odc-region">
      <div class="horizontal-region" :style="regionWidth">
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
  computed: {
    regionWidth() {
      return window.innerWidth > 1440 ? { width: "20%" } : { width: "25%" };
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
.odc-region {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.horizontal-region {
  /* width: 20%; */
  margin: 20px 20px 20px 200px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
}

/* @media screen and (max-width: 1840px) {
  .horizontal-region {
    width: 20%;
  }
}

@media screen and (max-width: 1400px) {
  .horizontal-region {
    width: 40%;
  }
} */

.vertical-region {
  width: 70%;
  margin: 20px;
  display: flex;
}
</style>