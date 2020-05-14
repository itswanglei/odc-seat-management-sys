import initalSeatsData from "../assets/data.json";

const Green_Region_Total_Seats = 250;
const Blue_Region_Total_Seats = 63;

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
  let result = {};

  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    result = {};
  }

  const originalData = allSeatsData[region];

  if (
    !originalData ||
    !Array.isArray(originalData) ||
    originalData.length === 0
  ) {
    result = {};
  }

  if (region === "greenRegion") {
    result = getGreenRegionData(originalData);
  }

  if (region === "blueRegion") {
    result = getBlueRegionData(originalData);
  }

  return result;
};

const getGreenRegionData = function(originalData) {
  const completeData = complementRegionData(
    Green_Region_Total_Seats,
    originalData
  );

  return {
    subRegion1: groupSeatsByTable(completeData.slice(0, 90)),
    subRegion2: groupSeatsByTable(completeData.slice(90, 190)),
    subRegion3: groupSeatsByTable(completeData.slice(190)),
  };
};

const getBlueRegionData = function(originalData) {
  const completeData = complementRegionData(
    Blue_Region_Total_Seats,
    originalData
  );
  return {
    tableA: completeData.slice(0, 12),
    tableB: completeData.slice(12, 20),
    tableC: completeData.slice(20, 28),
    tableD: completeData.slice(28, 38),
    tableE: completeData.slice(38, 46),
    tableF: completeData.slice(46, 52),
    tableG: completeData.slice(52, 57),
    tableH: completeData.slice(57, 63),
  };
};

const complementRegionData = function(totalSeats, originalData) {
  return originalData.length < totalSeats
    ? originalData.concat(generateEmptyRegion(totalSeats - originalData.length))
    : originalData;
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

export const validateImportedDataFormat = function(data) {
  if (data instanceof Object && Object.keys(data).length > 0) {
    data["greenRegion"] && removeInvalidData(data, "greenRegion");
    data["blueRegion"] && removeInvalidData(data, "blueRegion");
    return data;
  }
  return false;
};

const removeInvalidData = function(data, region) {
  if (
    data[region].length > 0 &&
    !data[region].reduce((acc, cur) => acc && cur instanceof Object)
  ) {
    delete data[region];
  }
};
