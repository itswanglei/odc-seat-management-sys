export const Seats_Orientation_Map = {
  horizontal: {
    clockwise: {
      northwest: {
        groupA: "bottom",
        groupB: "top",
      },
      southeast: {
        groupA: "top",
        groupB: "bottom",
      },
    },
    counterclockwise: {
      southwest: {
        groupA: "top",
        groupB: "bottom",
      },
      northeast: {
        groupA: "bottom",
        groupB: "top",
      },
    },
  },
  vertical: {
    clockwise: {
      southwest: {
        groupA: "right",
        groupB: "left",
      },
      northeast: {
        groupA: "left",
        groupB: "right",
      },
    },
    counterclockwise: {
      northwest: {
        groupA: "right",
        groupB: "left",
      },
      southeast: {
        groupA: "left",
        groupB: "right",
      },
    },
  },
};

export const Seats_Order_Map = {
  horizontal: {
    clockwise: {
      northwest: {
        groupA: "left-to-right",
        groupB: "right-to-left",
      },
      southeast: {
        groupA: "right-to-left",
        groupB: "left-to-right",
      },
    },
    counterclockwise: {
      southwest: {
        groupA: "left-to-right",
        groupB: "right-to-left",
      },
      northeast: {
        groupA: "right-to-left",
        groupB: "left-to-right",
      },
    },
  },
  vertical: {
    clockwise: {
      southwest: {
        groupA: "bottom-to-top",
        groupB: "top-to-bottom",
      },
      northeast: {
        groupA: "top-to-bottom",
        groupB: "bottom-to-top",
      },
    },
    counterclockwise: {
      northwest: {
        groupA: "top-to-bottom",
        groupB: "bottom-to-top",
      },
      southeast: {
        groupA: "top-to-bottom",
        groupB: "bottom-to-top",
      },
    },
  },
};
