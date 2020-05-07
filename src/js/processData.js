import allSeatsData from "../assets/data.json";

export const getRegionData = function(region) {
  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return {};
  }

  const originalData = allSeatsData[region];

  if (!originalData || originalData.length === 0) {
    return {};
  }

  return region === "greenRegion" && getGreenRegionData(originalData);
};

const getGreenRegionData = function(originalData) {
  return {
    subRegion1: groupSeatsByTable(originalData.slice(0, 90)),
    subRegion2: groupSeatsByTable(originalData.slice(90, 190)),
    subRegion3: groupSeatsByTable(originalData.slice(190)),
  };
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

export const getStatistics = function(region) {
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

export const getSeatsIdByKeywords = function(keywords) {
  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return [];
  }

  const regionData = allSeatsData["greenRegion"];

  if (!regionData || regionData.length === 0) {
    return [];
  }

  return regionData
    .filter((item) => Object.values(item).includes(keywords))
    .map((item) => item.seatId);
};
