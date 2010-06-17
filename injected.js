safari.self.addEventListener("message", handleMessage, false);

// here we have a monstrous hack to put an indication on the tab of it being unread.
// it would be nice if apple, in their corporate glory,
// would let us play with the chrome of the tabs so i could put a little img on it.
// it would be a tasteful little red dot on the right-hand side...

// well, i'll leave this in here in case anyone wants to pursue it, but it turns out that
// apple is also not exposing events like clicking on a tab to the extension api
// so there is also no way to mark the tab as read after the user clicks on it. baaahhh.


function setTitleUnread() {
    // if not already, prepend title with [*]
    myTitle = document.title;
    if (! (myTitle.substr(0,4) == "[*] "))
        document.title = "[*] " + myTitle;
    }

function setTitleRead() {
    // if title begins [*], get rid of it
    myTitle = document.title;
    if (myTitle.substr(0,4) == "[*] ")
        document.title = myTitle.substr(4,myTitle.length);
    }

function handleMessage(msgEvent) {

    switch (msgEvent.name) {

        case "setTitleUnread":
            setTitleUnread();
            break;

        case "setTitleRead":
            setTitleRead();
            break;
    } // switch
} // handleMessage
