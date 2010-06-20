// here we have a bit of a hack to put an indication on the tab of it being unread.
// it would be nice if apple, in their corporate glory,
// would let us play with the chrome of the tabs so i could put a little img on it.
// it would be a tasteful little red dot on the right-hand side...

safari.self.addEventListener("message", handleMessage, false);
window.addEventListener("load", handleLoad, false);

var marker = "\u2666 ";
var markerStatus = null;

function handleLoad(){
    getMarkerStatus();
}

function setTitleUnread() {
    // if not already, prepend title with marker
    myTitle = document.title;
    if (! (myTitle.substr(0,2) == marker))
        document.title = marker + myTitle;
}

function setTitleRead() {
    // if title begins marker, get rid of it
    myTitle = document.title;
    if (myTitle.substr(0,2) == marker) {
        document.title = myTitle.substr(2,myTitle.length);
    }
    else {
        document.title = myTitle;
    }
}
    
function getMarkerStatus () {
    safari.self.tab.dispatchMessage("sendMarkerStatus");
}

function handleMessage(msgEvent) {

    switch (msgEvent.name) {

        case "setTitleUnread":
            setTitleUnread();
            break;

        case "setTitleRead":
            setTitleRead();
            break;
            
        case "markerStatus":
            if (msgEvent.message == "unread")
                setTitleUnread();
            break;
    } // switch
} // handleMessage
