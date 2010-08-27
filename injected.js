if (window === window.top) {
	safari.self.addEventListener("message", handleMessage, false);
	window.addEventListener("load", init, false);
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
  safari.self.tab.dispatchMessage("dirty");
}

function init() {
  if (window === window.top)
    safari.self.tab.dispatchMessage("getParams");
  
  // set up onchange handler for any document form elements
  for (var i=0; i<document.forms.length; i++){
    if (document.forms[i].length){
      for (var j=0; j<document.forms[i].length; j++){
        document.forms[i][j].addEventListener("keyup",setDirty,false);
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