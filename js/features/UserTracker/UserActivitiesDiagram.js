/* ###############################
          UserActivitiesTable
        HANDLE USER ACTIVITIES
   ############################## */

class UserActivitiesDiagram {
  // ADDRESSES F _USER_ACTIVITES_TABLE_
  userActivitiesTblAddresses = [
    "Full Date",
    "Year",
    // "Month",
    "Day",
    "Hour",
    "Minute",
    "Activity Type",
    "Used Keywords",
    "Used Keywords Count",
    "Appeared Results Count",
    "Stored Size"
  ];

  // CREATE _USER_ACTIVITIES_TABLE_
  createUserActivitiesTable() {

    // PUT _USER_ACTIVITIES_DATA_ IN TABLE
    const userActivitiesTbl = document.createElement("table");
    // CREATE ADDRESSES OF TABLE
    let tblAddressesCntr = document.createElement("tr");
    const tblAddresses = this.userActivitiesTblAddresses;
    for (let address of tblAddresses) {
      let addressCntr = document.createElement("td");
      addressCntr.innerText = address;
      // ADD NEW ADDRESS
      tblAddressesCntr.append(addressCntr);
    }

    // ADD ADDRESS CONTAINER INTO TABLE
    userActivitiesTbl.append(tblAddressesCntr);

    // ADD VALUES FROM LOCAL STORAGE
    // FETCH _USER_ACTIVITIES_DATA_
    const userActivitiesData = checkUserActivityDataStore();
    // PUT _USER_ACTIVITIES_VALUES_ IN ROWS
    // LOOP _USER_ACTIVITIES_
    for (let userActv of userActivitiesData) {
      let rowCntr = document.createElement('tr');

      // CREATE COLUMN VALUE
      function addColumn(columnVl) {
        let column = document.createElement('td');
        column.innerText = columnVl;
        rowCntr.append(column);
      }

      // ADD FULL DATE
      addColumn(userActv.fullDate);
      // ADD YEAR
      addColumn(userActv.year);
      // ADD DAY
      addColumn(userActv.day);
      // ADD HOUR
      addColumn(userActv.hour);
      // ADD MINUTE
      addColumn(userActv.minute);
      // ADD _ACTIVITY_TYPE_
      addColumn(userActv.type);
      // ADD USED KEYWORDS
      addColumn(userActv.keywords);
      // ADD _KEYWORDS_COUNT_
      addColumn(userActv.keywordsCount);
      // ADD APPEARED RESULTS
      addColumn(userActv.appearedResultsCount);
      // ADD _STORED_SIZE_
      addColumn(userActv.localStorageSize);

      // ADD NEW ROW F EACH _USER_ACTIVITY_
      userActivitiesTbl.append(rowCntr);
    }
    // RETURN _USER_ACTIVITIES_TABLE
    return userActivitiesTbl;
  }

  // RENDER _USER_ACTIVITES_TABLE_
  renderUserActivitiesTable() {
    // console.log(this.createUserActivitiesTable());
    saverApp.append(this.createUserActivitiesTable())
  }
}

const userTrackerTable = new UserActivitiesDiagram();
