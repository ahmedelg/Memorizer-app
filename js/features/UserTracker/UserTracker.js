/* ###########################
   	     USER TRACKER
      SAVE ALL DATA ABOUT USER
   ########################### */

class UserTracker {
  constructor() {
    if (!UserTracker.instance) {
      this._data = new Array();
      UserTracker.instance = this;
    }
    // ?`exists`
    return UserTracker.instance;
  }

  // TRACK _USER_ACTIVITY_
  trackUser(actvData) {
     const actvDate = featuresGlobal.userActvDate();
     let keywords = keywords_inp.value.split(" ");
     keywords.pop() // REMOVE LST STRING KEYWORDS
    const userActvData = {
      // month:
      year: actvDate.year,
      day: actvDate.day,
      hour: actvDate.hour,
      minute: actvDate.minute,
      fullDate: actvDate.date,
      type: actvData.type,
      keywords: keywords,
      keywordsCount: keywords.length,
      appearedResultsCount: (actvData.type !== 'save')?search_results_count.innerText:0,
      localStorageSize: actvData.localStorageSize
    };
   //  console.log(userActvData);
   //   SAEVE IN LOCAL STORAGE
     saveUserActvData(userActvData);
   } // End trackUser()
   
  
}

const userTracker = new UserTracker();

// {
//    month:
//    day:
//    hour:
//    minute:
//    type:
//    keywords:
//    resultCount:
//    localStorageSize:
//  }
