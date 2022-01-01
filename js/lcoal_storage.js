// HANDLE LOCAL STORAGE
const check_localStorage = () => {
  let db = localStorage.getItem(local_storage_name);
  // console.log(db);
  if (db === null) {
    localStorage.setItem(local_storage_name, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(local_storage_name));
};