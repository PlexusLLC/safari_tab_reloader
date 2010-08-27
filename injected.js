if (window === window.top) {
	safari.self.addEventListener("message", handleMessage, false);
	window.addEventListener("load", init, false);
	dirty = false;
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
	if (window.dirty){
	  // create sheet if necessary
	  if (!sheet){
	    var sheet_html = document.createElement("iframe");
	    sheet_html.innerHTML = "class='str_sheet slide_down' src=" + safari.extension.baseURI + "sheet.html>";
	    
	    sheet = document.createElement("div");
	    document.body.insertBefore(sheet, document.body.firstChild);
	    //sheet.innerHTML = "<iframe class='str_sheet slide_down' src=" + safari.extension.baseURI + "sheet.html></iframe>";
	    sheet.innerHTML = sheet_html.innerHTML;
	    sheet.style.width = '100%';
	    sheet.style.position = 'fixed';
	    sheet.style.zIndex = '100000000';
	    sheet.id = 'sheet';
	    sheet.style.display = 'block';
	  }
	  
	  // display sheet if necessary
	  if (!sheet.style.display == 'block')
	    sheet.style.display = 'block';
	  
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

function setDirty () {
  dirty = true;
  console.log("dirty is " + dirty);
}

function enable () {
  console.log("yes");
}

function init() {
  if (window === window.top)
    safari.self.tab.dispatchMessage("getParams");
  
  // set up onchange handler for any document form elements
  for (var i=0; i<document.forms.length; i++){
    if (document.forms[i].length){
      for (var j=0; j<document.forms[i].length; j++){
        // document.forms[i][j].onChange = function () {dirty = true;};
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