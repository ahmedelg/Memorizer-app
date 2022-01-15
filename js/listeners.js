message_box.addEventListener('change', (vnt) => {
  // Update save_info or search_info
  things_to_be_saved.message = vnt.target.value;
});

name_box.addEventListener('change', (vnt) => {
  // Update save_info or search_info
  things_to_be_saved.name = vnt.target.value;
});

// ON USER TYPE KEYWORDS
keywords_inp.addEventListener('change', (vnt) => {
  things_to_be_saved.keywords = [];
  let keywords = vnt.target.value.split(' ');
  for (let keyword of keywords) {
    if (keyword != '')
      things_to_be_saved.keywords.push(keyword);
  }
});

// MAKE A COPY OF MESSAGE
const copy_msg = (srch_rslt_msg_cntr) => {
  srch_rslt_msg_cntr.addEventListener('click', (vnt) => {
    navigator.clipboard.writeText(srch_rslt_msg_cntr.innerText);
  });
  return srch_rslt_msg_cntr;
}