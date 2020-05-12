import initalSeatsData from "../assets/data.json";

export const initalizeData = function() {
  let allSeatsData = JSON.parse(
    localStorage.getItem("odc-seats-management-sys")
  );

  if (!allSeatsData) {
    allSeatsData =
      !initalSeatsData || Object.keys(initalSeatsData).length === 0
        ? {}
        : initalSeatsData;

    localStorage.setItem(
      "odc-seats-management-sys",
      JSON.stringify(allSeatsData)
    );
  }

  return allSeatsData;
};

export const getRegionData = function(allSeatsData, region) {
  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return {};
  }

  const originalData = allSeatsData[region];

  if (
    !originalData ||
    !Array.isArray(originalData) ||
    originalData.length === 0
  ) {
    return {};
  }

  return region === "greenRegion" && getGreenRegionData(originalData);
};

const getGreenRegionData = function(originalData) {
  const totalSeats = 250;
  const completeData =
    originalData.length < totalSeats
      ? originalData.concat(
          generateEmptyRegion(totalSeats - originalData.length)
        )
      : originalData;

  return {
    subRegion1: groupSeatsByTable(completeData.slice(0, 90)),
    subRegion2: groupSeatsByTable(completeData.slice(90, 190)),
    subRegion3: groupSeatsByTable(completeData.slice(190)),
  };
};

const generateEmptyRegion = function(seatNumber) {
  return Array.apply(null, { length: seatNumber }).map((item, index) => ({
    seatId: String(index),
    monitor1: "",
    monitor2: "",
    monitor3: "",
    macmini1: "",
    macmini2: "",
    tc: "",
    pc: "",
    user: "",
    phone: "",
  }));
};

const groupSeatsByTable = function(seats) {
  const seatGroups = [];
  const unit = 10;
  const groupNumber = Math.ceil(seats.length / unit);
  for (let i = 0; i < groupNumber; i++) {
    i === groupNumber - 1
      ? seatGroups.push(seats.slice(i * unit))
      : seatGroups.push(seats.slice(i * unit, (i + 1) * unit));
  }
  return seatGroups;
};

export const getStatistics = function(allSeatsData, region) {
  const result = {
    total: 0,
    availiable: 0,
    occupied: 0,
  };

  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return result;
  }

  const regionData = allSeatsData[region];

  if (!regionData || regionData.length === 0) {
    return result;
  }

  result.total = regionData.length;
  result.availiable = regionData.filter((item) => !item.user).length;
  result.occupied = regionData.filter((item) => item.user).length;

  return result;
};

export const getSeatsIdByKeywords = function(keywords, allSeatsData, region) {
  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return [];
  }

  const regionData = allSeatsData[region];

  if (!regionData || regionData.length === 0) {
    return [];
  }

  return regionData
    .filter((item) => Object.values(item).includes(keywords))
    .map((item) => item.seatId);
};

export const updateData = function(allSeatsData, region, seat) {
  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return {};
  }

  const regionData = allSeatsData[region];

  if (!regionData || regionData.length === 0) {
    return {};
  }

  const index = regionData.findIndex((item) => item.seatId === seat.seatId);

  if (index === -1) {
    return {};
  }

  regionData.splice(index, 1, seat);

  allSeatsData[region] = regionData;

  return allSeatsData;
};
