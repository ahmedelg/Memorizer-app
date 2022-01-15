// HANDLE LOCAL STORAGE
const check_localStorage = () => {
  let db = localStorage.getItem(saverLocalStorage);
  // console.log(db);
  if (db === null) {
    localStorage.setItem(saverLocalStorage, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(saverLocalStorage));
};

// RETURN _USER_TRACKER_DS_
const checkUserActivityDataStore = () => {
  let userTrackerDS = localStorage.getItem(userTrackerDsName);
  if (userTrackerDS == null) {
    localStorage.setItem(userTrackerDsName, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(userTrackerDsName));
};

// SAVE _USER_ACTIVITY_DATE_
const saveUserActvData = (actvData) => {
  userActvDs = checkUserActivityDataStore();
  // console.log(userActvDs);
  userActvDs.push(actvData);
  localStorage.setItem(userTrackerDsName, JSON.stringify(userActvDs));
};
