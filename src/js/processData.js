import seatsData from "../assets/data.json";

export const getGreenRegionData = function() {
  const greenRegionData = {
    subRegion1: [],
    subRegion2: [],
    subRegion3: [],
  };
  if (seatsData && Object.keys(seatsData).length > 0) {
    const regionData = seatsData["greenRegion"];
    if (regionData && regionData.length > 0) {
      greenRegionData.subRegion1 = getSeatGroups(regionData.slice(0, 90));
      greenRegionData.subRegion2 = getSeatGroups(regionData.slice(90, 190));
      greenRegionData.subRegion3 = getSeatGroups(regionData.slice(190));
    }
  }
  return greenRegionData;
};

function getSeatGroups(seatsData) {
  const seatGroups = [];
  const groupNumber = Math.ceil(seatsData.length / 10);
  for (let i = 0; i < groupNumber; i++) {
    if (i === groupNumber - 1) {
      seatGroups.push(seatsData.slice(i * 10));
    } else {
      seatGroups.push(seatsData.slice(i * 10, (i + 1) * 10));
    }
  }
  return seatGroups;
}

export const getGreenRegionStatistics = function() {
  const statistics = {
    total: 0,
    availiable: 0,
    occupied: 0,
  };
  if (seatsData && Object.keys(seatsData).length > 0) {
    const regionData = seatsData["greenRegion"];
    if (regionData) {
      statistics.total = regionData.length;
      statistics.availiable = regionData.filter((item) => !item.user).length;
      statistics.occupied = regionData.filter((item) => item.user).length;
    }
  }
  return statistics;
};

export const getSeatsIdByKeywords = function(keywords) {
  let seatsId = [];
  if (seatsData && Object.keys(seatsData).length > 0) {
    const regionData = seatsData["greenRegion"];
    if (regionData) {
      seatsId = regionData
        .filter((item) => Object.values(item).includes(keywords))
        .map((item) => item.seatId);
    }
  }
  return seatsId;
};
