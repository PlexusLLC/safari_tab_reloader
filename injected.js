// here we have a bit of a hack to put an indication on the tab of it being unread.
// it would be nice if apple, would let us play with the chrome of the tabs so i could put a little img on it.
// it would be a tasteful little green diamond on the right-hand side...

safari.self.addEventListener("message", handleMessage, false);
window.addEventListener("load", handleLoad, false);

var marker = "\u2666 "; // that's octal for "diamond"
var markerStatus = null;

function handleLoad(){
    // don't run in anything other than the main page
    if (window.location !== window.top.location) return;
        
    markMe();
}

function markTabUnread() {
    // don't run in anything other than the main page
    if (window.location !== window.top.location) return;
    
    // if not already, prepend title with marker
    myTitle = document.title;
    if (! (myTitle.substr(0,2) == marker))
        document.title = marker + myTitle;
}

function markTabRead() {
    // don't run in anything other than the main page
    if (window.location !== window.top.location) return;
    
    // if title begins marker, get rid of it
    myTitle = document.title;
    if (myTitle.substr(0,2) == marker) {
        document.title = myTitle.substr(2,myTitle.length);
    }
}
    
function markMe () {
    safari.self.tab.dispatchMessage("markMe");
}

function handleMessage(msgEvent) {
    // don't run in anything other than the main page
    if (window.location !== window.top.location) return;

    switch (msgEvent.name) {

        case "markTabUnread":
            markTabUnread();
            break;

        case "markTabRead":
            markTabRead();
            break;

    } // switch
} // handleMessage
