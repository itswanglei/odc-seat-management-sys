<template>
  <div class="odc-region">
    <seat-group
      :seats="seatsData.tableA"
      @edit-seat-info="openEditDialog"
      orientation="horizontal"
      firstSeatPosition="southeast"
    ></seat-group>
    <seat-group
      :seats="seatsData.tableB"
      @edit-seat-info="openEditDialog"
      orientation="horizontal"
      firstSeatPosition="southeast"
    ></seat-group>
    <seat-group
      :seats="seatsData.tableC"
      @edit-seat-info="openEditDialog"
      orientation="horizontal"
      order="counterclockwise"
    ></seat-group>
    <seat-group
      :seats="seatsData.tableD"
      @edit-seat-info="openEditDialog"
      orientation="horizontal"
      firstSeatPosition="southeast"
    ></seat-group>
    <seat-group
      :seats="seatsData.tableE"
      @edit-seat-info="openEditDialog"
      order="counterclockwise"
      firstSeatPosition="northwest"
    ></seat-group>
    <seat-group
      :seats="seatsData.tableF"
      @edit-seat-info="openEditDialog"
      order="counterclockwise"
      firstSeatPosition="northwest"
    ></seat-group>
    <seat-group
      :seats="seatsData.tableG"
      @edit-seat-info="openEditDialog"
      order="counterclockwise"
      firstSeatPosition="northwest"
    ></seat-group>
    <seat-group
      :seats="seatsData.tableH"
      @edit-seat-info="openEditDialog"
      order="counterclockwise"
      firstSeatPosition="northwest"
    ></seat-group>
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
          tableA: [],
          tableB: [],
          tableC: [],
          tableD: [],
          tableE: [],
          tableF: [],
          tableG: [],
          tableH: []
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
.odc-region {
  margin: 20px;
}
</style>