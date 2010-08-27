var sheet = document.createElement("div");
sheet.innerHTML =
"<span style='color: #ffb515;' class='str_marker str_pulsed'>&diams;</span>&nbsp;\
<span class='str_sheet_text'>Reloading is paused because you have changed something on the page.</span>&nbsp;&nbsp;&nbsp;\
<button id='b_enable' class='sexybutton sexysimple sexysmall sexygreen' onclick='enable_reloading()'>Re-enable</button>&nbsp;\
<button id='b_disable' class='sexybutton sexysimple sexysmall sexyred' onclick='disable_reloading()'>Disable</button>&nbsp;\
<button id='b_hide' class='sexybutton sexysimple sexysmall' onclick='hide_sheet()'>Hide</button>";
sheet.className = "str_sheet";
sheet.id = 'str_sheet';
sheet.style.display = 'none';
document.body.insertBefore(sheet, document.body.firstChild);

function enable_reloading () {
  // body...
}

function disable_reloading () {
  // body...
}

function hide_sheet () {
  sheet = document.getElementById('str_sheet');
  dirty = false;
  if (sheet.style.display !== 'none'){
    sheet.className = "str_sheet slide_up";
    sheet.style.display = 'none';
  }
}
