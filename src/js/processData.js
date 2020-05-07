import allSeatsData from "../assets/data.json";

export const getGreenRegionData = function() {
  const formatedData = {
    subRegion1: [],
    subRegion2: [],
    subRegion3: [],
  };

  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return formatedData;
  }

  const originalData = allSeatsData["greenRegion"];

  if (!originalData || originalData.length === 0) {
    return formatedData;
  }

  formatedData.subRegion1 = groupSeatsByTable(originalData.slice(0, 90));
  formatedData.subRegion2 = groupSeatsByTable(originalData.slice(90, 190));
  formatedData.subRegion3 = groupSeatsByTable(originalData.slice(190));

  return formatedData;
};

function groupSeatsByTable(seats) {
  const seatGroups = [];
  const unit = 10;
  const groupNumber = Math.ceil(seats.length / unit);
  for (let i = 0; i < groupNumber; i++) {
    i === groupNumber - 1
      ? seatGroups.push(seats.slice(i * unit))
      : seatGroups.push(seats.slice(i * unit, (i + 1) * unit));
  }
  return seatGroups;
}

export const getStatistics = function() {
  const result = {
    total: 0,
    availiable: 0,
    occupied: 0,
  };

  if (!allSeatsData || Object.keys(allSeatsData).length === 0) {
    return result;
  }

  const regionData = allSeatsData["greenRegion"];

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
