if (window === window.top) {
	safari.self.addEventListener("message", handleMessage, false);
	window.addEventListener("load", init, false);
	var dirty = false;
	var sheet = null;
}

function handleMessage(msgEvent) {
	switch (msgEvent.name) {

	case "setTitle":
		document.title = msgEvent.message;
		break;
		
	case "setParams":
	  setParams(msgEvent.message);
	  break;
	  
	case "reload":
	  reloadMe();
	  break;

	} // switch
} // handleMessage

function reloadMe() {  
	if (dirty){
	  // create sheet if necessary
	  if (! sheet){	    
	    // create the link elements sheet.css, sheet.js, sexybuttons
	    var headID = document.getElementsByTagName("head")[0];  
	           
      var cssNode = document.createElement('link');
      cssNode.type = 'text/css';
      cssNode.rel = 'stylesheet';
      cssNode.href = safari.extension.baseURI + 'sheet.css';
      cssNode.media = 'screen';
      headID.appendChild(cssNode);
      
      cssNode = document.createElement('link');
      cssNode.type = 'text/css';
      cssNode.rel = 'stylesheet';
      cssNode.href = safari.extension.baseURI + 'sexybuttons.css';
      cssNode.media = 'screen';
      headID.appendChild(cssNode);
      
      sheet = document.createElement("div");
      sheet.innerHTML =
      "<span style='color: #ffb515;' class='str_marker str_pulsed'>&diams;</span>&nbsp;\
      <span class='str_sheet_text'>Reloading is paused because you have changed something on the page.</span>&nbsp;&nbsp;&nbsp;\
      <button id='b_enable' class='sexybutton sexysimple sexysmall sexygreen' onclick='enable_reloading()'>Re-enable</button>&nbsp;\
      <button id='b_disable' class='sexybutton sexysimple sexysmall sexyred' onclick='disable_reloading()'>Disable</button>&nbsp;\
      <button id='b_hide' class='sexybutton sexysimple sexysmall' onclick='safari.extension.hide_sheet()'>Hide</button>";
      sheet.id = 'str_sheet';
      sheet.style.display = 'none';
      document.body.insertBefore(sheet, document.body.firstChild);
	  }
	  showSheet();
	  return; // so we don't reload
	}
	
	var vscroll = window.pageYOffset;
	var hscroll = window.pageXOffset;
	var scrollPosition = {};
	
	// store scroll position in extension
	if (vscroll != 0 || hscroll != 0) {
	  scrollPosition.vscroll = vscroll;
	  scrollPosition.hscroll = hscroll;
	  safari.self.tab.dispatchMessage("scrollPosition",scrollPosition);
	}
	// reload the page
	location.href = location.href;
}

function showSheet() {
  if (sheet && (sheet.style.display !== 'block')){
    sheet.className = "str_sheet slide_down";
    sheet.style.display = 'block';
  }
}

function hide_sheet() {
  dirty = false;
  if (sheet && (sheet.style.display !== 'none')){
    sheet.className = "str_sheet slide_up";
    sheet.style.display = 'none';
  }
}

function enable_reloading() {
  // body...
}

function disable_reloading() {
  // body...
}

function setDirty () {
  dirty = true;
}

function init() {
  if (window === window.top)
    safari.self.tab.dispatchMessage("getParams");
  
  // set up onchange handler for any document form elements
  for (var i=0; i<document.forms.length; i++){
    if (document.forms[i].length){
      for (var j=0; j<document.forms[i].length; j++){
        document.forms[i][j].addEventListener("change",setDirty,false);
      } // for
    } // if
  } // for
} // init

function setParams(windowParams) {
  // set title
	if (windowParams.title)
	  document.title = windowParams.title;
	
	// scroll if necessary
	if (windowParams.scrollPosition)
	  window.scrollTo(windowParams.scrollPosition.hscroll,windowParams.scrollPosition.vscroll);
}