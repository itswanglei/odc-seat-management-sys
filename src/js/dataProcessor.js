import initalSeatsData from "../assets/data.json";

const Green_Region_Total_Seats = 250;
const Yellow_Region_Total_Seats = 61;
const Blue_Region_Total_Seats = 158;

export const initalizeData = () => {
  let allSeatsData = JSON.parse(
    localStorage.getItem("odc-seats-management-sys")
  );

  if (!allSeatsData) {
    allSeatsData = initalSeatsData;

    localStorage.setItem(
      "odc-seats-management-sys",
      JSON.stringify(allSeatsData)
    );
  }

  return allSeatsData;
};

export const getRegionData = (allSeatsData, region) => {
  let result = {};

  const originalData = allSeatsData[region];

  if (region === "greenRegion") {
    result = getGreenRegionData(originalData);
  }

  if (region === "yellowRegion") {
    result = getyellowRegionData(originalData);
  }

  if (region === "blueRegion") {
    result = getBlueRegionData(originalData);
  }

  return result;
};

export const getBlueRegionData = (originalData) => {
  const completeData = complementRegionData(
      Blue_Region_Total_Seats,
      originalData
  );

  return {
    tableA: completeData.slice(90, 98),
    subRegion1: groupSeatsByTable(completeData.slice(0, 90)),
    subRegion2: groupSeatsByTable(completeData.slice(98, 138)),
    subRegion3: groupSeatsByTable(completeData.slice(138, 158)),
  }
}

const getGreenRegionData = (originalData) => {
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

const getyellowRegionData = (originalData) => {
  const completeData = complementRegionData(
    Yellow_Region_Total_Seats,
    originalData
  );
  return {
    tableA: completeData.slice(0, 10),
    tableB: completeData.slice(10, 18),
    tableC: completeData.slice(18, 26),
    tableD: completeData.slice(26, 36),
    tableE: completeData.slice(36, 44),
    tableF: completeData.slice(44, 50),
    tableG: completeData.slice(50, 55),
    tableH: completeData.slice(55, 61),
  };
};

const complementRegionData = (totalSeats, originalData) => {
  return originalData.length < totalSeats
    ? originalData.concat(generateEmptyRegion(totalSeats - originalData.length))
    : originalData;
};

const generateEmptyRegion = (seatNumber) => {
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

const groupSeatsByTable = (seats) => {
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

export const getSeatsStatistics = (allSeatsData, region) => {
  const result = {
    total: 0,
    availiable: 0,
    occupied: 0,
    utilization: "0%",
  };

  const regionData = allSeatsData[region];

  result.total = regionData.length;
  result.availiable = regionData.filter((item) => !item.user).length;
  result.occupied = regionData.filter((item) => item.user).length;
  result.utilization = result.total
    ? ((result.occupied / result.total) * 100).toFixed(2) + " %"
    : "0 %";

  return result;
};

export const getSeatsIdByKeywords = (keywords, allSeatsData, region) => {
  const regionData = allSeatsData[region];

  return regionData
    .filter((item) => Object.values(item).some(val => val.includes(keywords)))
    .map((item) => item.seatId);
};

export const updateData = (allSeatsData, region, seat) => {
  const regionData = allSeatsData[region];

  const index = regionData.findIndex((item) => item.seatId === seat.seatId);

  index !== -1 && regionData.splice(index, 1, seat);

  allSeatsData[region] = regionData;

  return allSeatsData;
};

export const validateImportedDataFormat = (data) => {
  if (data instanceof Object && Object.keys(data).length > 0) {
    data["greenRegion"] && removeInvalidData(data, "greenRegion");
    data["yellowRegion"] && removeInvalidData(data, "yellowRegion");
    data["blueRegion"] && removeInvalidData(data, "blueRegion");
    return data;
  }
  return null;
};

const removeInvalidData = (data, region) => {
  if (data[region].length > 0 && !isEachSeatInfoValid(data[region])) {
    delete data[region];
  }
};

const isEachSeatInfoValid = (seats) => {
  const seatAttrs = [
    "seatId",
    "monitor1",
    "monitor2",
    "monitor3",
    "macmini1",
    "macmini2",
    "tc",
    "pc",
    "user",
    "phone",
  ];
  return seats.reduce(
    (acc, cur) =>
      acc &&
      cur instanceof Object &&
      Object.keys(cur)
        .sort()
        .toString() === seatAttrs.sort().toString()
  );
};

export const checkDeviceNumberExistance = (keywords, allSeatsData) => {
  const regionNameMap = {
    greenRegion: "绿区",
    yellowRegion: "黄区",
    blueRegion: "蓝区",
  };

  const checkResult = [];

  const regions = Object.keys(allSeatsData);

  regions.forEach((region) => {
    const regionName = regionNameMap[region] || "";
    const regionData = allSeatsData[region];
    const matchedSeats = regionData
      .filter((item) => Object.values(item).includes(keywords))
      .map((item) => `${regionName}座位${item.seatId}`);
    checkResult.push(...matchedSeats);
  });

  return checkResult;
};

export const getDeviceStatistics = (allSeatsData, region, device) => {
  const result = {
    total: 0,
    availiable: 0,
    occupied: 0,
    utilization: "0%",
  };

  const regionData = allSeatsData[region];

  const matchedSeats = regionData.filter(
    (item) =>
      item[device] ||
      item[`${device}1`] ||
      item[`${device}2`] ||
      item[`${device}3`]
  );

  result.total = matchedSeats.length;
  result.availiable = matchedSeats.filter((item) => !item.user).length;
  result.occupied = matchedSeats.filter((item) => item.user).length;
  result.utilization = result.total
    ? ((result.occupied / result.total) * 100).toFixed(2) + " %"
    : "0 %";

  return result;
};
