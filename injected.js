if (window === window.top) {
	safari.self.addEventListener("message", handleMessage, false);
	window.addEventListener("load", _reloadMe, false);
}

function handleMessage(msgEvent) {
	switch (msgEvent.name) {

	case "setTitle":
		document.title = msgEvent.message;
		break;

	case "reload":
		reloadMe();
		break;

	} // switch
} // handleMessage

function reloadMe() {
	var vscroll = window.pageYOffset;
	var hscroll = window.pageXOffset;
	var myURL = location.href;
	var q = '';

	// get rid of existing scroll in url
	myURL = myURL.replace(/.str_.scroll=\d+/g, '');

	if (vscroll != 0 || hscroll != 0) {
		if (myURL.indexOf('?') == -1) q = '?';
		else q = '&';
		myURL += q + "str_vscroll=" + vscroll.toString() + "&str_hscroll=" + hscroll.toString();
	}
	location.href = myURL;
}

function _reloadMe() {
	// parse URL and reload to scroll parameters
	var search = window.location.search;
	// if query string exists  
	if (search) {
		// find scroll parameters in query string  
		var vscroll = /str_vscroll=(\d+)/.exec(search);
		var hscroll = /str_hscroll=(\d+)/.exec(search);
		// jump to the scroll position if scroll parameter exists  
		if (vscroll || hscroll) window.scrollTo(hscroll[1], vscroll[1]);
	}
	safari.self.tab.dispatchMessage("getTitle");
}
