// here we have a bit of a hack to put an indication on the tab of it being unread.
// it would be nice if apple, would let us play with the chrome of the tabs so i could put a little img on it.
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
	var scrollPos = window.pageYOffset;
	var myURL = location.href;

	// get rid of existing scroll in url
	myURL = myURL.replace(/.scroll=\d+/g, '');

	if (scrollPos != 0) {
		if (myURL.indexOf('?') == -1) myURL += "?scroll=" + scrollPos.toString();
		else myURL += "&scroll=" + scrollPos.toString();
	}
	location.href = myURL;
}

function _reloadMe() {
	// parse URL and reload to scroll parameter
	var search = window.location.search;
	// if query string exists  
	if (search) {
		// find scroll parameter in query string  
		var matches = /scroll=(\d+)/.exec(search);
		// jump to the scroll position if scroll parameter exists  
		if (matches) window.scrollTo(0, matches[1]);
	}
	safari.self.tab.dispatchMessage("getTitle");
}
