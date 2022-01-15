"use strict";
// APP COLORS - THEMES
const colors = {
  bd: {
    bg: "red",
    clr: "#f5f5f5"
  }
};
// TO TRACK THE VALUES FROM USER
let things_to_be_saved = {
  name: "",
  keywords: [],
  message: ""
};

// ALL MESSAGES TO USER
// const MESAGES = {};

// CHECK _USER_KEYWORDS_
const ok_name_keywords = () => {
  // CHECK NAME?
  const name = document.getElementById("savedName").value;
  if (name === "") {
    // alert("name mustn't be empty!");
    const msg = "you should type name!";
    alert_message(msg, "name");
    // return;
  }
  things_to_be_saved.name = name;
  // CHECK KEYWORDS?
  const keywords = document.getElementById("savedKeywords").value;
  let keywordsBox = document.getElementById("keywordsBox");
  let msg = "";
  if (keywordsBox.innerHTML === "") {
    if (keywords.length > 0) {
      msg = "You must make space after each keyword!";
    } else {
      msg =
        "You must have at least one Keyword describes what you save or search?";
      alert_message(msg, "keywords");
      return;
    }
    alert_message(msg, "keywords");
    // return;
  }
  // handle_keywords(keywords);
  // CHEKC MESSAGE?
  const message = document.getElementById("Message").value;
  if (message === "") {
    const msg = "You should define a message!";
    alert_message(msg, "message");
    // return;
  }
  things_to_be_saved.message = message;
  if (success_save("success_message")) {
    // console.log('display other options!');
    const cntrlPanel = document.getElementById("saverControlPanel");
    cntrlPanel.style.display = "block";
  }
  // HIDE Ok BTN
  okBtn.style.display = "none";
};

// SELECT FEEDBACK's MESSAGE FOR _USER_ACTION_
const alert_message = (msg, type) => {
  switch (type) {
    case "name":
      const name = document.getElementById("savedName");
      // name.value = 'type the name here';
      name.style.borderColor = "rgb(120 126 37 / 80%)";
      setTimeout(() => {
        name.style.borderColor = colors.bd.clr;
      }, 5000);
      // name.style.color = 'red';
      break;
    case "keywords":
      const keywords = document.getElementById("savedKeywords");
      // name.value = 'type the name here';
      keywords.style.borderColor = "red";
      setTimeout(() => {
        keywords.style.borderColor = colors.bd.clr;
      }, 5000);
      // name.style.color = 'red';
      break;
    case "message":
      const message = document.getElementById("Message");
      // name.value = 'type the name here';
      message.style.borderColor = "rgb(120 126 37 / 80%)";
      setTimeout(() => {
        message.style.borderColor = colors.bd.clr;
      }, 5000);
      // name.style.color = 'red';
      break;
  } // END SWITCH TYPE
  let alert_message_ele = document.getElementById("alertMessage");
  alert_message_ele.innerHTML = msg;
  alert_message_ele.style.display = "block";
  alert_message_ele.style.height = "35px";
  // alert_message_ele.classList.add('show_alert_message');
  setTimeout(() => {
    alert_message_ele.style.display = "none";
    alert_message_ele.style.height = "0px";
  }, 5000);
  // alert_message.style.height=''
};

// ON SUCCESS SAVE
const success_save = (target) => {
  let msg = "";
  let alert_message_ele = "";
  let success_message = "";
  if (target == "success_message") {
    alert_message_ele = document.getElementById("alertMessage");
    msg = "What's your next step?";
  } else {
    alert_message_ele = document.getElementById("successSaveOrSearch");
    msg = "Successfully Saved!";
  }
  alert_message_ele.style.display = "none !important";
  success_message = document.getElementById("successMessage");
  success_message.innerHTML = msg;
  success_message.style.display = "block";
  success_message.style.height = "35px";
  setTimeout(() => {
    success_message.style.display = "none";
    success_message.style.height = "0px";
  }, 5000);
  // alert_message.style.height=''
  return true;
};

// HANDLE KEYWORDS
const handle_keywords = (keywords) => {
  // console.log(keywords);
  const keywordsBox = document.getElementById("keywordsBox");
  const all_keywords = keywords.split(" ");
  keywordsBox.innerHTML = "";
  for (let i = 0; i < all_keywords.length; i++) {
    if (all_keywords[i] !== "") {
      let keyword_ele = document.createElement("span");
      keyword_ele.classList.add("selector");
      keyword_ele.innerHTML = all_keywords[i];
      keywordsBox.append(keyword_ele);
    }
  }
};

// SAVE KEYWORDS
const savedKeywords = document.getElementById("savedKeywords");
savedKeywords.addEventListener("keypress", (e) => {
  const keywords = document.getElementById("savedKeywords").value;
  handle_keywords(keywords);
});

// SAVE _USER_THINGS_
const save = () => {
  let saverLocalStorage = check_localStorage();
  // console.log(saverLocalStorage);
  saverLocalStorage.push({
    name: things_to_be_saved.name,
    keywords: things_to_be_saved.keywords,
    message: things_to_be_saved.message
  });
  // console.log(saverLocalStorage);
  save_things_in_localStorage(saverLocalStorage);
  // success save message
  success_save();
  
  // TRACT SEARCH-ACTV
  userTracker.trackUser({
    type: "save",
    dataStore: saverLocalStorage,
    localStorageSize: saverLocalStorage.length - 1
  });

  // Empty all inputs
  empty_app_user_inputs();
};

// SAVE _USER_THINGS_ IN LOCAL STORAGE
const save_things_in_localStorage = (thing_to_be_saved) => {
  localStorage.setItem(saverLocalStorage, JSON.stringify(thing_to_be_saved));
};

//
const empty_app_user_inputs = () => {
  name_box.value = "";
  keywords_inp.value = "";
  keyword_box.innerText = "";
  message_box.value = "";
};

// SEARCH ABOUT WHAT USER SEARCH FOR? BASED ON WHATEVER NAME OR KEYWORDS
const search = () => {
  let saverLocalStorage = check_localStorage();
  check_related_results(saverLocalStorage);

  // TRACT SEARCH-ACTV
  userTracker.trackUser({
    type: "search",
    dataStore: saverLocalStorage,
    localStorageSize: saverLocalStorage.length
  });
};

// SEARCH FOR AVAILABLE RESULTS
const check_related_results = (local_storage) => {
  // Show research reults
  show_search_results_statistics();
  // Empty Search Result Container
  search_result_container.innerHTML = "";
  let search_results_map = search_about_related(local_storage);
  search_results.style.display = "block";
  search_results_count.innerText = search_results_map.length;
  for (let i = 0; i < search_results_map.length; i++) {
    // console.log(search_results_map[i]);
    let search_result = create_search_result(search_results_map[i]);
    // console.log(search_result);
    search_result_container.append(search_result);
  }
  // for (item of local_storage) {
  //    console.log(item);
  // }
};

// SHOW INFO OF SEARCH's RESULTS
const show_search_results_statistics = () => {
  search_results.style.display = "block";
  // name of search
  // searchName
  search_name_box.innerText = things_to_be_saved.name;
  // keywords of search
  const search_keywords = things_to_be_saved.keywords.join(", ");
  // console.log(search_keywords);
  // let search_keywords = '';
  // for (keyword of things_to_be_saved.keywords) {
  //   search_keywords
  // }
  search_keywords_box.innerText = search_keywords + ".";
};

// Search in keywords & parameters
const search_about_related = (local_storage_data) => {
  let search_results = [];
  let search_params = [];
  // Search for name in keywords
  for (let keyword of things_to_be_saved.keywords) {
    if (things_to_be_saved.name == keyword) {
      name_exists_in_keywords = true;
    }
    search_params.push(keyword);
  }

  // COMPARE EACH PARAM WITH ALL KEYWORDS OF ALL ITEMS
  for (let prm = 0; prm < search_params.length; prm++) {
    for (let item = 0; item < local_storage_data.length; item++) {
      let item_keywords = local_storage_data[item].keywords;
      for (
        let item_keyword = 0;
        item_keyword < item_keywords.length;
        item_keyword++
      ) {
        // for (item_keyword of item_keywords) {
        // CHECK KEYWORD EXISTS IN ITEM OR NOT?
        if (search_params[prm] == item_keywords[item_keyword]) {
          search_results.push({
            id: item,
            param: search_params[prm]
          });
        }
      } // END _ITEM_KEYWORDS_ LOOP
    } // END ITEMS LOOP
  } // END PARAMS LOOP
  // console.log(search_results);
  let search_results_map = []; /*{index: '', params=[]}*/
  for (let search_result of search_results) {
    // search_result -> {id: '0', param: 'python'}
    let previous_id_check = srch_rslt_idx_exists_in_srch_rslts_map(
      search_result.id
    );
    // console.log(search_result);
    // console.log(previous_id_check);
    if (previous_id_check.result) {
      // previous mentioned
      // console.log("previous:");
      search_results_map[previous_id_check.index].params.push(
        search_result.param
      );
      // console.log(search_results_map[previous_id_check.index].params);
      // console.log(search_results_map[previous_id_check.index].params);
    } else {
      // new mentioned
      // console.log("new:");
      search_results_map.push({
        index: search_result.id,
        params: new Array(search_result.param)
      });
      // console.log(search_results_map);
    }
  }
  function srch_rslt_idx_exists_in_srch_rslts_map(search_result_id) {
    for (let i = 0; i < search_results_map.length; i++) {
      if (search_result_id == search_results_map[i].index) {
        return {
          index: i,
          result: true
        };
      }
    }
    return {
      result: false
    };
  }
  // console.log(search_results_map);
  return search_results_map;
};

// CREATE SEARCH RESULT CONTAINER TO BE RENDERED TO USER
const create_search_result = (search_result) => {
  let localStorage_data = check_localStorage();
  let srch_rslt_cntr = document.createElement("li");
  srch_rslt_cntr.classList.add("search-result");
  // title
  let srch_rslt_title_cntr = document.createElement("p");
  srch_rslt_title_cntr.classList.add("title");
  srch_rslt_title_cntr.innerText = localStorage_data[search_result.index].name;
  let srch_rslt_msg_cntr = document.createElement("div");
  srch_rslt_msg_cntr.classList.add("search-result_message");
  srch_rslt_msg_cntr.innerText = localStorage_data[search_result.index].message;
  // add copy listener
  srch_rslt_msg_cntr = copy_msg(srch_rslt_msg_cntr);
  const params_cntr = document.createElement("div");
  params_cntr.classList.add("search-result_keywords");
  for (let i = 0; i < search_result.params.length; i++) {
    let param_cntr = document.createElement("span");
    param_cntr.innerText = search_result.params[i];
    params_cntr.append(param_cntr);
  }
  // "search-result_keywords"
  // add title
  srch_rslt_cntr.append(srch_rslt_title_cntr);
  // add message
  srch_rslt_cntr.append(srch_rslt_msg_cntr);
  // add params
  srch_rslt_cntr.append(params_cntr);
  return srch_rslt_cntr;
  // add param
};
